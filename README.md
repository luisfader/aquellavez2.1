# Aquella vez 2 · versión web 2.1

Manual interactivo de español de **Luis Fader**. Contiene las Unidades 1 y 2 completas; las Unidades 3 a 10 aparecen en la portada como cartas boca abajo, bloqueadas hasta que se publiquen.

## Qué hay en el sitio

- **Portada** (`index.html`): el libro, la baraja de unidades, los personajes (con su ficha y «¿Quién es quién?») y el prólogo.
- **Unidades** (`unidad1.html`, `unidad2.html`): apartados A–F con diálogos, textos, gramática, cultura e historieta.
- **Diálogos** con el retrato y el color de cada personaje, lectura en voz alta y un *modo actor*: el estudiante elige un personaje, lee sus frases en voz alta y el sitio lee las del otro.
- **Glosario ruso**: las palabras subrayadas muestran su traducción al pasar el cursor o al tocarlas.
- **Ejercicios con corrección automática**: verdadero o falso, opciones, completar con fichas (tocar o arrastrar) o escribiendo, unir, ordenar palabras, conjugar y respuestas abiertas con respuestas posibles.
- **Progreso y estrellas** guardados en el navegador del estudiante; teclado de tildes (á, é, ñ, ¿, ¡…) al escribir.
- **Ajustes**: ayudas en ruso, traducción de palabras, sonidos y borrar el progreso.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `js/datos.js` | Personajes y catálogo de unidades (título, portada, si está disponible). |
| `js/motor.js` | Motor común: bloques de lectura, ejercicios, glosario, voz, progreso. |
| `js/unidad1.js`, `js/unidad2.js` | Textos y ejercicios de cada unidad. |
| `css/estilos.css` | Estilos. |
| `img/` | Ilustraciones (exportadas desde Figma). |
| `tools/imagenes.txt` | Lista de imágenes que el flujo de GitHub importa desde Figma. |

## Cómo publicar una unidad nueva

1. Copiar `unidad2.html` como `unidadN.html` y cambiar `js/unidad2.js` por `js/unidadN.js`.
2. Crear `js/unidadN.js` con el mismo formato. Marcas en los textos:
   - `[[palabra|перевод]]` → palabra con traducción.
   - `{{respuesta|otra respuesta}}` → hueco para completar; `{{?}}` → hueco libre.
   - `**texto**` → negrita; `_texto_` → cursiva.
3. En `js/datos.js`, poner en la unidad `disponible: true`, `pagina: "unidadN.html"` y su `portada`. La carta se dará la vuelta sola.

Tipos de bloque: `figura`, `texto`, `dialogo`, `teoria`, `sabias`, `historieta`, `escala`, `numerador` (lectura) y `vf`, `elegir`, `test`, `huecos`, `unir`, `ordenar`, `formas`, `abierta` (ejercicios).

## Imágenes

Cada línea de `tools/imagenes.txt` tiene: `nombre  tamaño-máximo  URL`. Al subir ese archivo, el flujo **Importar imágenes desde Figma** las descarga, las convierte a JPG y WebP y las guarda en `img/`. Las URL de Figma caducan pronto: si el flujo falla, hay que generar URL nuevas.

## Publicación

El sitio se publica con GitHub Pages directamente desde la rama `main`. Solo hay que activarlo una vez: *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save*. El sitio queda en `https://luisfader.github.io/aquellavez2.1/` y se actualiza solo con cada cambio.
