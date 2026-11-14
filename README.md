# Bernardo Mattos — Portafolio

Sitio web minimalista en blanco y negro para un pintor profesional. Muestra las obras a color,
con una ventana de detalle por cada cuadro y un botón que lleva directo a WhatsApp
(**Comprar**, **Cotizar** o **Encargar una obra similar**, según cada obra).

Es un sitio estático: HTML, CSS y JavaScript, sin dependencias ni paso de compilación.

## Estructura

```
index.html        Página única (portada, obras, artista, contacto)
css/styles.css    Estilos
js/datos.js       Datos del sitio: número de WhatsApp y lista de obras  ← aquí se edita todo
js/main.js        Lógica del portafolio y de la ventana de detalle
img/artista.jpg   Foto del artista
img/obras/        Fotos de las pinturas
CREDITOS.md       Fuentes y licencias de las imágenes de ejemplo
```

## Antes de publicar

1. **WhatsApp:** cambia `whatsapp` en `js/datos.js` por el número real (código de país, solo dígitos).
2. **Obras:** reemplaza las fotos de `img/obras/` y edita cada obra en `js/datos.js`
   (título, año, técnica, medidas, precio, estado). Borra la línea `autor` de cada una.
   Cada obra tiene una `categoria` (`oleos`, `acuarelas` o `dibujos`): con ella aparece en el
   filtro **Todas · Óleos · Acuarelas · Dibujos** de la sección Obras. Puedes cambiar los
   nombres o agregar categorías en la lista `categorias` de `js/datos.js`; si una categoría
   no tiene obras, su filtro se oculta solo.
3. **Artista:** reemplaza `img/artista.jpg` y borra el `<figcaption>` en `index.html`.
4. **Textos:** edita la sección "El artista" en `index.html`.
5. Las imágenes actuales son **de ejemplo** (dominio público); mira `CREDITOS.md`.
   Pertenecen a otros artistas y no deben presentarse como obra propia. Cuando las
   reemplaces, borra `CREDITOS.md`.
6. En `index.html`, usa la URL completa en `og:image` para que se vea bien al compartir el enlace.

## Ver el sitio en local

Abre `index.html` con doble clic, o levanta un servidor:

```bash
python -m http.server 5173
```

y entra a <http://localhost:5173>.

## Publicar en Vercel

1. En Vercel: **Add New… → Project** e importa este repositorio.
2. **Framework Preset:** `Other`. Deja vacíos *Build Command* y *Output Directory*.
3. **Deploy**. Cada `git push` a `main` publica una versión nueva.
