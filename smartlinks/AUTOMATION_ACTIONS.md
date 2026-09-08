# AUTOMATION_ACTIONS.md — Runbook de los SmartLinks

> **Este archivo es para Claude, no para humanos.** Contiene el procedimiento exacto
> para crear, cambiar o despublicar la landing de enlaces de un cliente. Léelo entero
> antes de tocar nada en `smartlinks/`.

## 0. Cuándo aplica este archivo

Cuando el humano diga cosas como:

- "Agrega/cambia un botón en el SmartLink de X" · "pon el catálogo de X"
- "Cambia el link de WhatsApp / la ubicación de X"
- "Haz el SmartLink de [cliente nuevo]" · "publica la landing de X"
- "Quita/despublica el SmartLink de X"
- "Cambia los colores/el logo de la landing de X"

Si el pedido es sobre el **correo diario** → manda `agent/AUTOMATION_ACTIONS.md`.
Si es sobre **contenido/estrategia** → manda `_EL_ORQUESTADOR_MAESTRO.md`.

## 1. Precondiciones (no saltar)

1. El cliente tiene carpeta en la raíz del repo.
2. **Su ADN NO está vacío.** Lee `[Cliente]/01_ADN_y_Memoria/01_brand_guidelines.md`
   antes de escribir una sola línea de marca. Si está en blanco: PARA, avisa, y deja
   el manifiesto con `enabled: false` + `disabledReason`.
3. **Nunca inventes destinos.** Un botón sin URL real no se pone. Si el cliente no dio
   catálogo/ubicación, usa lo que sí existe (web propia, WhatsApp con mensaje
   precargado) y anota el pendiente como comentario en el `.yml`.

## 2. Añadir o editar un cliente

1. Crea/edita `smartlinks/clients/<id>.yml` — mismo `id` que en `agent/clients/<id>.yml`.
   Copia la estructura de `dcasa.yml`, que es el manifiesto de referencia.
2. **Marca:** HEX, tipografía y tagline salen de `01_brand_guidelines.md` del cliente.
   Anota en el comentario de cabecera de qué sección salió cada cosa.
   - Respeta las reglas de contraste del ADN (ej. D'CASA: el amarillo nunca toca blanco
     pelado → `accentOutline` azul).
   - Si el ADN no tiene HEX exactos (caso 57DMC), usa los mismos estimados que
     `agent/clients/<id>.yml` para que todo el sistema hable igual, y márcalo con ⏳.
