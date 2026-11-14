(() => {
  "use strict";

  const { artista, whatsapp, obras } = DATOS;

  const $ = (sel) => document.querySelector(sel);
  const grid = $("#grid");
  const modal = $("#modal");
  const mImg = $("#m-img");
  const media = $("#m-media");
  const filtros = $("#filtros");

  /* ---------- Helpers ---------- */

  if (whatsapp === "573000000000") {
    console.warn("Aún usas el número de WhatsApp de ejemplo. Cámbialo en js/datos.js.");
  }

  const waLink = (mensaje) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;

  // Medidas en la convención habitual: alto × ancho.
  const num = (n) => n.toLocaleString("es", { maximumFractionDigits: 1 });
  const medidas = (o) => `${num(o.alto)} × ${num(o.ancho)} cm`;

  // Decide el botón según la obra: comprar, cotizar o encargar una similar.
  function accion(o) {
    const base = `Hola ${artista}, `;
    if (o.estado === "vendida") {
      return {
        texto: "Encargar una obra similar",
        precio: "Obra vendida",
        estado: "Vendida",
        mensaje: `${base}vi la obra «${o.titulo}» y me gustaría encargar una pieza similar. ¿Podemos hablar?`
      };
    }
    if (o.precio) {
      return {
        texto: "Comprar por WhatsApp",
        precio: o.precio,
        estado: "Disponible",
        mensaje: `${base}me interesa comprar la obra «${o.titulo}» (${o.tecnica}, ${medidas(o)}) por ${o.precio}. ¿Sigue disponible?`
      };
    }
    return {
      texto: "Cotizar por WhatsApp",
      precio: "Precio a consultar",
      estado: "Disponible",
      mensaje: `${base}me gustaría cotizar la obra «${o.titulo}» (${o.tecnica}, ${medidas(o)}). ¿Me compartes el precio y los detalles de entrega?`
    };
  }

  function el(tag, props = {}, ...hijos) {
    const nodo = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") nodo.className = v;
      else if (k === "text") nodo.textContent = v;
      else nodo.setAttribute(k, v);
    }
    nodo.append(...hijos);
    return nodo;
  }

  // Carga una imagen con tolerancia a fallos: si falla, reintenta una vez;
  // si vuelve a fallar, marca el contenedor con "is-broken" (se muestra un recuadro neutro).
  function cargarImagen(img, src, contenedor, alFinalizar) {
    let reintentos = 0;
    img.dataset.src = src;
    img.onload = () => {
      contenedor.classList.remove("is-broken");
      if (alFinalizar) alFinalizar();
    };
    img.onerror = () => {
      if (reintentos++ < 1) {
        setTimeout(() => {
          if (img.dataset.src === src) img.src = `${src}?r=${Date.now()}`;
        }, 800);
      } else {
        contenedor.classList.add("is-broken");
        if (alFinalizar) alFinalizar();
      }
    };
    contenedor.classList.remove("is-broken");
    img.src = src;
  }

  /* ---------- Portafolio ---------- */

  obras.forEach((o, i) => {
    const img = el("img", {
      alt: `${o.titulo}, ${o.tecnica}, ${medidas(o)}`,
      loading: "lazy",
      decoding: "async"
    });
    const marco = el(
      "span",
      { class: "card__frame", style: `aspect-ratio:${o.ancho} / ${o.alto}` },
      img
    );
    cargarImagen(img, o.imagen, marco);
    if (o.estado === "vendida") marco.append(el("span", { class: "card__tag", text: "Vendida" }));

    const card = el(
      "button",
      { class: "card", type: "button", "aria-haspopup": "dialog", "data-i": i, "data-cat": o.categoria || "" },
      marco,
      el(
        "span",
        { class: "card__meta" },
        el("span", { class: "card__title", text: o.titulo }),
        el("span", { class: "card__sub", text: o.autor ? `${o.autor} · ${o.anio}` : `${o.anio} · ${o.tecnica}` })
      )
    );
    grid.append(card);
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) abrir(Number(card.dataset.i));
  });

  /* ---------- Filtro por categoría (Óleos, Acuarelas, Dibujos) ---------- */

  const categorias = (DATOS.categorias || []).filter((c) =>
    obras.some((o) => o.categoria === c.id)
  );
  let filtro = "todas";

  // Índices de las obras que se ven con el filtro actual.
  const indicesVisibles = () =>
    obras.map((_, i) => i).filter((i) => filtro === "todas" || obras[i].categoria === filtro);

  function aplicarFiltro(id) {
    filtro = id;
    const visibles = indicesVisibles();
    grid.querySelectorAll(".card").forEach((card) => {
      card.hidden = !visibles.includes(Number(card.dataset.i));
    });
    filtros.querySelectorAll(".filter").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.id === id));
    });
    $("#galeria-note").textContent =
      `${visibles.length} ${visibles.length === 1 ? "obra" : "obras"} · Toca una para ver los detalles.`;
  }

  if (categorias.length) {
    [{ id: "todas", nombre: "Todas" }, ...categorias].forEach((c) => {
      const n = c.id === "todas" ? obras.length : obras.filter((o) => o.categoria === c.id).length;
      filtros.append(
        el(
          "button",
          { type: "button", class: "filter", "data-id": c.id, "aria-pressed": "false" },
          c.nombre,
          el("span", { class: "filter__n", text: String(n) })
        )
      );
    });
    filtros.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (b) aplicarFiltro(b.dataset.id);
    });
  } else {
    filtros.hidden = true;
  }
  aplicarFiltro("todas");

  /* ---------- Ventana de detalle ---------- */

  let actual = 0;
  let lista = []; // obras visibles según el filtro al abrir la ventana

  function mostrar(i) {
    actual = i;
    const o = obras[actual];
    const a = accion(o);

    mImg.classList.add("is-loading");
    mImg.alt = `${o.titulo}, ${o.tecnica}, ${medidas(o)}`;
    cargarImagen(mImg, o.imagen, media, () => mImg.classList.remove("is-loading"));

    $("#m-status").textContent = a.estado;
    $("#m-title").textContent = o.titulo;
    $("#m-autor-dt").hidden = $("#m-autor").hidden = !o.autor;
    $("#m-autor").textContent = o.autor || "";
    $("#m-year").textContent = o.anio;
    $("#m-tech").textContent = o.tecnica;
    $("#m-size").textContent = medidas(o);
    $("#m-desc").textContent = o.descripcion;
    $("#m-price").textContent = a.precio;

    const cta = $("#m-cta");
    cta.textContent = a.texto;
    cta.href = waLink(a.mensaje);

    modal.scrollTop = 0;
    modal.querySelector(".modal__info").scrollTop = 0;
  }

  // Pasa a la obra anterior (-1) o siguiente (+1) dentro de las visibles.
  function mover(delta) {
    if (lista.length < 2) return;
    const pos = lista.indexOf(actual);
    mostrar(lista[(pos + delta + lista.length) % lista.length]);
  }

  function abrir(i) {
    lista = indicesVisibles();
    const solo = lista.length < 2;
    modal.querySelector("[data-prev]").hidden = solo;
    modal.querySelector("[data-next]").hidden = solo;
    mostrar(i);
    if (!modal.open) modal.showModal();
  }

  modal.querySelector("[data-close]").addEventListener("click", () => modal.close());
  modal.querySelector("[data-prev]").addEventListener("click", () => mover(-1));
  modal.querySelector("[data-next]").addEventListener("click", () => mover(1));

  // Clic fuera de la ventana (sobre el fondo oscuro) la cierra.
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mover(-1);
    if (e.key === "ArrowRight") mover(1);
  });

  // Deslizar con el dedo sobre la imagen para cambiar de obra.
  let x0 = null;
  media.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  media.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
  });

  /* ---------- Contacto general ---------- */

  $("#wa-general").href = waLink(
    `Hola ${artista}, me gustaría hablar sobre una obra por encargo.`
  );
  $("#year").textContent = new Date().getFullYear();
})();
