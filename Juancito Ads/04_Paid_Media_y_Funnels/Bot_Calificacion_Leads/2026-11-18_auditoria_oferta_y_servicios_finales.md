# Juancito Ads — Auditoría de la oferta y propuesta de servicios finales

> 2026-11-18 · **BORRADOR PARA REVISIÓN DEL FUNDADOR.** Todavía no es oficial: no se
> tocó el ADN, ni el sitio, ni el calendario. Cuando decidas los puntos de la §5, se
> aplican en las cuatro fuentes a la vez (orden en la §6).
>
> Documento compañero: [banco de preguntas del bot y reglas de calificación](2026-11-18_bot_preguntas_respuestas_y_calificacion.md).

---

## 0. Resumen en 30 segundos

- **Los precios están bien.** Los 11 precios del catálogo principal (3 de Ads, 3 de
  Redes, 4 de Web y el Agente CRM) coinciden entre el ADN, el sitio y el estudio de
  mercado del calendario. No propongo cambiar ninguno.
- **El texto alrededor de los precios no está listo para un bot.** Hay cuatro fallos
  serios: (1) los planes de redes tienen **dos juegos de nombres**; (2) una respuesta
  de `/ayuda` dice que Campañas + Redes **incluye la pauta**, lo que rompe la regla
  número uno de la marca; (3) `/terminos` dice que la pauta **no tiene mínimo**, mientras
  el ADN fija **$300** como piso; (4) el chat actual de la web habla con **voseo**.
- **Faltan unas 16 respuestas** que cualquier prospecto va a pedir y que hoy no están
  escritas en ningún sitio: cuándo arrancan las campañas, si se responden comentarios y
  mensajes, cuánto sale al mes el alojamiento del Agente CRM, hasta dónde llegan las
  visitas, qué mueve el precio dentro de un rango… (§3).
- **Recomendación central: una sola fuente de verdad.** Hoy la oferta está copiada en
  cuatro sitios (ADN, `site.ts` del sitio, ficha técnica del calendario y estudio de
  mercado), y ya se desincronizaron. El bot tiene que leer de **una** (propongo
  `site.ts` + `ayuda.ts` del sitio, que ya alimentan la web, el cotizador y el chat) y
  las demás se copian de ahí.

---

## 1. Qué revisé

| Fuente | Qué contiene | Estado |
|---|---|---|
| ADN (`01_ADN_y_Memoria/`) | Brand guidelines §0–§11, buyer personas, SEO, master prompts (propuesta anclada al esfuerzo, mensaje de bienvenida que califica, estructura de campaña propia) | Precios al día (12-10); datos de §0, §8 y §11 viejos |
| Sitio web (repo `PAGINA-JUANCITO-ADS`, commit `e8e1895`) | `src/data/site.ts` (fuente única de precios), `src/data/ayuda.ts` (preguntas frecuentes), `/terminos`, las 4 páginas de servicio, el cotizador y `netlify/functions/chat.ts` (el chat que ya existe) | Es lo más actualizado, con 5 errores de texto (§2) |
| Calendario · cerebro | Ficha técnica, notas de marca y notas de estudio por producto | Ficha incompleta: no nombra el Agente CRM |
| Calendario · estudio de mercado | Catálogo + 7 maletas + objeciones (aprobado 2026-11-04) | Otros nombres en redes; las 11 fichas en rojo |
| Calendario · publicaciones | Noviembre: 6 reels + 5 historias, todo `pending`. Septiembre: vacío | Los reels usan "Full Ventas" |
| Calendario · números del negocio | Ticket, costos, meta, tasa de cierre | Vacío: no hay número mágico |
| SmartLink (`smartlinks/clients/juancito_ads.yml`) | Botones de la bio | Coherente; "diagnóstico" con otra definición |
| Auditorías de julio (`03_Redes_Sociales/Auditorias/`) | Reportes del agente diario | Datos de prueba (MOCK), no sirven como fuente |

---

## 2. Contradicciones, de más a menos grave para el bot

🔴 el bot diría algo falso · 🟠 el bot dudaría o confundiría · 🟡 limpieza

