/* ==========================================================
   DATOS DEL SITIO — aquí se edita todo el portafolio.
   No hace falta tocar el HTML para agregar o quitar obras.
   ========================================================== */

const DATOS = {
  artista: "Bernardo Mattos",

  // Número de WhatsApp con código de país, solo dígitos (sin +, espacios ni guiones).
  // Ejemplo Colombia: "573001234567" · México: "5215512345678" · Chile: "56912345678"
  whatsapp: "573000000000",

  /*
    Cada obra:
      titulo, anio, tecnica, descripcion
      ancho, alto      → en centímetros (también definen la proporción de la tarjeta)
      imagen           → ruta de la foto de la pintura (a color)
      precio           → texto, ej. "USD 1.200"  (se muestra y el botón dice "Comprar")
                         o null                  (el botón dice "Cotizar")
      estado           → "disponible" o "vendida" (si está vendida, el botón ofrece encargar una similar)
      autor            → OPCIONAL. Solo se usa mientras las obras sean de ejemplo.
                         Bórralo cuando pongas pinturas propias.

    NOTA: las 9 obras actuales son pinturas famosas de dominio público, puestas
    como EJEMPLO. Los precios y el estado son inventados para mostrar los tres
    tipos de botón. Reemplázalas por las obras reales (ver CREDITOS.md).
  */
  obras: [
    {
      titulo: "La noche estrellada",
      autor: "Vincent van Gogh",
      anio: 1889,
      tecnica: "Óleo sobre lienzo",
      ancho: 92.1, alto: 73.7,
      imagen: "img/obras/obra-01.jpg",
      descripcion: "Pintada en Saint-Rémy-de-Provence, mezcla la vista real desde la ventana del artista con un pueblo imaginado. Un cielo en remolino domina la escena, con un ciprés oscuro en primer plano.",
      precio: "USD 1.800",
      estado: "disponible"
    },
    {
      titulo: "Terraza de café por la noche",
      autor: "Vincent van Gogh",
      anio: 1888,
      tecnica: "Óleo sobre lienzo",
      ancho: 65.5, alto: 81,
      imagen: "img/obras/obra-02.jpg",
      descripcion: "Una terraza de Arlés iluminada por una gran lámpara de gas bajo un cielo estrellado. Amarillos cálidos frente a azules profundos.",
      precio: null,
      estado: "disponible"
    },
    {
      titulo: "El beso",
      autor: "Gustav Klimt",
      anio: "1907–1908",
      tecnica: "Óleo y pan de oro sobre lienzo",
      ancho: 180, alto: 180,
      imagen: "img/obras/obra-03.jpg",
      descripcion: "Una pareja se funde en un abrazo envuelta en ornamentos dorados. Una de las obras más célebres del llamado periodo dorado de Klimt.",
      precio: "USD 1.200",
      estado: "disponible"
    },
    {
      titulo: "Impresión, sol naciente",
      autor: "Claude Monet",
      anio: 1872,
      tecnica: "Óleo sobre lienzo",
      ancho: 63, alto: 48,
      imagen: "img/obras/obra-04.jpg",
      descripcion: "Vista del puerto de Le Havre al amanecer, con un sol anaranjado reflejado en el agua. Su título dio nombre al movimiento impresionista.",
      precio: null,
      estado: "disponible"
    },
    {
      titulo: "Caballo azul I",
      autor: "Franz Marc",
      anio: 1911,
      tecnica: "Óleo sobre lienzo",
      ancho: 84.5, alto: 112,
      imagen: "img/obras/obra-05.jpg",
      descripcion: "Un caballo azul descansa entre formas curvas y colores intensos. Marc usaba el color de forma simbólica y no realista.",
      precio: "USD 1.400",
      estado: "vendida"
    },
    {
      titulo: "Nenúfares",
      autor: "Claude Monet",
      anio: 1906,
      tecnica: "Óleo sobre lienzo",
      ancho: 94.1, alto: 89.9,
      imagen: "img/obras/obra-06.jpg",
      descripcion: "De la serie dedicada al estanque de su jardín en Giverny: hojas de nenúfar y reflejos del cielo flotando sobre el agua.",
      precio: "USD 1.500",
      estado: "disponible"
    },
    {
      titulo: "¿Cuándo te casarás?",
      autor: "Paul Gauguin",
      anio: 1892,
      tecnica: "Óleo sobre lienzo",
      ancho: 77, alto: 101,
      imagen: "img/obras/obra-07.jpg",
      descripcion: "Dos mujeres tahitianas sobre un campo de amarillos y rojos intensos. Planos de color y una paleta audaz, típicos de la etapa de Gauguin en Tahití.",
      precio: "USD 950",
      estado: "disponible"
    },
    {
      titulo: "El almuerzo de los remeros",
      autor: "Pierre-Auguste Renoir",
      anio: "1880–1881",
      tecnica: "Óleo sobre lienzo",
      ancho: 172.7, alto: 129.9,
      imagen: "img/obras/obra-08.jpg",
      descripcion: "Una comida entre amigos en una terraza a orillas del Sena. Luz, color y vida cotidiana en una de las grandes obras del impresionismo.",
      precio: null,
      estado: "disponible"
    },
    {
      titulo: "El sueño",
      autor: "Henri Rousseau",
      anio: 1910,
      tecnica: "Óleo sobre lienzo",
      ancho: 298.5, alto: 204.5,
      imagen: "img/obras/obra-09.jpg",
      descripcion: "Una mujer recostada en un diván en medio de una selva imaginaria, rodeada de animales y plantas exuberantes. Fue la última gran obra de Rousseau.",
      precio: "USD 1.800",
      estado: "disponible"
    }
  ]
};
