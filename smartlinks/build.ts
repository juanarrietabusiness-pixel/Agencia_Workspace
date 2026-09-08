import { mkdir, rm, copyFile, writeFile, appendFile, readFile } from "node:fs/promises";
import { basename, join, dirname } from "node:path";
import { loadEnabledSmartlinks, listSmartlinkIds, loadSmartlink, type Smartlink } from "./lib/config.ts";
import { renderHub, renderLanding } from "./lib/render.ts";
import { OUT_DIR, fromRepoRoot } from "./lib/paths.ts";

/**
 * Genera el sitio estático de SmartLinks en `dist/smartlinks/`.
 *
 *   dist/smartlinks/index.html      → hub interno con todos los clientes
 *   dist/smartlinks/<slug>/index.html
 *   dist/smartlinks/<slug>/<logo>   → copia del logo declarado en el manifiesto
 *   dist/netlify-redirects.txt      → bloque de reglas para el repo de la web
 *
 * ── Dónde vive cada landing y dónde se ve ──────────────────────────
 * Se publican en GitHub Pages, pero el visitante nunca ve esa URL: el sitio de
 * Netlify (`juancitoads.com`) las sirve por proxy bajo `/<slug>/`, así que el
 * link que se pega en la bio de Instagram es `https://juancitoads.com/dcasa`.
 * Por eso hay DOS direcciones y no una:
 *
 *   SMARTLINKS_BASE_URL   la pública, la que ve el visitante y la que va en el
 *                         canonical/og:url. Es `https://juancitoads.com`.
 *   SMARTLINKS_PAGES_URL  el origen real en Pages. Solo se usa para escribir el
 *                         bloque de proxy; nunca sale en el HTML.
 *
 * Si faltan, las landings se generan igual con rutas relativas (el HTML no
 * depende de la base) y simplemente no se emiten canonical ni bloque de proxy.
 */

const BASE_URL = (process.env.SMARTLINKS_BASE_URL ?? "").replace(/\/+$/, "");
const PAGES_URL = (process.env.SMARTLINKS_PAGES_URL ?? "").replace(/\/+$/, "");

function publicUrl(slug: string): string {
  return BASE_URL ? `${BASE_URL}/${slug}/` : `/${slug}/`;
}

/**
 * Bloque de `_redirects` para `PAGINA-JUANCITO-ADS/public/_redirects`.
 *
 * Dos líneas por cliente, y el orden importa porque en Netlify gana la primera
 * regla que casa:
 *
 *  1. `/dcasa → /dcasa/ 301` va PRIMERO. Sin ella, la URL sin barra final se
 *     serviría con el navegador todavía en `/dcasa`, y como el HTML enlaza su
 *     logo en relativo (`./logo.png`), el navegador lo pediría a `/logo.png`
 *     — fuera del proxy, 404. La barra final no es cosmética aquí.
 *  2. El proxy `200` sirve el HTML de Pages bajo el dominio propio: el
 *     visitante no ve `github.io` ni hay salto visible.
 *
 * Ninguna regla lleva `!` (forzado) a propósito, al revés que la del Agente CRM:
 * el `!` hace que la regla gane a un fichero real del sitio, y aquí eso
 * escondería en silencio una página de la web que algún día se llamara igual
 * que un cliente. Sin `!`, esa colisión se ve.
 */
function netlifyRedirects(links: Smartlink[]): string {
  // Ancho de columna medido sobre el slug más largo: el bloque se pega en un
  // fichero que un humano lee, y en `_redirects` las columnas se separan por
  // espacios, así que alinearlas es gratis.
  //
  // `padEnd` a secas NO vale: cuando el texto ya pasa del ancho no añade nada y
  // la URL del proxy quedaría pegada al código (`…/:splat200`), que es una regla
  // rota y silenciosa. Por eso el relleno es siempre de un espacio como mínimo.
  const pad = Math.max(...links.map((l) => l.slug.length)) + 4;
  const col = (text: string) => text + " ".repeat(Math.max(1, pad - text.length));
  const rows = links.flatMap((l) => [
    col(`/${l.slug}`) + col(`/${l.slug}/`) + "301",
    col(`/${l.slug}/*`) + col(`${PAGES_URL}/${l.slug}/:splat`) + "200",
  ]);
  return [
    "# ── SmartLinks de clientes (generado, no editar a mano) ────────────",
    "# Fuente: Agencia_Workspace/smartlinks/clients/*.yml",
    "# Lo escribe `npm run smartlinks` en ese repo y sale en el resumen del",
    "# workflow «SmartLinks · publicar landings». Al añadir o quitar un cliente",
    "# allí, este bloque se vuelve a pegar entero aquí.",
    ...rows,
  ].join("\n");
}