| # | Tema | Qué dice cada fuente | Por qué importa | Qué propongo |
|---|---|---|---|---|
| 1 🔴 | ¿Campañas + Redes incluye la pauta? | `ayuda.ts:55`: "Este plan **ya incluye la pauta de Meta**, no hay que sumarlo aparte." Todo lo demás (ADN §6, la nota de cada plan en `site.ts`, `/terminos` §2, ficha técnica): **la pauta va siempre aparte**. | Es la primera pregunta de `/ayuda` y contradice la regla más importante de la marca. Quien lo lea y luego reciba la propuesta va a sentir que lo engañaron. | Cambiar por: "ya incluye la **gestión** de campañas en Meta (no hace falta sumar un plan de Ads). La **pauta** va aparte, como en todos los planes." El cotizador ya lo hace bien. |
| 2 🔴 | Nombres de los planes de redes | Sitio, cotizador, `/ayuda`, ADN y ficha técnica: **Arranque / Crecimiento / Escala**. Estudio de mercado y los 6 reels de noviembre: **Full Ventas / Full Ventas + Seguidores / Marketing 360**. | Alguien ve "Full Ventas" en un reel, entra a la web y no lo encuentra. El bot no sabría de qué plan le hablan. | Quedarse con **un** juego de nombres (decisión D1). |
| 3 🔴 | ¿$300 de pauta es mínimo o recomendación? | ADN §6 y `/ayuda#presupuesto-minimo`: $300 es la entrada, y quien invierta menos "deja de ser cliente objetivo". `/terminos` §2 y `/ayuda#cuanto-pauta`: los rangos "son recomendaciones, **no un mínimo obligatorio**". | El bot va a filtrar justo por presupuesto, y el documento legal dice lo contrario. | Separar las dos ideas en `/terminos` y en `/ayuda`: "**$300 al mes es el mínimo para trabajar campañas con nosotros.** Dentro de cada plan, el rango es una recomendación." |
| 4 🔴 | Volumen de publicaciones | `/servicios/campanas-redes` (línea 94): "Post, reels y carruseles — **de 1 a 4 diarios** según el plan". `site.ts` y ADN: **1** diario (Arranque y Crecimiento) y **2** (Escala). | Promete el doble del máximo que se vende. | "1 o 2 diarios según el plan". |
| 5 🔴 | Voseo en el chat que ya existe | `chat.ts:78-80`: "**Sos** el asistente…", "**Respondé**…". Ficha técnica: "**no usa voseo**". En Panamá se tutea. | El modelo imita el registro de sus instrucciones, así que puede contestar "vos podés". | Reescribir esas instrucciones en tuteo, o reemplazarlas por las del bot nuevo. |
| 6 🟠 | Cifra de pauta gestionada | Sitio (hero, footer, chat): **+$40,000** (el dato lo diste tú). ADN §8/§11, ficha técnica, estudio de mercado (aparece como "falta" en 6 fichas) y lote 12: "$35,000+, pendiente de refrescar". | El bot leería las dos cifras. | La oficial es **+$40,000**, o la de hoy si ya es mayor (D9). Hay que quitar el "pendiente" del ADN, del estudio y de la ficha. |
| 7 🟠 | Qué hace el Agente CRM | Sitio: contesta, apunta a cada cliente y pasa la conversación a una persona. Estudio de mercado: además "**califica leads** y los deriva… se integra a tu web y redes". | Si el bot de Juancito Ads va a calificar leads (lo que pides), ese es **el** argumento de venta del Agente CRM y el sitio no lo dice. Si el producto que se vende no califica, el estudio promete de más. | Decidir si la calificación forma parte del producto (D6). |
| 8 🟠 | No hay reporte en Arranque | Emprendedor ($250) incluye "Reporte mensual detallado". Arranque ($450–$550) **no lo lista**: el reporte aparece desde Crecimiento. | Se paga más y se ve menos. Un prospecto que compare las tablas lo nota. | Añadir "Reporte mensual de resultados" a Arranque y quitarlo de lo que "suma" Crecimiento. |
| 9 🟠 | Presencialidad | ADN §0 y ficha técnica: "una jornada presencial mensual cuando el plan lo contempla". ADN §6 y sitio: **1, 2 o 4 visitas** según el plan, y "no son jornadas de rodaje". | El bot podría prometerle "una jornada al mes" a un cliente de Escala. | Actualizar el ADN §0 y la ficha con el 1/2/4. |
| 10 🟠 | Ficha técnica incompleta | En "Qué vende", la ficha del calendario **no menciona el Agente CRM**, ni Care, ni los complementos, ni el mínimo de $300. | Es la nota que leen las IAs del calendario. | Regenerarla cuando cierres este documento. |
| 11 🟠 | "Diagnóstico gratuito" | ADN §6C: diagnóstico **de la web** (velocidad + 3 mejoras + plan, en 48 h). SmartLink: "Diagnóstico gratuito **de tu negocio**: análisis y plan de acción en 48h". | Son dos promesas distintas con el mismo nombre. | Definir uno solo (D7): es la mejor excusa para la reunión. |
| 12 🟠 | Casos de retail | `site.ts`: badge "**5X** en ventas" y texto "aumento de facturación **del 50% al 400%** en el primer año". ADN §8: "multiplicó sus ventas por 5". | "Del 50% al 400%" puede leerse como un rango entre varios clientes o como un solo caso. El bot necesita una sola frase. | Fijar la frase oficial de cada caso (en el documento del bot, P5). |
| 13 🟠 | Permanencia y regalos | `/terminos` §8: **sin permanencia**. `04_master_prompts.md`: web de regalo "atada a permanencia mínima" y "tarifa de lanzamiento de 3 meses". | No es una contradicción, porque la propuesta escrita manda sobre los términos. Pero el bot no puede ofrecer ninguna de esas dos palancas. | Regla del bot: las palancas de cierre son **solo tuyas** y se usan en la reunión. |
| 14 🟡 | Soporte de Start | `/ayuda`: "15 días en Start". `site.ts`: el plan Start no menciona soporte. | Poco riesgo. | Añadir "15 días de soporte" a las características de Start. |
| 15 🟡 | Comentario en el código | `campanas-ads.astro:13`: "Los cuatro planes…" (son tres desde el 12-10). | Ninguno para el cliente. | Corregirlo de paso. |
| 16 🟡 | Auditorías de julio | `03_Redes_Sociales/Auditorias/2026-07-27` y `-28`: métricas **MOCK** de muebles y hogar bajo `@juancitoads`. | Si se cargan como conocimiento, el bot hablaría de colchones. | Que no entren nunca como fuente del bot. |

