# Carrusel · Cama de felpa XHT022 en 4 tamaños — D'CASA Panamá

> **Modo:** carrusel (6 diapositivas) · **Plantilla dominante:** C (producto y precio)
> **Fecha:** 2026-09-28 · **Estructura:** `00_Estandares_Agencia/formato_prompt_maestro_meta_ai.md`
> **Valores de marca:** `Dcasa/01_ADN_y_Memoria/05_prompt_maestro_meta_ai.md` + `05_receta.json`

## Origen de cada cifra

Precios y códigos: **captura del inventario del cliente entregada por el humano el
2026-09-28**. No salen del ADN (que solo trae «camas desde $49.99»), así que si el
inventario cambia, este prompt caduca.

| Tamaño | Colores | Cama | Combo | Colchón |
|---|---|---|---|---|
| Twin | blanco `XHT022-T-W` · beige `XHT022-T-BG` | $104.99 | $179.99 | Imperial |
| Full | blanco `XHT022-F-W` · beige `XHT022-F-BG` | $129.99 | $219.99 | Imperial |
| Queen | solo blanco `XHT022-Q-W` | $149.99 | $308.99 | Dulces Sueños |
| King | solo blanco `XHT022-K-W` | $169.99 | $389.99 | First |

## ⚠️ Huecos que hay que rellenar ANTES de mandarlo a Meta AI

Marcados en el prompt como `⟪PENDIENTE⟫`. Con el hueco puesto, el prompt no se manda.

1. **Medidas de Full, Queen y King.** La única cota verificada es la del Twin
   (100 × 190 cm, alto 105, base 31), del flyer. Las otras tres se le piden a Marcial.
2. **Si el combo lleva o no ITBMS.** Los flyers marcan `+ITBMS` solo en la cama, nunca
   en el combo. O es real o es un error de plantilla, pero no se publica ambiguo.

---

# PROMPT MAESTRO — copiar desde aquí hacia abajo

