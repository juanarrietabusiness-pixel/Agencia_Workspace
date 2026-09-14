# Prompt maestro de Meta AI — Rofer Service

> **La fuente de verdad es [`05_receta.json`](05_receta.json).** Este `.md` es la
> capa legible que explica el porqué de cada decisión; cuando los dos se
> contradigan, **manda el JSON** y se corrige este archivo. Si tocas uno, toca el
> otro y pasa `node herramientas/verificar.mjs`.

> **La estructura no vive aquí.** El formato de siete secciones, las convenciones
> de notación (`⟦ ⟧` para el acento, bandas en % para los fondos), la regla del
> exportador y la verificación común son el **estándar de agencia**:
> [`../../00_Estandares_Agencia/formato_prompt_maestro_meta_ai.md`](../../00_Estandares_Agencia/formato_prompt_maestro_meta_ai.md).
> Este archivo solo aporta **lo de Rofer**: paleta, retícula, plantillas, escala,
> bloque de estilo, negativos y reglas duras.

> ⏳ **Tipografía provisional.** El cliente aún no confirmó la tipografía exacta
> (`01_brand_guidelines.md` §9). Se trabaja con **Anton** para titulares —
> coherente con el lettering industrial del logo— e **Inter** de cuerpo. La cuenta
> de interlínea del `05_receta.json` está **medida sobre Anton**; si la tipografía
> definitiva no es Anton, hay que **re-medir** ese bloque. Los **colores sí están
> confirmados**.

---

## 1 · La marca en una frase

Rofer Service asesora primero y renta después: **el equipo idóneo para el trabajo,
con 20 años de experiencia.** El público es profesional (constructores,
contratistas, ingenieros) y se le habla **de usted**. La marca **no compite por
precio** ni se deja reducir a "alquiler barato". Ver `01_brand_guidelines.md` y
`02_buyer_personas.md`.

## 2 · El sistema visual

### Colores (rol cerrado)

| HEX | Nombre | Rol |
|---|---|---|
| `#152473` | Azul marino Rofer | Primario: fondos de marca (plantilla C), titulares sobre claro, estructura, banda de firma, badge, velo |
| `#C9A560` | Dorado Rofer | Acento y firma: subrayado de **una** palabra del titular, cifra destacada, wordmark de la banda, filete del badge |
| `#FFFFFF` | Blanco | Fondo claro dominante, titulares y texto sobre el azul marino |
| `#EDEFF4` | Concreto | Fondo completo de la plantilla B (autoridad / educación) |
| `#20242E` | Grafito | Subtítulos, listas y notas sobre fondo claro |

**Proporción:** ~55 % claro · 35 % azul marino · 10 % dorado, mirando la pieza
entera. El dorado firma, nunca inunda.

**Combinación prohibida (contraste):** el dorado `#C9A560` **nunca** sobre blanco
`#FFFFFF` ni sobre concreto `#EDEFF4` — se vuelve ilegible. El dorado firma sobre
azul marino.

**Prohibidos:** amarillo de seguridad / naranja de obra (abaratan la marca y el
amarillo es de otro cliente), rojo de oferta (Rofer no compite por precio), verdes
y pasteles como color de marca, degradados y brillos neón.

### Tipografía

- **Titulares y cifras:** Anton, **solo en caja alta** (⏳ provisional).
- **Todo lo demás:** Inter (antetítulos, subtítulos, listas, notas, nombre de servicio).
- **URL exacta de Google Fonts** (la misma que el JSON):
  `https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap`
- **No usar** aunque parezcan parecidas: Bebas Neue, Impact, Oswald, Montserrat, Poppins, Roboto.

### Retícula, escala, acento e interlínea

Están en el `05_receta.json` (`reticula.texto`, `escala`, `acento`,
`interlineado`, `anclajes`). Notas de criterio:

- **El acento es un solo subrayado dorado** bajo **una** palabra del titular (o esa
  palabra entera en dorado). Se marca con `⟦ ⟧`, que no se imprimen.
- **Los cortes de línea se escriben, no se calculan.** Cada titular llega con sus
  saltos ya decididos.
- **La interlínea del titular baja de 1** → lleva la cuenta de holguras de las
  tildes/eñe medida sobre Anton (`interlineado` del JSON).

### Las cuatro plantillas

| ID | Nombre | Cuándo | Firma |
|---|---|---|---|
| A | Equipo / Obra | La foto real manda (pilar PRUEBA) | Badge |
| B | Autoridad / Educación | Consejo o dato que posiciona los 20 años | Banda inferior |
| C | Servicio / Equipo | Presentar un servicio o equipo (pilar CONVERSIÓN) | Banda inferior |
| D | Portada de Reel | Portada vertical de un reel de obra | Badge |

Cada pieza lleva **una sola firma** (banda inferior azul marino **o** badge),
nunca las dos. La plantilla C **no lleva precio**: la marca no lo comunica.

## 3 · La firma y el logo

El logo es un **archivo que carga el humano** (estándar §4 bis), nunca se dibuja.
**Ya está en el repo:** `Assets_Visuales_Base/logo_rofer_service.jpeg` (lockup navy
sobre blanco, recibido 2026-09-14) — declarado en `logo.archivo` del JSON. Va sobre
la banda o el badge azul marino, o sobre una zona limpia; si cae sobre el navy, se
monta en una placa clara para que no se pierda. El wordmark tipográfico solo queda
como respaldo si por algún motivo no se carga el archivo.

## 4 · El bloque de estilo y los negativos

Van literales en el `05_receta.json` (`bloqueEstilo` y `negativos`). En corto: la
imagen es **fotografía real de maquinaria pesada y movimiento de tierra en una obra
de Panamá**, luz de día, la máquina como sujeto, sin personas en primer plano; nada
de render 3D, ilustración, maquinaria de juguete ni logotipos de otras marcas sobre
las máquinas. **Obra y equipo reales antes que stock** (regla del cliente).

## 5 · Reglas duras (de Rofer)

- La única cifra verificada es **«20 años de experiencia»**. Cualquier otra
  (precio, plazo, capacidad, número de obras) se le pide a Alex y se cita con fecha.
- **Sin precios** y **sin lenguaje de oferta/rebaja**: Rofer no compite por precio.
- **Nunca** se nombra a la competencia (Transeq, Super Mega Máquinas, Alquimaquina).
- Los nombres de obras de respaldo (ASP, Gana Empresa, Multiplaza, Figali) solo con
  **permiso** del cliente y con **foto real**.
- **Trato de usted** siempre.

## 6 · Verificación dependiente del ADN

Además de la lista común del estándar §7:

- **Palabras con tilde/eñe a revisar en el lote** (buscarlas una por una):
  ASESORÍA, IDÓNEO, MÁQUINA, EXCAVACIÓN, DEMOLICIÓN, CONFORMACIÓN, AÑOS, EJECUCIÓN,
  QUÉ, CÓMO, MÁS, ESCRÍBANOS, AQUÍ.
- **Hashtags:** exactamente 6, en una sola línea al final de la descripción.
- **Emojis:** 0 dentro del lienzo.
- **Cifra que sí puede aparecer:** «20 años de experiencia» — cualquier otra, fuera.
- **CTA:** ESCRÍBANOS AL WHATSAPP.
- **Combinación de color prohibida:** dorado `#C9A560` sobre blanco `#FFFFFF` o sobre
  concreto `#EDEFF4`.