---

## 3. Lo que un prospecto va a preguntar y hoy no está escrito

| # | Pregunta | Por qué importa | Propuesta |
|---|---|---|---|
| H1 | ¿En cuánto tiempo arrancan mis campañas? | "Resultados en menos de 2 semanas" no dice desde cuándo se cuenta. | Fijar un plazo: "campañas al aire en **N** días hábiles desde que tenemos accesos y material". |
| H2 | ¿Responden los comentarios y mensajes de mis redes? | Ningún plan lo dice ni lo niega, y es la pregunta típica de quien contrata redes. | Decidir: sí, no o solo comentarios. Si es "no", decirlo y ofrecer el Agente CRM. |
| H3 | ¿De qué depende el precio dentro del rango ($450–$550, $600–$750, $800–$1,200)? | Un rango sin regla invita a regatear, y el bot no tiene cómo explicarlo. | Escribir la regla (propuesta en §4.3) o fijar un solo precio. |
| H4 | ¿Cuánta pauta necesito con un plan de redes? | Solo los planes de Ads publican su rango de pauta. | Publicar un rango por plan (propuesta en §4.3). |
| H5 | ¿Cuánto me sale al mes el alojamiento y la IA del Agente CRM? | Es lo primero que pregunta quien ve $899, y no hay ni un rango orientativo. | Dar un rango típico según el volumen de mensajes. |
| H6 | ¿Qué garantía tiene el Agente CRM, o una web? | El estudio marca la maleta "garantía" vacía o floja en 7 de las 11 fichas. | Definir qué cubre y por cuánto tiempo. Ejemplo: "si en los 14 días no contesta como acordamos, lo ajustamos sin costo hasta que lo haga". |
| H7 | ¿Hasta dónde llegan las visitas presenciales? | ¿Solo Ciudad de Panamá? ¿Panamá Oeste? ¿El interior? | Definir la zona incluida y qué pasa fuera de ella (viáticos o no). |
| H8 | ¿Trabajan con negocios fuera de Panamá? | Ads, web y CRM son 100% remotos; los planes de redes llevan visitas. | Decidir. |
| H9 | ¿Emiten factura? ¿Las mensualidades llevan ITBMS? | Solo está escrito que las webs no incluyen ITBMS. | Aclararlo. |
| H10 | ¿Cuántas revisiones de contenido tengo? | El ADN dice 2 rondas al mes; el sitio no lo publica. | Publicarlo, porque evita discusiones, o dejarlo solo para la propuesta. |
| H11 | ¿Qué es TikTok "básico" y qué es "avanzado"? | Es justo lo que diferencia Crecimiento de Escala. | Una línea para cada uno. |
| H12 | ¿A los influencers se les paga aparte? | Crecimiento incluye "conexión con creadores". | Recomiendo: la conexión está incluida y el honorario del creador lo paga el cliente. |
| H13 | ¿Hacen Google Ads, logos, fotos de producto, LinkedIn, anuncios en TikTok? | No están en la oferta, y el bot tiene que poder decir "no" sin dudar. | Confirmar la lista de lo que **no** se hace (§4.7). |
| H14 | ¿Cuánto tiempo llevan? ¿Cuántos clientes tienen? ¿Quién es el equipo? | Es la pregunta de confianza número uno. | Dar el año de inicio, el número aproximado de marcas atendidas y cómo presentar al equipo. |
| H15 | ¿Cómo es la reunión? | Es el objetivo final del bot. | Formato (llamada, videollamada o presencial), duración y horarios. |
| H16 | ¿Hay descuento si pago varios meses? | Care sí lo tiene ("2 meses gratis pagando el año"); los planes de marketing no dicen nada. | Decidir. Si no hay descuento, el bot lo dice claro. |

