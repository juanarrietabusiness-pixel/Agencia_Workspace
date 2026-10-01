# Flota de equipos propios — Rofer Service

> Última actualización: 2026-10-01 · **Fuente:** listado entregado por el humano (dueño de la agencia) a partir de la información del cliente.
> **16 unidades propias.** Es la prueba concreta del diferencial "flota propia → el equipo idóneo, no el que sobra" ([`01_brand_guidelines.md`](01_brand_guidelines.md) §0 y §1).

Este archivo tiene **dos partes con reglas distintas**:

| Parte | Para qué | ¿Se publica? |
|---|---|---|
| **A · Versión pública** | Redes, campañas, catálogo, captions, guiones | ✅ Sí — con los nombres tal cual |
| **B · Referencia técnica interna** | Identificar el modelo exacto y buscar imágenes de referencia | ❌ **No.** Nunca va en una pieza, caption, anuncio, landing ni en un prompt cuyo resultado se publique |

---

## A · Versión pública (uso en redes y campañas)

| # | Equipo |
|---|---|
| 1 | Pala Volvo 210 |
| 2 | Pala Martillo Volvo 210 |
| 3 | Minipala Volvo 8 ton |
| 4 | Minipala Volvo 3.5 ton |
| 5 | Retroexcavadora CAT 416E |
| 6 | Retro Martillo CAT 416E |
| 7 | Rola Compactadora Bomag 11 ton |
| 8 | Rola Compactadora Bomag 2.5 ton |
| 9 | Camión Volquete Mack Granite |
| 10 | Grúa de Plancha 600 (Grúa Azul) |
| 11 | Volquete Internacional |
| 12 | Camión Volquete Mack |
| 13 | Camión Grúa Mack |
| 14 | Mula + Trailer Cama Baja 25 (Ear Beaver) |
| 15 | Pala CAT 13 ton |
| 16 | Minipala CAT 3.5 ton |

**Reglas de uso público:**
- Los nombres se usan **exactamente como están arriba**: son los que el cliente usa con sus clientes ("pala", "minipala", "rola", "volquete", "mula").
- **No inventar especificaciones** (capacidad, potencia, alcance, año, disponibilidad, precio) que no estén en esta lista. Si una pieza las necesita, se piden al cliente.
- Disponibilidad y tarifas **siempre por WhatsApp** (proceso de venta real, §6 del ADN): la flota se muestra, no se cotiza en la pieza.
- Trato de **usted** en todo copy (regla del ADN).

---

## B · Referencia técnica interna — ⛔ NO PUBLICAR

Solo sirve para **identificar el modelo exacto** de cada unidad y **buscar imágenes de referencia** (p. ej. para que un prompt de imagen/video represente la máquina correcta). Placa y chasis **no** aparecen jamás en una pieza.

| # (pública) | Unidad | Año | Placa | Chasis (VIN) |
|---|---|---|---|---|
| 9 | Mack Volquete Granite | 2015 | GU813E / AU3708 | 1M2AX18C4FM030278 |
| 10 | Grúa de Plancha 600 | 1984 | AJ2051 | 1M2B126C2EA010111 |
| 11 | Internacional Volquete | 1983 | AJ2580 | 1M2B126C7DA009633 |
| 12 | Mack Volquete | 1993 | AJ0895 | 1HTHCBERXPH484805 |
| 13 | Camión Grúa RD688S | 2000 | AJ2714 | 1M2P267C9YM054571 |
| 14 | RD6 (mula) | 1998 | AJ3070 | 1M1P26Y9WM037198 |
| 14b | Ear Beaver Trailer Cama Baja 25 | 2015 | AI2222 | 112LAX393FL079378 |
| 15 | Pala CAT 13 ton | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| 16 | Minipala CAT 3.5 ton | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |

- Las unidades **1 a 8** no tienen referencia técnica todavía (⏳ pedir año/placa/chasis si hace falta el modelo exacto).
- En la unidad 9 se registraron dos placas (`GU813E / AU3708`) tal como llegaron.

### ⚠️ Datos a verificar con el cliente (se registraron tal cual, sin corregir)

1. **Chasis de la unidad 14 (RD6 mula):** `1M1P26Y9WM037198` tiene **16 caracteres**; un VIN tiene 17. Falta o sobra un carácter.
2. **Chasis de las unidades 11 y 12 posiblemente cruzados:** el prefijo `1M2` corresponde a Mack y `1HT` a International. Aquí el *Internacional* (11) tiene `1M2…` y el *Mack* (12) tiene `1HT…`. Confirmar si están intercambiados.
3. **"Ear Beaver":** el fabricante de trailers cama baja con prefijo de chasis `112` es **Eager Beaver**. Confirmar el nombre antes de usarlo en una pieza pública (la unidad 14 de la lista pública dice "Ear Beaver").