```
Vas a montar UN carrusel de Instagram de 6 diapositivas para una tienda de muebles de
Panamá, y me lo vas a devolver como UN solo documento HTML. Te paso además fotos de
referencia del producto real.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. QUÉ ERES Y QUÉ NO HACES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tienes exactamente dos trabajos:
  (a) preparar los fondos y las imágenes de producto, SIN una sola letra dentro
  (b) devolver UN documento HTML con las 6 diapositivas ya compuestas

No escribas, no redactes, no completes, no acortes, no traduzcas y no "mejores"
ningún texto. Todo el texto de este documento ya está escrito más abajo. Cópialo
carácter por carácter, con sus tildes, sus eñes, sus signos de apertura y sus puntos
finales. No añadas ningún precio, medida, plazo de entrega, costo de armado, costo de
delivery, testimonio ni nombre de cliente que no esté escrito literalmente aquí.

Las 6 diapositivas son UN SOLO CARRUSEL, en orden, con una sola descripción para todo
el conjunto. No cambies el orden, no añadas una diapositiva más, no añadas hashtags y
no añadas emojis en ningún sitio.

PROHIBICIÓN ESPECÍFICA DE ESTA MARCA — es una tienda de retail:
NO generes, no dibujes y no "recrees" la cama. La cama de las 6 diapositivas es una
FOTO REAL que carga el usuario desde su disco. Sobre esa foto real sí puedes:
recortar el fondo, centrarla, nivelarla, igualar la luz, limpiar el ruido, ponerla
sobre fondo liso de marca y añadirle una sombra de contacto muy suave bajo la base.
Sobre esa foto real NUNCA puedes: redibujarla, cambiarle el diseño, el color o el
material, añadirle o quitarle patas, cabecera o volumen, ni "mejorarla".
Tampoco generes personas, clientes, familias ni entregas. Nunca.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. EL SISTEMA VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COLORES Y SU ROL — no hay ningún otro, ni en las piezas ni en la interfaz:
  Azul     #1340B1   fondo de las 6 diapositivas, y texto sobre amarillo
  Amarillo #FED00F   placa del precio, banda inferior, subrayado del acento
  Blanco   #FFFFFF   titulares y texto sobre el azul
  Hueso    #E0DDD1   solo el rectángulo de "carga la foto aquí" mientras está vacío
  Grafito  #3A3A3A   solo texto de la interfaz del documento

REGLA DE CONTRASTE QUE ROMPE LA PIEZA SI SE IGNORA:
El amarillo #FED00F JAMÁS toca el blanco #FFFFFF ni el hueso #E0DDD1. Ratio 1.47:1,
es invisible. Ni texto, ni ícono, ni línea, ni borde. Busca esa combinación en tu
propio código y corrígela. El precio va SIEMPRE azul #1340B1 sobre placa amarilla.

Proporción cromática de cada diapositiva: 60 % azul de fondo · 30 % blanco de la foto
y el texto · 10 % amarillo. El amarillo nunca pasa del 15 %.

TIPOGRAFÍAS, con su rol cerrado:
  Anton  400  — titulares y precios. SOLO en caja alta.
  Oswald 400/500 — antetítulos y subtítulos. Nunca en caja alta en párrafos.
  Inter  400/500 — notas, códigos y numerador.
Ninguna otra familia, en ningún caso. En particular NO uses Bebas Neue, Impact,
Archivo Narrow, Montserrat, Poppins, Roboto, Open Sans, Lato, Helvetica ni Arial,
aunque te parezcan parecidas a Anton o a Oswald.

RETÍCULA — 1080×1350 exactos, margen de seguridad en x=80.

ORDEN DEL BLOQUE DE TEXTO — idéntico en las 6, nunca cambia:
  1. numerador            Inter 400 · 22 px · blanco · esquina superior derecha,
                          base en y=118, borde derecho en x=1000
  2. zona de foto         de y=170 a y=760, ancho completo menos márgenes
  3. antetítulo           Oswald 500 · 26 px · amarillo · tracking 0.14em · x=80,
                          base en y=838
  4. titular              Anton 400 · blanco · x=80 · TOPE del bloque en y=870
  5. subtítulo de medidas Oswald 400 · 34 px · blanco · x=80 · base en y=1064
  6. placa del precio     amarilla, 360×120 px, radio 12 px, x=80,
                          BASE en y=1196 · dentro: Anton 400 · 96 px · azul
  7. nota del combo       Inter 400 · 20 px · blanco · x=480 · base en y=1160
  8. código               Inter 400 · 22 px · blanco · tracking 0.1em · x=480,
                          base en y=1196
  9. banda inferior       amarilla, 88 px de alto, BASE en y=1350, ancho completo
                          dentro: el logo cargado a la izquierda desde x=80, y
                          "ESCRÍBENOS AL WHATSAPP" en Anton 30 azul a la derecha,
                          terminando en x=1000

ESCALA DEL TITULAR — ya decidida, no la recalcules:
  Diapositiva 01 y 06 → Anton 128 px, interlínea base 0.92, máximo 16 caracteres/línea
  Diapositivas 02 a 05 → Anton 190 px, una sola línea (es una sola palabra)

El tamaño del titular ya está decidido diapositiva por diapositiva. No lo recalcules,
no lo ajustes para que "cuadre mejor", no lo reduzcas para que quepa: los cortes de
línea ya están escritos y con ellos cabe. Los saltos son duros: no dejes que el
navegador reparta las palabras.

EL ACENTO SE MARCA CON ⟦ ⟧
Los corchetes ⟦ ⟧ son marcas para ti: NO se imprimen, no aparecen en el lienzo, no
aparecen en el PNG. Solo dicen qué palabra lleva el subrayado amarillo #FED00F (grosor
10 px, separado 14 px de la línea base). Todo lo que quede fuera va en blanco liso.
Hay UN SOLO subrayado por titular, y solo en las diapositivas 01 y 06. Las
diapositivas 02 a 05 no llevan subrayado: en ellas el acento es la placa del precio.

LA INTERLÍNEA DEL TITULAR NO ES UN NÚMERO, ES UNA CUENTA
Anton no rebaja los acentos en versalitas: la tilde de una Á y el lomo de una Ñ
sobresalen por encima de la altura de versalita, y con interlínea por debajo de 1 se
meten DENTRO de la línea de arriba. Por abajo pasa igual con un ¿ o una coma.

  avance(n → n+1) = base + holguraSuperior(línea n+1) + holguraInferior(línea n)

Holguras medidas sobre el archivo de Anton, en em:
  Á É Í Ó Ú → 0.24      Ñ Ü → 0.21      Q ¿ ¡ , → 0.11

SE CALCULA PARA CADA PAR DE LÍNEAS CONSECUTIVAS, SIN EXCEPCIÓN. No sólo para el primer
par que se note. Aplicado a este carrusel:

  Diapositiva 01 · "UNA CAMA." / "CUATRO" / "TAMAÑOS."
     par 1→2 = 0.92em          (la línea 2 no abre con tilde, la 1 no baja nada)
     par 2→3 = 0.92em + 0.21em (la línea 3 lleva Ñ)

  Diapositiva 06 · "¿CUÁL" / "TE CABE" / "A TI?"
     par 1→2 = 0.92em + 0.11em (la línea 1 baja con el ¿)
     par 2→3 = 0.92em

El anclaje se mide sobre la VERSALITA, no sobre la tinta: el tope del bloque es el
tope de versalita de la primera línea. Y el bloque NO lleva recorte: nada de
overflow:hidden ni de caja de alto fijo, o le rasuras la tilde a la primera línea.

EL ANCLAJE NO SALTA: el tope del bloque de titular está en y=870 en las 6
diapositivas, sin excepción.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. EL CONTRATO DEL HTML
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FUENTES — cárgalas así, exactamente:
https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500&family=Inter:wght@400;500&display=swap

LIENZO: cada diapositiva mide 1080×1350 exactos. Las seis.

EL FONDO DE ESTE CARRUSEL ES MASA PLANA, NO UNA PANORÁMICA. Las 6 llevan el mismo
azul #1340B1 exacto, pintado con el mismo valor. No generes una imagen de fondo, no
la recortes en seis trozos y no la reescales: precisamente por ser masa plana,
cualquier diferencia de un solo dígito entre dos diapositivas se ve como una costura
cuando el carrusel se desliza.

CÓMO SE MUESTRA EL DOCUMENTO, en este orden:
  1. Primero LA TIRA: las 6 diapositivas pegadas por el borde, sin separación y sin
     margen entre ellas, reducidas para que quepan a lo ancho de la pantalla. Es la
     única forma de ver si el carrusel se sostiene como conjunto.
  2. Debajo, cada diapositiva suelta a tamaño legible, con su botón de descarga.
  3. Debajo de todo, la descripción y los hashtags en texto seleccionable.

LA FOTO REAL DEL PRODUCTO:
Cada diapositiva lleva su propio <input type="file" accept="image/*">. Al elegir una
foto del disco se dibuja en la zona de imagen (y=170 a y=760) con object-fit: cover, y
queda incluida en el PNG exportado. Mientras no se cargue nada, esa zona muestra un
rectángulo hueso #E0DDD1 con el texto "FOTO REAL DEL PRODUCTO — cárgala aquí" en Inter
gris #3A3A3A. La foto se lee con FileReader y se dibuja en el canvas: no la subas a
ningún sitio.
Y el botón de descarga de una diapositiva sin foto AVISA Y NO EXPORTA. No que avise y
deje pasar: un PNG con el rectángulo de "cárgala aquí" dentro se publica por error una
de cada tres veces.

EL LOGO SE CARGA, NO SE DIBUJA:
  1. Un <input type="file"> arriba del documento, UNA sola vez para las 6. Al
     elegirlo se dibuja en todas a la vez, en la vista previa y en el PNG.
  2. Una constante  const LOGO_MARCA = "";  justo encima del script, por si se
     prefiere pegarlo en base64. Si trae contenido, manda ella; si está vacía, manda
     el archivo que cargue el usuario.
  3. El botón de descarga BLOQUEA mientras no haya logo, con aviso.
  4. await img.decode() antes de dibujarlo. Un logo a medio cargar sale en blanco en
     el PNG y perfecto en la vista previa.
  5. La proporción sale de naturalWidth / naturalHeight, no se supone. El logo es
     2.204 : 1 — a 360 px de ancho mide 163 de alto. Meterlo en una caja cuadrada lo
     deforma, y eso es lo único que un cliente detecta a la primera.
  6. No lo recolorees, no lo pongas en blanco y negro y no le bajes la opacidad.
     Va encima de la banda amarilla, nunca sobre la masa plana azul.

LA REGLA DEL EXPORTADOR — el exportador no recalcula nada:
  · Maqueta cada línea del titular como su propio elemento en el HTML.
  · Al exportar, lee la posición Y de CADA elemento ya maquetado con
    getBoundingClientRect() u offsetTop, y dibuja en esa Y.
  · No estimes multiplicando líneas por interlínea, no vuelvas a partir la bajada con
    otro ancho, no recalcules dónde empieza el bloque.
  · Espera a que las fuentes estén listas —await document.fonts.ready— ANTES de medir
    nada y ANTES de exportar. Si mides con la fuente de reserva, todo lo demás queda
    mal colocado.

Y estas trampas sobreviven a la regla, así que van escritas:
  1. ctx.letterSpacing NO se reinicia al cambiar ctx.font. Si lo usas para el tracking
     del antetítulo o del código, ponlo a '0px' inmediatamente después. Si no, el
     tracking se filtra al titular y el titular se sale del lienzo.
  2. Fija ctx.textBaseline='top' antes de dibujar.
  3. Mide el alto real del bloque con getBoundingClientRect() del elemento ya
     maquetado. No lo estimes.
  4. La banda inferior amarilla y la placa del precio se posicionan por su BASE
     (y=1350 y y=1196). Colocadas por su borde superior quedan fuera del lienzo.
  5. Un botón que lanza 6 descargas seguidas lo bloquea el navegador a la tercera.
     Sepáralas con una pausa y avisa de que hay que permitirlas, o agrúpalas en un ZIP.
  6. El avance vertical entre líneas del titular NO es líneas × interlínea. Acumula el
     avance real par por par, con las holguras de arriba.

INTERFAZ DEL DOCUMENTO: fondo #FFFFFF, texto #3A3A3A, títulos y acentos #1340B1,
botones con fondo #FED00F y texto #1340B1. La regla del amarillo aplica también aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. EL BLOQUE DE ESTILO — para el tratamiento de la foto de producto
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Idéntico en las 6 diapositivas:

Estilo: foto de catálogo de la cama real, recortada de su fondo y colocada sobre el
azul liso de la marca. Luz cálida y pareja, sin brillos duros ni reflejos. Sombra de
contacto muy suave bajo las patas, nada de sombra proyectada. La cama centrada y
nivelada, vista de tres cuartos, completa dentro del encuadre y sin recortar las patas.
Fotografía realista, nada de render 3D ni de ilustración. El azul del fondo queda liso,
sin brillo, sin degradado y sin textura, en toda la banda del 0 % al 100 % de la altura.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. LOS NEGATIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No puede aparecer nada de esto en ninguna imagen:

personas, gente, rostros, manos, niños, mascotas, terracota, bronce, cobre, verde
salvia, beige premium, tonos tierra apagados, gris frío, azul grisáceo nórdico,
estética escandinava, minimalismo frío, nieve, invierno, chimenea, lujo, mármol,
dorado, candelabros, degradados, sombras dramáticas, viñeta, stickers de oferta,
círculos rojos, explosiones de precio, tipografía serif, scripts, texto, letras,
números, logotipos, marcas de agua, marcos, collage, render 3D, ilustración, dibujo,
fisheye, gran angular deformado, HDR exagerado, saturación excesiva

Y los propios de este lote: cama redibujada, cabecera de forma distinta a la de la
foto, patas distintas, capitoné, botones, tachuelas, canaletas, color distinto al de
la foto cargada, colchón envuelto en plástico, etiquetas de colchón.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. LAS PIEZAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

── DIAPOSITIVA 01 / 06 ── portada
NUMERADOR: 01/06
FOTO: la cama de felpa, tres cuartos, tamaño Queen o King (la más vistosa)
ANTETÍTULO: CAMA DE FELPA
TITULAR — Anton 128, 3 líneas, cortes exactos:
UNA CAMA.
CUATRO
⟦TAMAÑOS.⟧
SUBTÍTULO: Blanco y beige, según el tamaño
SIN placa de precio en esta diapositiva.
NOTA: Desde $104.99 más ITBMS
CÓDIGO: LÍNEA XHT022

── DIAPOSITIVA 02 / 06 ── Twin
NUMERADOR: 02/06
FOTO: la cama de felpa Twin
ANTETÍTULO: TAMAÑO TWIN
TITULAR — Anton 190, una línea:
TWIN
SUBTÍTULO: 100 × 190 cm · alto 105 cm
PLACA DE PRECIO: $104.99
NOTA: Más ITBMS. Con colchón Imperial: $179.99
CÓDIGO: COD XHT022-T-W · XHT022-T-BG

── DIAPOSITIVA 03 / 06 ── Full
NUMERADOR: 03/06
FOTO: la cama de felpa Full
ANTETÍTULO: TAMAÑO FULL
TITULAR — Anton 190, una línea:
FULL
SUBTÍTULO: ⟪PENDIENTE: medidas Full⟫ · alto 105 cm
PLACA DE PRECIO: $129.99
NOTA: Más ITBMS. Con colchón Imperial: $219.99
CÓDIGO: COD XHT022-F-W · XHT022-F-BG

── DIAPOSITIVA 04 / 06 ── Queen
NUMERADOR: 04/06
FOTO: la cama de felpa Queen, en blanco
ANTETÍTULO: TAMAÑO QUEEN
TITULAR — Anton 190, una línea:
QUEEN
SUBTÍTULO: ⟪PENDIENTE: medidas Queen⟫ · alto 105 cm
PLACA DE PRECIO: $149.99
NOTA: Más ITBMS. Solo en blanco. Con colchón Dulces Sueños: $308.99
CÓDIGO: COD XHT022-Q-W

── DIAPOSITIVA 05 / 06 ── King
NUMERADOR: 05/06
FOTO: la cama de felpa King, en blanco
ANTETÍTULO: TAMAÑO KING
TITULAR — Anton 190, una línea:
KING
SUBTÍTULO: ⟪PENDIENTE: medidas King⟫ · alto 105 cm
PLACA DE PRECIO: $169.99
NOTA: Más ITBMS. Solo en blanco. Con colchón First: $389.99
CÓDIGO: COD XHT022-K-W

── DIAPOSITIVA 06 / 06 ── cierre
NUMERADOR: 06/06
FOTO: la cama de felpa en el tamaño que se quiera repetir
ANTETÍTULO: MIDE TU CUARTO
TITULAR — Anton 128, 3 líneas, cortes exactos:
¿CUÁL
⟦TE CABE⟧
A TI?
SUBTÍTULO: Pásanos el ancho de tu pared
SIN placa de precio en esta diapositiva.
NOTA: Te decimos cuál te queda cómodo
CÓDIGO: LÍNEA XHT022

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ANTES DE DEVOLVER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No escribas, no redactes, no completes, no acortes, no traduzcas y no "mejores" ningún
texto. Todo el texto ya estaba escrito arriba. Cópialo carácter por carácter, con sus
tildes, sus eñes, sus signos de apertura y sus puntos finales. No añadas ningún precio,
medida, plazo de entrega, costo de armado, costo de delivery, testimonio ni nombre de
cliente que no esté escrito literalmente arriba. No generes la cama: va cargada como
foto real. No generes personas.

Recorre esta lista una por una:

[ ] ¿Son 6 lienzos, en orden, y cada uno mide 1080×1350 exactos?
[ ] ¿Cada titular tiene los mismos saltos de línea que le puse, sin recolocar ni una
    palabra?
[ ] ¿Está el texto con todas sus tildes y todas sus eñes? Búscalas una por una:
    TAMAÑOS · TAMAÑO · ¿CUÁL · COLCHÓN · MÁS · ESCRÍBENOS · Sueños · Pásanos
[ ] ¿Hay UN SOLO subrayado amarillo por titular, y solo en las diapositivas 01 y 06, y
    coincide exactamente con lo que iba entre ⟦ ⟧?
[ ] ¿Se te ha colado algún corchete ⟦ o ⟧ dentro de un lienzo o de un PNG?
[ ] ¿Se te ha colado algún paréntesis ⟪ ⟫ de los huecos pendientes? Si queda uno, avisa
    y NO exportes esa diapositiva.
[ ] ¿Hay algún texto, ícono, línea o borde amarillo #FED00F apoyado sobre blanco
    #FFFFFF o sobre hueso #E0DDD1? Búscalo en tu propio código.
[ ] ¿El precio está en azul #1340B1 sobre la placa amarilla, en las cuatro que lo
    llevan, y no al revés?
[ ] ¿Aparece algún color fuera de la paleta, incluida la interfaz del documento?
[ ] ¿Están Anton, Oswald e Inter cada una en su papel, y ninguna otra familia?
[ ] ¿El orden dentro del bloque de texto es el mismo en las 6?
[ ] ¿El tope del bloque de titular está en y=870 en las 6, sin saltar?
[ ] ¿Hay alguna caja, tarjeta, franja o sombra detrás del texto, aparte de la placa del
    precio y la banda inferior?
[ ] ¿Alguna imagen tiene letras, números, iconos o logotipos dentro?
[ ] ¿El azul del fondo es exactamente el mismo valor en las 6, sin costura al deslizar?
[ ] ¿Dibujaste la cama en vez de dejar el hueco de carga? Si lo hiciste, quítala.
[ ] ¿Hay alguna persona en alguna diapositiva?
[ ] ¿El exportador lee las posiciones del DOM ya maquetado, o las recalcula?
[ ] ¿Esperas a document.fonts.ready antes de medir y antes de exportar?
[ ] ¿Bloquea la descarga cuando falta el logo o falta la foto de una diapositiva?
[ ] ¿Las únicas cifras del documento son 104.99, 179.99, 129.99, 219.99, 149.99,
    308.99, 169.99, 389.99, 100, 190, 105 y los números de diapositiva? Cualquier otra
    cifra la añadiste tú: quítala.
[ ] ¿Hay exactamente 6 hashtags, todos al final de la descripción y ninguno dentro de
    una imagen?
[ ] ¿Hay algún emoji dentro de una imagen? Fuera.
```