---

## 4. Servicios finales: propuesta

**No toco precios.** Son coherentes entre sí y están en el rango que el ADN registra
de la competencia (§10: hay quien cobra redes desde $320 y Meta Ads desde $400). Lo que
propongo es cambiar **cómo se presentan** y **completar lo que falta**.

### 4.1 Cuatro puertas (así lo cuenta el bot)

El sitio ya organiza la portada por lo que quiere el cliente. El bot usa la misma
lógica y **nunca suelta el menú completo** (son 13 opciones entre planes y servicios):
pregunta, y recomienda **un** plan con una alternativa.

| Lo que dice el cliente | Línea | Planes |
|---|---|---|
| "Quiero que me lleguen clientes" | Campañas Meta Ads | Emprendedor · Empresa · Corporativo |
| "Quiero que me lo manejen todo" | Campañas + Redes | Arranque · Crecimiento · Escala *(nombre pendiente de D1)* |
| "Necesito una web que venda" | Páginas web | Start · Launch · Corporate · Commerce (+ mantenimiento Care) |
| "No doy abasto con los mensajes" | Agente CRM | Pago único |

### 4.2 Línea 1 · Campañas Meta Ads (sin cambios de precio)

| Plan | Honorarios | Pauta recomendada | Para quién (versión del bot) | Ajuste |
|---|---|---|---|---|
| Emprendedor | $250/mes | $300–$600 | Ya vende y empieza a invertir en Meta con orden | Explicar qué entrega su "estudio de mercado" frente al "exhaustivo" de Empresa (el estudio lo marca como dato que falta) |
| Empresa · recomendado | $400/mes | $700–$2,000 | Ya invierte o factura bien y quiere escalar | — |
| Corporativo | $600/mes | $2,000–$5,000+ | Inversión alta, varios objetivos, catálogo web | — |

**Mínimo para entrar: $300/mes de pauta**, así que el mes más barato posible cuesta
**$550** ($250 de gestión + $300 que se le pagan a Meta).

### 4.3 Línea 2 · Campañas + Redes

| Plan | Honorarios | Pauta recomendada (**propuesta, decide tú**) | Ajustes |
|---|---|---|---|
| Arranque | $450–$550/mes | $300–$600 (igual que Emprendedor: son "campañas básicas") | + reporte mensual · regla del rango |
| Crecimiento ⭐ | $600–$750/mes | $500–$1,500 | Definir qué es TikTok básico · el honorario del influencer va aparte |
| Escala | $800–$1,200/mes | $1,000 o más | Definir TikTok avanzado · cuántas sucursales o campañas geolocalizadas entran · por encima del techo, propuesta a medida |

**Regla del rango (propuesta):** el precio bajo es para **una ubicación con un
catálogo corto**; el alto, para **2 o más ubicaciones, varias líneas de producto o una
producción más compleja**. Por encima del techo, la cotización es a medida: es el
método "anclado al esfuerzo" del `04_master_prompts.md`, que en un caso real cerró
entre $950 y $1,900 al mes. **Esa cotización solo la da Juan, en reunión.**

Con Arranque, el mes más barato posible cuesta **$750** ($450 + $300 de pauta).

### 4.4 Línea 3 · Páginas web (sin cambios de precio)

Start $295 · Launch $450 · Corporate $850 · Commerce $1,200, todos **+ ITBMS**, con
50 % por adelantado y 50 % a la entrega. Care: $35 · $75 · desde $150 al mes.
Ajuste: que Start publique sus "15 días de soporte". Lo de la renovación del segundo
año ya está resuelto en `/ayuda`: o Care, o se paga directo al proveedor.