/** Lee el tamaño real de un PNG (chunk IHDR) para emitir width/height y evitar saltos de layout. */
async function pngSize(path: string): Promise<{ width: number; height: number } | undefined> {
  if (!path.toLowerCase().endsWith(".png")) return undefined;
  const buf = await readFile(path);
  const isPng = buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47;
  if (!isPng) return undefined;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function buildClient(link: Smartlink): Promise<void> {
  const dir = join(OUT_DIR, link.slug);
  await mkdir(dir, { recursive: true });

  let logoSize: { width: number; height: number } | undefined;
  if (link.logo) {
    const source = fromRepoRoot(link.logo.src);
    await copyFile(source, join(dir, basename(link.logo.src)));
    logoSize = await pngSize(source);
  }

  const html = renderLanding(link, {
    canonical: BASE_URL ? publicUrl(link.slug) : undefined,
    logoSize,
  });
  await writeFile(join(dir, "index.html"), html, "utf8");
}

async function main(): Promise<void> {
  const allIds = await listSmartlinkIds();
  const all = await Promise.all(allIds.map(loadSmartlink));
  const enabled = await loadEnabledSmartlinks();
  const skipped = all.filter((s) => !s.enabled);

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  for (const link of enabled) {
    await buildClient(link);
    console.log(`[smartlinks] ${link.id} → ${publicUrl(link.slug)}`);
  }

  await writeFile(join(OUT_DIR, "index.html"), renderHub(enabled, { baseUrl: BASE_URL || undefined, skipped }), "utf8");
  // Evita que Pages procese el output con Jekyll (ignora carpetas con guion bajo).
  await writeFile(join(OUT_DIR, ".nojekyll"), "", "utf8");

  for (const link of skipped) {
    console.log(`[smartlinks] ${link.id} omitido — ${link.disabledReason ?? "enabled: false"}`);
  }
  console.log(`[smartlinks] ${enabled.length} landing(s) en ${OUT_DIR}`);

  // El bloque de proxy se escribe FUERA de OUT_DIR: `dist/smartlinks/` entero se
  // sube como artefacto de Pages, y esto no es parte del sitio, es una nota para
  // el otro repositorio.
  const redirects = PAGES_URL ? netlifyRedirects(enabled) : "";
  if (redirects) {
    const file = join(dirname(OUT_DIR), "netlify-redirects.txt");
    await writeFile(file, `${redirects}\n`, "utf8");
    console.log(`[smartlinks] reglas de Netlify en ${file}`);
  }

  // Resumen visible en la pestaña Actions con el link de cada cliente.
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    const rows = enabled
      .map((l) => `| **${l.name}** | \`${l.slug}\` | ${BASE_URL ? `[${publicUrl(l.slug)}](${publicUrl(l.slug)})` : publicUrl(l.slug)} |`)
      .join("\n");
    const skippedRows = skipped
      .map((l) => `| ${l.name} | \`${l.slug}\` | ⏸️ ${l.disabledReason ?? "desactivado"} |`)
      .join("\n");
    await appendFile(
      summaryFile,
      [
        `## 🔗 SmartLinks generados (${enabled.length})`,
        "",
        "| Cliente | Slug | Link |",
        "|---|---|---|",
        rows,
        skippedRows ? `${skippedRows}` : "",
        "",
        // El bloque va en el resumen del run porque su destino está en OTRO
        // repositorio y ninguna automatización lo puede pegar sola: aquí queda a
        // un clic de distancia y ya generado, para que nadie lo escriba a mano.
        redirects
          ? [
              "### 🔁 Reglas para `PAGINA-JUANCITO-ADS/public/_redirects`",
              "",
              "Si en este run cambió la lista de clientes, reemplaza el bloque de SmartLinks",
              "de ese fichero por este y despliega la web. Hasta entonces el cliente nuevo",
              "solo responde en la URL de Pages.",
              "",
              "```",
              redirects,
              "```",
              "",
            ].join("\n")
          : "",
        "",
      ].join("\n"),
      "utf8",
    );
  }
}

await main();
