# Campaña activa · Mesitas de noche en par (desde 2026-09-21)

> **Si vas a escribir un anuncio, un DM o una pieza de D'CASA, lee esto primero.**
> Es la única oferta viva de la marca y **no tiene fecha de caducidad**, así que
> sigue vigente hasta que el cliente diga lo contrario. El Paso 2 del orquestador
> manda revisar esta carpeta justamente para que ninguna pieza contradiga lo que
> se está ofreciendo.

## 1 · La mecánica, en una línea

**Una mesita de noche va a su precio de lista. Dos del mismo modelo, 10 % de
descuento sobre el total de las dos.**

Tres precisiones que deciden el copy:

- **El 10 % sale del total**, no de cada unidad. Es lo mismo aritméticamente,
  pero se dice como el cliente lo entiende: *«el par te queda en $28.78»*.
- **Las dos tienen que ser el mismo modelo.** No se mezclan modelos ni se cruza
  entre las compactas y las de más almacenamiento. Si alguien pregunta por dos
  distintas, van a precio de lista.
- **Sin fecha de fin.** Confirmado por el cliente el 2026-09-21. Por lo tanto
  **ninguna pieza dice «últimos días», «esta semana solamente» ni «corre»** — el
  ADN §6 prohíbe la escasez falsa, y aquí sería falsa de verdad.

**Por qué el par y no cualquier combinación.** El requisito de modelo idéntico no
es una traba, es el ángulo: las mesitas de noche se compran en par porque la cama
tiene dos lados. Una cama con mesita de un solo lado se ve a medio terminar. El
copy vende eso —*una a cada lado*— y el descuento es la consecuencia, no el
titular.

## 2 · Dónde aplica

Las **17 mesitas de noche** del inventario del 2026-09-21 — las dos familias
completas, 515 unidades. Ningún otro producto del catálogo entra: ni peinadoras,
ni muebles para TV, ni el escritorio.

Fuente de los precios:
[`../00_Inventario/2026-09-21_seleccion_stock_alto.md`](../00_Inventario/2026-09-21_seleccion_stock_alto.md).

### 2.1 · Compactas ($15.99 – $24.99 · 267 u)

| Código | 1 unidad | El par (−10 %) | Ahorro |
|---|---|---|---|
| `DS090201` | $15.99 | **$28.78** | $3.20 |
| `DS090203` | $15.99 | **$28.78** | $3.20 |
| `SHUQ090405` | $17.99 | **$32.38** | $3.60 |
| `SHUQ090403` | $17.99 | **$32.38** | $3.60 |
| `SHUQ090401` | $17.99 | **$32.38** | $3.60 |
| `SHUQ090407` | $17.99 | **$32.38** | $3.60 |
| `DS090226` | $19.99 | **$35.98** | $4.00 |
| `LXI090408` | $21.99 | **$39.58** | $4.40 |
| `ZQ093403` | $24.99 | **$44.98** | $5.00 |

### 2.2 · Con más almacenamiento ($21.99 – $46.99 · 248 u)

| Código | 1 unidad | El par (−10 %) | Ahorro |
|---|---|---|---|
| `LXI090402` | $21.99 | **$39.58** | $4.40 |
| `LXI090412` | $26.99 | **$48.58** | $5.40 |
| `LXI090411` | $26.99 | **$48.58** | $5.40 |
| `LXI090410` | $26.99 | **$48.58** | $5.40 |
| `LXI090201` | $42.99 | **$77.38** | $8.60 |
| `LXI090205` | $42.99 | **$77.38** | $8.60 |
| `LXI090206` | $46.99 | **$84.58** | $9.40 |
| `LXI090203` | $46.99 | **$84.58** | $9.40 |

> `LXI090202` queda fuera mientras su precio siga en revisión — §1.1 del
> inventario.

## 3 · Cómo se maqueta (y el error que está cantado)

**El precio de lista NO se tacha.** La plantilla C de
[`../01_ADN_y_Memoria/05_receta.json`](../01_ADN_y_Memoria/05_receta.json)
tiene una variante con rebaja —«ANTES» tachado arriba, pequeño y sin drama— y
**esta promoción no es esa variante**. El precio de una unidad no bajó: sigue
siendo $15.99. Lo que existe es un segundo precio, el del par. Un tachado aquí
dice que la mesita bajó de precio, que es mentira, y además invita al sticker
rojo de oferta que el ADN §9 prohíbe.

Dónde va cada cosa en la lámina de producto:

| Bloque | Contenido |
|---|---|
| Precio (placa amarilla, Anton 96) | El de **una** unidad — `$15.99` |
| Código (Inter 22) | `DS090201` |
| **Nota (Inter 20)** | `Llevando dos iguales: $28.78 el par` |

La nota es el último bloque del `ordenBloque` de la receta y es justo para esto.
No pasa a la placa amarilla: en la placa va un solo precio, o se lee mal de un
vistazo.

### La lámina de la promoción

Va de **segunda** en los dos carruseles de mesitas, entre la portada y el primer
producto. Plantilla B, fondo hueso `#E0DDD1`, banda inferior amarilla.

- Antetítulo: `LLEVANDO DOS`
- Titular: `DOS IGUALES, / 10 % ⟦MENOS⟧`
- Subtítulo: `El 10 % sale del total de las dos. Tienen que ser el mismo modelo: una a cada lado de la cama.`

## 4 · Lo que esta promoción abre y hay que cerrar

1. **El ITBMS deja de ser una pregunta de trámite.** No está declarado si los
   precios lo llevan incluido (`01_brand_guidelines.md` §10). Con un descuento
   encima hay que saber **sobre qué base se calcula el 10 %**: si el precio es
   antes de impuesto, el par no cierra en $28.78 en la caja y la discusión es en
   el mostrador.
2. **El redondeo.** Los pares caen en cifras como $28.78 y $32.38. Si en caja
   redondean a $28.80, las piezas dicen una cosa y el ticket otra. **Confirma el
   redondeo antes de imprimir.**
3. **Qué pasa si pide dos distintas.** El copy dice «del mismo modelo», pero en
   WhatsApp alguien va a pedir una compacta y una grande. Hace falta la respuesta
   acordada para el playbook del bot (`04_master_prompts.md`) — hoy no existe.
4. **Ningún precio está confirmado por Marcial todavía**, ni los de lista ni los
   del par. Es el mismo bloqueo del §4 del inventario.

## 5 · Historial

| Fecha | Qué pasó |
|---|---|
| 2026-09-21 | El cliente confirma la mecánica: 10 % sobre el total, dos del mismo modelo, sin fecha de caducidad. Se aplica a los carruseles del lunes 21 y el jueves 24. |