# FIN DEL PROMPT MAESTRO

---

## La descripción del carrusel (una sola para las 6)

> Una cama. Cuatro tamaños. Y el precio no se esconde.

La cama de felpa que te gustó existe en Twin, Full, Queen y King — la misma cabecera
alta de curva redondeada, el mismo tapizado suavecito, las mismas patas cónicas que
levantan la cama y hacen ver el cuarto más amplio.

🛏️ **Twin** — $104.99 + ITBMS · con colchón $179.99
🛏️ **Full** — $129.99 + ITBMS · con colchón $219.99
🛏️ **Queen** — $149.99 + ITBMS · con colchón $308.99
🛏️ **King** — $169.99 + ITBMS · con colchón $389.99

Twin y Full las tenemos en blanco y en beige. Queen y King, en blanco.

¿No sabes cuál te cabe? Mide el ancho de la pared donde la quieres poner y pásanos el
número — te decimos cuál te queda cómodo y cuál te va a dejar el cuarto apretado.

Y si prefieres pagarla por partes, la llevas a cuotas con tafi, aprobación fácil.

Promoción de apertura, por tiempo limitado.

📲 **Contáctanos por WhatsApp y te la separamos de inmediato.**
📍 La Chorrera, frente al parque Libertadores.

#DCASA #DcasaPty #TuCasaBienAmueblada #MueblesPanama #LaChorrera #CamaDeFelpa

---

## Decisiones tomadas que el humano podría querer distintas

1. **6 diapositivas, no 4.** Una portada delante y un cierre detrás. El estándar pide
   que la primera lleve el peso (es la única que se ve en el feed sin deslizar) y que la
   última cierre o pida algo — un carrusel que muere en el precio del King se queda sin
   CTA justo donde el lector ya está convencido.
2. **El colchón del combo va nombrado** (Imperial, Dulces Sueños, First) porque está en
   el inventario y es información real que le sirve al cliente. Si prefieren no nombrar
   marca de colchón, se borra de las notas y de la descripción sin tocar nada más.
3. **Se dice en la pieza que Queen y King son solo blanco.** Esconderlo convierte un
   dato de catálogo en un reclamo por WhatsApp.
