# Método de agencia — Videos con IA en el calendario (video animado y reel por planos)

> Estándar para TODOS los clientes. Nace de la primera prueba completa (Baby Caleb, 2026-11-06): un video animado de Nateen Pants y un reel cinematográfico de Wipes Nateen. Cada regla de aquí corrige un error que ya se cometió una vez. Los datos propios de cada marca (IDs de fotos, voz, personaje) van en el `04_master_prompts.md` de su carpeta.

## 0. Antes de empezar (los dos formatos)

1. **Leer el catálogo del Estudio** (`ver_estudio`): ahí están los IDs de las fotos REALES de cada producto y del logo. Nunca pedirle esos IDs a la persona: el calendario los tiene.
2. **Copiar los beneficios del catálogo del producto exacto, no del de su hermano.** Error cometido: se le atribuyó "fibras de bambú" y "sin alcohol" a los Wipes Nateen; el bambú es de los PAÑALES Nateen y el "sin alcohol" de los wipes Dany Baby. Cada producto dice sólo lo suyo.
3. **Respetar el léxico de la marca** (p. ej. en Baby Caleb: "fibras de bambú", nunca "bambú" a secas ni "100% bambú").
4. **La voz:** si la marca tiene una voz elegida que todavía no es la del kit, pasarla a mano en `generar_locucion` (`voz=<id>`) en CADA video. `crear_reel` con `montar=true` usa la voz del kit: para otra voz, montar con `montar_reel` (automatico=false) y generar la locución aparte.

## 1. Video animado (motion graphics con código)

1. **Posiciones SIEMPRE por zonas** (`arriba`, `centro`, `abajo`, `-izq/-der`). Error cometido: usar coordenadas x/y convirtió 0 errores graves en 18 (encimados, fuera de cuadro, tapados por subtítulos). El motor sólo reparte sin encimar cuando son zonas.
2. **El personaje de marca no es la pieza «personaje».** La pieza `personaje` dibuja una figura genérica (sin casco, sin rasgos de la marca). Si la marca tiene mascota propia (p. ej. el bebé vikingo de Baby Caleb), se generan imágenes de la mascota a partir del logo (`crear_en_estudio`, logo en referencias, `sin_logo=true`, fondo liso) y se ponen como capa `imagen`. Revisar cada pose: descartar la que traiga texto inventado.
3. **Fondo de escena = fondo de la imagen** de la mascota, para que se funda (no un recuadro).
4. **Una imagen grande + el logo en la misma escena encogen el producto**: el motor reserva sitio para todo lo que entra en la escena, aunque entre después. El precio con el producto va en una escena y el cierre (logo + llamado) en otra.
5. **El texto de `pantalla` se pinta como titular si la escena no trae otro texto**: no repetir ahí el precio que ya muestra una `cifra`.
6. **Revisar con `ver_cuadro` las escenas clave antes de renderizar** (gancho, producto, cierre). `revisar_video` no ve composición, sólo zonas y choques.

## 2. Reel cinematográfico por planos (storyboard → clips → montaje)

1. **SIEMPRE `revisar=true`** en `crear_reel`: que se pare tras el storyboard. Error cometido: sin revisión, el video caro arrancó con planos malos.
2. **El producto "malo" del problema tiene que ser inconfundible:** genérico, de otro COLOR (p. ej. bolsa rosada), sin logo, sin hojas ni nada de la marca, y decirlo en el `hilo` del guion. Error cometido: el modelo dibujó el paquete "que irrita" igual al de Nateen → el anuncio decía que Nateen irrita.
3. **Revisar los 10 fotogramas uno por uno** (`estado_reel` y `ver_pieza` para los que no se ven): empaque fiel, nada de la marca en el lado malo, nada inventado (textos, sellos).
4. **Modelo de video:** el predeterminado (Seedance 2.5, ~$0.10/s ≈ $3 por 30 s) es caro y puede fallar por saldo de Kie aunque la cuenta tenga créditos. **Usar Veo 3.1 Lite (Kie) por clips** (~$0.03/s, ≈ $1.20 los 10 clips): cada plano arranca de su fotograma revisado y el producto sale fiel. Alternativa barata: Seedance 2.0 Mini.
5. **Clips que no salen:** Veo rechaza a veces primeros planos de piel del bebé (salieron 8 de 10). El montaje automático **se salta también la frase de voz de ese plano** → revisar el guion montado (`ver_video`) y devolver la frase a la escena vecina. Error cometido: se perdieron el gancho y la única mención de la marca ("Cambia a los hipoalergénicos Nateen").
6. **El clip puede transformar el producto mientras avanza** (el paquete Nateen terminó rosado al final del clip). Para las tomas de producto del final (beneficio, caja, cierre) usar el **fotograma fijo ya revisado** como capa `imagen` con `encuadre=completo` y `movimiento=acercar/paneo`: sin clip, no hay transformación.

## 3. Voz trabada en el montaje (la locución sola suena bien)

La causa NO es la locución: es cómo el montaje reparte la voz en escenas.

1. **No fijar `hasta` en los clips.** El montaje automático le pone a cada clip su duración (3–4 s); si la frase de esa escena es más corta, el render mete silencio en medio de la oración. Prueba: el reel bajó de 29,9 s a 24,6 s con la misma voz de 23 s al quitarlo (más de 5 s de silencios).
2. **Cada escena con clip debe durar MENOS que su clip** (≤ 3 s para clips de 4 s). Si dura más, el clip se congela en su último cuadro y se nota como "trabado" en el corte. Partir la voz en más escenas cortas: lo dicho no cambia y la locución sirve sin pagar otra.
3. **Efectos de transición apagados** (`sonido_video efectos=false`) en reels por planos.
4. **No pedir un render mientras otro sigue en marcha**: el segundo mata al primero (ffmpeg "signal 15").

## 4. Cierre del trabajo

- La vista previa (`ver_cuadro`) a veces enseña los clips como recuadro "Video": es la carga de la vista, no el archivo. Confirmar en el mp4.
- Al terminar: decir el costo real de lo gastado y qué quedó en la galería para reusar (mascota, música, fotogramas).