3. **Logo:** si existe archivo en `01_ADN_y_Memoria/Assets_Visuales_Base/`, declara
   `logo.src` con la ruta relativa a la raíz del repo. Si no, usa `monogram`.
   - `style: plate` → el archivo ya trae su marco (D'CASA).
   - `style: circle` → el archivo tiene fondo claro no transparente (Juancito Ads).
   - `replacesName: true` → el logo ya dice el nombre; el `<h1>` pasa a lectores de pantalla.
4. **Botones:** `kind: link` (destino directo) o `kind: menu` (desplegable). Un `menu`
   admite enlaces sueltos y grupos (`label` + `items`), que se pintan como pills.
   - Orden recomendado: contacto (WhatsApp) → catálogo → ubicación → el resto.
   - Máximo un botón `variant: accent` por landing: es el CTA principal.
5. **Voz:** las etiquetas y notas se escriben en el tono del ADN del cliente (voseo,
   tuteo, léxico propio). Nunca mezcles léxico ni versículos entre clientes.
6. Valida y commitea:

```bash
npx tsc --noEmit
npm run --silent smartlinks     # debe imprimir la línea del cliente
```

7. **Si el cliente es NUEVO (o le cambiaste el `slug`), falta un paso en el OTRO
   repositorio.** Las landings se sirven en `https://juancitoads.com/<slug>`, y
   quien resuelve esa URL es el sitio de Netlify, no este repo — ver §5. Sin ese
   paso el cliente se publica en Pages pero `juancitoads.com/<slug>` da 404.

## 3. Despublicar un cliente

```yaml
enabled: false
disabledReason: "razón corta"
```

No borres el archivo: así queda el historial y se reactiva con `enabled: true`.
Un manifiesto desactivado no necesita `theme` ni `buttons`.

## 4. Cambiar el diseño (todos los clientes)

`smartlinks/lib/render.ts` es el único lugar con CSS/HTML. Reglas:

- El layout es **mobile-first** y de una sola columna: no metas grids de dos columnas.
- Todo color sale de las variables del tema — nunca escribas un HEX en el CSS base.
- Nada de sombras dramáticas, degradados llamativos ni bordes de neón (lo prohíben
  varios ADN; ver §5 y §9 de D'CASA).
- Toda animación va dentro de `@media (prefers-reduced-motion: no-preference)`.
- Si añades un campo al manifiesto, actualiza el schema en `lib/config.ts` **y** el
  `dcasa.yml` de referencia.

## 5. Publicación — dos capas, y la segunda vive en otro repo

El HTML se hospeda en **GitHub Pages**, pero el link que se pega en la bio de
Instagram es `https://juancitoads.com/<slug>`. Quien convierte una cosa en la otra
es el sitio de **Netlify**, con una regla de proxy. Las dos capas son necesarias:

| Capa | Dónde | Qué hace |
|---|---|---|
| Hospedaje | este repo → `.github/workflows/smartlinks.yml` → Pages | genera y sirve el HTML |
| Dominio | `PAGINA-JUANCITO-ADS/public/_redirects` | `juancitoads.com/<slug>` → proxy al HTML de Pages |

- El workflow corre en push a `main` con cambios en `smartlinks/**` o en los logos, y
  a mano desde la pestaña Actions.
- El Source de Pages es **GitHub Actions** (ya configurado por el humano). No lo cambies.
- **Aquí no hace falta tocar nada al añadir un cliente:** la lista se descubre sola
  desde `smartlinks/clients/`.
- **Allí sí.** `npm run smartlinks` escribe el bloque de reglas ya generado en
  `dist/netlify-redirects.txt`, y el resumen del run lo imprime listo para copiar.
  Procedimiento al añadir/quitar un cliente o cambiarle el `slug`:

  1. Abre el resumen del run (Actions → run → Summary) o el fichero local.
  2. Reemplaza **el bloque entero** de SmartLinks en
     `PAGINA-JUANCITO-ADS/public/_redirects` por el generado. No edites líneas
     sueltas: el bloque es generado, se sustituye completo.
  3. Commitea y pushea ese repo — Netlify despliega solo.

  Mientras ese paso no se haga, el cliente responde en la URL de Pages pero
  `juancitoads.com/<slug>` da 404. **La URL de Pages no se le pasa al cliente:**
  el `canonical` de la landing apunta a `juancitoads.com`, así que dar la de Pages
  contradice a la propia página.

### Detalles del proxy que no se improvisan

- **Las dos reglas por cliente son proxy (`200`), ninguna es redirección.** La
  forma natural habría sido mandar `/dcasa` a `/dcasa/` con una 301 y proxiar
  solo la versión con barra; se descartó porque si el motor de rutas de Netlify
  ignora la barra final al emparejar, esa 301 se redirige a sí misma. Con dos
  proxys, con barra y sin barra entregan el mismo HTML case la que case.
- **El logo se enlaza en absoluto**, no en `./logo.png`. Un relativo depende de
  si la URL termina en barra, y `juancitoads.com/dcasa` —la forma que se dicta y
  se pega en una bio— no termina en barra. Lo hace `logoSrc()` en `render.ts`
  cuando conoce la URL pública; en build local sigue siendo relativo para que
  abrir el HTML del disco funcione.
- **Ninguna regla lleva `!`.** Forzar escondería en silencio una página de la web
  que algún día se llamara igual que un cliente; sin `!`, esa colisión se ve.

### Por qué el proxy y no un subdominio

Se evaluaron tres formas (2026-09-08) y el humano eligió el proxy:

- `juancitoads.com/<slug>` — **la elegida.** Es la URL más corta de dictar y deja la
  autoridad SEO de cada landing en el dominio de la agencia. Precio: el paso
  cruzado de arriba.
- `enlaces.juancitoads.com/<slug>` — cero acoplamiento (un cliente nuevo aparece
  solo), pero pide un registro CNAME en GoDaddy y una URL más larga.
- `<slug>.juancitoads.com` — un subdominio por cliente. GitHub Pages solo admite un
  dominio propio por repositorio, así que obligaría a mover el hospedaje y a un
  registro DNS por cliente. Descartada.

## 6. Cosas que NUNCA debes hacer

1. Inventar URLs (catálogos, fichas de Google Maps, redes) que el cliente no dio.
2. Mezclar marca, léxico o assets entre clientes.
3. Publicar un cliente con ADN vacío.
4. Poner precios en la landing sin que estén verificados en el ADN.
5. Mezclar la cara consumer y la B2B de Feria del Lente en el mismo copy.
6. Escribir el HTML de un cliente a mano fuera del generador.
7. Escribir a mano las reglas de `_redirects` del repo de la web: se generan (§5).
8. Publicar un cliente nuevo y dejarlo sin su regla en el repo de la web: la landing
   quedaría viva solo en una URL que su propio `canonical` desmiente.