### 4.5 Línea 4 · Agente CRM ($899, pago único)

Ajustes:
- **(a)** Decidir si incluye calificación de leads y aviso al dueño. Recomiendo que sí,
  y que **el propio bot de Juancito Ads sea la demo**: "estás hablando con uno".
- **(b)** Publicar un rango orientativo del costo mensual de terceros (H5).
- **(c)** Definir la garantía (H6).
- **(d)** Decir cuánto cuesta ampliarlo más allá de las 30 preguntas iniciales (hoy
  solo dice "se cotiza aparte").

### 4.6 La puerta de la reunión: un solo "Diagnóstico gratuito" (propuesta D7)

> **Diagnóstico gratuito de tu negocio — 30 minutos por videollamada con Juan.**
> Revisamos tus redes, tus anuncios (si tienes) y tu web. Te llevas 3 oportunidades
> concretas y la recomendación del plan que te toca. Sin compromiso.

Es lo que el bot agenda con los leads calientes. Le da al prospecto **una razón para
reunirse que no suena a reunión de ventas**, y a ti, el momento para cotizar a medida y
usar las palancas de cierre. El diagnóstico **solo de la web** (velocidad + 3 mejoras)
se queda como variante para quien únicamente pregunta por páginas.

### 4.7 Lo que no vendemos (propuesta, confírmala)

Google Ads · anuncios en TikTok (el TikTok de los planes de redes es orgánico) ·
creación de logo o marca desde cero · fotografía de producto como servicio suelto ·
LinkedIn · poner la pauta con dinero de la agencia · cobrar por comisión sobre ventas.

---

## 5. Decisiones que necesito de ti

| # | Decisión | Mi recomendación |
|---|---|---|
| D1 | Nombres de los planes de redes | **Arranque / Crecimiento / Escala.** Ya están en el sitio, el cotizador, los términos y la ayuda; solo hay que corregir el estudio de mercado y los 6 reels pendientes. Cambiar a "Full Ventas" obliga a tocar cinco sitios. |
| D2 | ¿El mínimo de $300 de pauta también aplica a redes? ¿Los rangos de pauta de §4.3? | Sí. Rangos como en §4.3 |
| D3 | Regla del rango de precio de redes (H3) | La de §4.3 |
| D4 | Plazo de arranque de campañas (H1) | Un número en días hábiles, contado desde los accesos |
| D5 | ¿Se responden comentarios y mensajes? (H2) | Comentarios sí y mensajes no, con el Agente CRM como solución. Esto es una opinión: lo decides tú |
| D6 | Agente CRM: ¿califica y avisa? Costo mensual de terceros. Garantía (H5, H6) | Que califique, y que el bot de la agencia sea la demo |
| D7 | Diagnóstico gratuito unificado (§4.6) | Sí |
| D8 | Reunión: formato, duración y horarios. ¿El bot agenda directo en tu calendario o te pasa el lead y llamas tú? | El ADN dice que llamas en los primeros 5 minutos. Propongo: aviso inmediato para que llames, y si no contestas en N minutos, el bot ofrece 2 horarios |
| D9 | Cifra de pauta gestionada hoy, año de inicio, número de marcas atendidas y cómo presentar al equipo (H14) | Solo cifras que puedas sostener |
| D10 | Zona de las visitas (H7) y clientes fuera de Panamá (H8) | — |
| D11 | ITBMS en mensualidades y factura fiscal (H9) | — |
| D12 | Revisiones (H10), TikTok básico y avanzado (H11), influencers (H12), lista de "no hacemos" (§4.7), descuentos (H16) | Publicar las 2 rondas; el honorario del influencer aparte; sin descuentos en planes de marketing |
| D13 | ¿Por dónde te avisa el bot? | WhatsApp a tu número para los calientes y un resumen diario por correo |
| D14 | ¿Contesta en inglés si le escriben en inglés? | Sí, con la misma información |

---

## 6. Orden de aplicación (cuando decidas)

1. **Sitio**: `site.ts`, `ayuda.ts`, `/terminos`, `campanas-redes.astro` y `chat.ts`.
   Es la fuente única, y de ahí beben el cotizador y el chat.
2. **ADN**: `01_brand_guidelines.md` §0, §6, §8 y §11. Después,
   `node herramientas/verificar.mjs`.
3. **Calendario**: estudio de mercado (nombres y cifra), ficha técnica (regenerarla) y
   los 6 reels pendientes de noviembre si cambian los nombres.
4. **Bot**: el banco de preguntas del documento compañero, ya corregido por ti, se carga
   como su conocimiento.
