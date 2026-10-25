/* ==========================================================
   Aquella vez 2 · motor del manual interactivo
   - Marcado en los textos:
       [[palabra|перевод]]  palabra con traducción al ruso
       {{respuesta|otra}}   hueco (respuestas aceptadas separadas por |)
       {{?}}                hueco libre (cualquier ficha del banco)
       **negrita**   _cursiva_
   ========================================================== */
(function () {
  "use strict";
  var AV = (window.AV = window.AV || {});
  var CLAVE = "aquellavez2.1";

  /* ---------------------------------------------------------
     Almacenamiento (todo queda en este navegador)
     --------------------------------------------------------- */
  var datos = leer();
  function leer() {
    var d;
    try { d = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { d = {}; }
    d.ajustes = Object.assign({ ru: true, glosario: true, sonido: true }, d.ajustes || {});
    d.ej = d.ej || {};
    d.unidades = d.unidades || {};
    return d;
  }
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* modo privado */ } }
  AV.datos = datos;
  AV.guardar = guardar;
  AV.borrarProgreso = function () {
    var aj = datos.ajustes;
    try { localStorage.removeItem(CLAVE); } catch (e) {}
    datos.ej = {}; datos.unidades = {}; datos.ultima = null; datos.ajustes = aj;
    guardar();
  };

  /* ---------------------------------------------------------
     Utilidades
     --------------------------------------------------------- */
  function h(tag, props) {
    var e = document.createElement(tag);
    props = props || {};
    for (var k in props) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "text") e.textContent = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    for (var i = 2; i < arguments.length; i++) anadir(e, arguments[i]);
    return e;
  }
  function anadir(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { anadir(e, x); }); return; }
    e.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function marcado(s) {
    return esc(s)
      .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, function (_, es, ru) {
        return '<span class="g" tabindex="0" data-ru="' + ru + '">' + es + "</span>";
      })
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/(^|[\s(«])_(.+?)_(?=[\s.,;:!?»)]|$)/g, "$1<i>$2</i>");
  }
  function plano(s) {
    return String(s)
      .replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, "$1")
      .replace(/\{\{([^}|]*)[^}]*\}\}/g, "$1")
      .replace(/\*\*|_/g, "");
  }
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[.,;:!?¡¿«»"“”'’()\[\]—–]/g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function sinTildes(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function mezclar(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; }
    return b;
  }
  function mezclarDistinto(a) {
    if (a.length < 2) return a.slice();
    var b, n = 0;
    do { b = mezclar(a); n++; } while (n < 12 && b.every(function (x, i) { return x === a[i]; }));
    return b;
  }
  function imagen(src, alt, cls) {
    var pic = h("picture", { class: cls || null },
      h("source", { srcset: "img/" + src + ".webp", type: "image/webp" }),
      h("img", { src: "img/" + src + ".jpg", alt: alt || "", loading: "lazy", decoding: "async" }));
    pic.querySelector("img").addEventListener("error", function () { pic.classList.add("sin-imagen"); });
    return pic;
  }
  var reduceMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  AV.util = { h: h, marcado: marcado, plano: plano, imagen: imagen, mezclar: mezclar, norm: norm };

  /* ---------------------------------------------------------
     Ajustes visibles (ruso, glosario)
     --------------------------------------------------------- */
  function aplicarAjustes() {
    document.documentElement.classList.toggle("sin-ru", !datos.ajustes.ru);
    document.documentElement.classList.toggle("sin-glosario", !datos.ajustes.glosario);
  }
  aplicarAjustes();
  AV.aplicarAjustes = aplicarAjustes;

  /* ---------------------------------------------------------
     Glosario ruso
     --------------------------------------------------------- */
  var Glosa = {
    pop: null, actual: null,
    init: function () {
      this.pop = h("div", { class: "glosa", role: "tooltip", id: "glosa" });
      document.body.appendChild(this.pop);
      var self = this;
      document.addEventListener("mouseover", function (e) {
        var g = e.target.closest && e.target.closest(".g");
        if (g && matchMedia("(hover: hover)").matches) self.mostrar(g);
      });
      document.addEventListener("mouseout", function (e) {
        var g = e.target.closest && e.target.closest(".g");
        if (g && matchMedia("(hover: hover)").matches && !g.contains(e.relatedTarget)) self.ocultar();
      });
      document.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("g")) self.mostrar(e.target); });
      document.addEventListener("focusout", function (e) { if (e.target.classList && e.target.classList.contains("g")) self.ocultar(); });
      document.addEventListener("click", function (e) {
        var g = e.target.closest && e.target.closest(".g");
        if (g) {
          if (self.actual === g && !matchMedia("(hover: hover)").matches) self.ocultar(); else self.mostrar(g);
          Voz.decir(g.textContent, { vel: 0.85 });
        } else if (!e.target.closest(".glosa")) self.ocultar();
      });
      window.addEventListener("scroll", function () { self.ocultar(); }, { passive: true });
    },
    mostrar: function (g) {
      if (!datos.ajustes.glosario) return;
      this.actual = g;
      this.pop.innerHTML = '<b lang="es">' + esc(g.textContent) + '</b><span lang="ru">' + esc(g.dataset.ru) + "</span>";
      this.pop.classList.add("visible");
      var r = g.getBoundingClientRect(), p = this.pop.getBoundingClientRect();
      var x = Math.min(Math.max(8, r.left + r.width / 2 - p.width / 2), innerWidth - p.width - 8);
      var y = r.top - p.height - 10;
      this.pop.classList.toggle("abajo", y < 70);
      if (y < 70) y = r.bottom + 10;
      this.pop.style.left = x + "px";
      this.pop.style.top = y + "px";
    },
    ocultar: function () { this.actual = null; if (this.pop) this.pop.classList.remove("visible"); },
  };

  /* ---------------------------------------------------------
     Lectura en voz alta
     --------------------------------------------------------- */
  var Voz = {
    ok: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    voz: null,
    init: function () {
      if (!this.ok) return;
      var self = this;
      var elegir = function () {
        var vs = speechSynthesis.getVoices().filter(function (v) { return /^es/i.test(v.lang); });
        var pref = ["es-AR", "es-US", "es-MX", "es-419", "es-ES"];
        self.voz = null;
        for (var i = 0; i < pref.length && !self.voz; i++) {
          self.voz = vs.find(function (v) { return v.lang.replace("_", "-") === pref[i]; }) || null;
        }
        if (!self.voz) self.voz = vs[0] || null;
      };
      elegir();
      speechSynthesis.addEventListener && speechSynthesis.addEventListener("voiceschanged", elegir);
    },
    decir: function (texto, op) {
      var self = this;
      op = op || {};
      return new Promise(function (res) {
        if (!self.ok) return res();
        var u = new SpeechSynthesisUtterance(plano(texto));
        u.lang = self.voz ? self.voz.lang : "es-ES";
        if (self.voz) u.voice = self.voz;
        u.rate = op.vel || 0.92;
        u.pitch = op.tono || 1;
        u.onend = u.onerror = function () { res(); };
        if (!op.cola) speechSynthesis.cancel();
        speechSynthesis.speak(u);
      });
    },
    parar: function () { if (this.ok) speechSynthesis.cancel(); },
  };
  AV.voz = Voz;

  /* ---------------------------------------------------------
     Sonidos cortos (Web Audio)
     --------------------------------------------------------- */
  var Sonido = {
    ctx: null,
    notas: function (frecs, dur, tipo, vol) {
      if (!datos.ajustes.sonido) return;
      try {
        this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
        var c = this.ctx, t = c.currentTime;
        frecs.forEach(function (f, i) {
          var o = c.createOscillator(), g = c.createGain();
          o.type = tipo || "sine"; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t + i * dur);
          g.gain.exponentialRampToValueAtTime(vol || 0.12, t + i * dur + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + i * dur + dur * 1.6);
          o.connect(g); g.connect(c.destination);
          o.start(t + i * dur); o.stop(t + i * dur + dur * 1.8);
        });
      } catch (e) { /* sin audio */ }
    },
    bien: function () { this.notas([659, 880], 0.09, "triangle"); },
    regular: function () { this.notas([523, 587], 0.1, "triangle", 0.08); },
    mal: function () { this.notas([330, 262], 0.12, "sine", 0.08); },
    fin: function () { this.notas([523, 659, 784, 1047], 0.11, "triangle"); },
    toque: function () { this.notas([740], 0.04, "sine", 0.05); },
  };
  AV.sonido = Sonido;

  /* ---------------------------------------------------------
     Confeti (solo para logros; respeta "reducir movimiento")
     --------------------------------------------------------- */
  function confeti(cantidad) {
    if (reduceMovimiento) return;
    var cv = h("canvas", { class: "confeti", "aria-hidden": "true" });
    document.body.appendChild(cv);
    var dpr = window.devicePixelRatio || 1;
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    var x = cv.getContext("2d"); x.scale(dpr, dpr);
    var colores = ["#c9a15a", "#b0365a", "#1f4e8c", "#c0611b", "#2f7d4f", "#f3d9a4"];
    var ps = [];
    for (var i = 0; i < (cantidad || 140); i++) {
      ps.push({
        x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.5, y: innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 13 - 4,
        r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3,
        c: colores[i % colores.length], forma: i % 3,
      });
    }
    var t0 = performance.now();
    (function paso(t) {
      var dt = t - t0;
      x.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach(function (p) {
        p.vy += 0.38; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c;
        x.globalAlpha = Math.max(0, 1 - dt / 2600);
        if (p.forma === 0) x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        else if (p.forma === 1) { x.beginPath(); x.arc(0, 0, p.r / 2.4, 0, 6.3); x.fill(); }
        else { x.beginPath(); x.moveTo(0, -p.r / 2); x.lineTo(p.r / 2, p.r / 2); x.lineTo(-p.r / 2, p.r / 2); x.fill(); }
        x.restore();
      });
      if (dt < 2600) requestAnimationFrame(paso); else cv.remove();
    })(t0);
  }
  AV.confeti = confeti;

  /* ---------------------------------------------------------
     Aviso breve (toast)
     --------------------------------------------------------- */
  function aviso(texto) {
    var t = h("div", { class: "aviso", role: "status" }, texto);
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("visible"); });
    setTimeout(function () { t.classList.remove("visible"); setTimeout(function () { t.remove(); }, 400); }, 2600);
  }
  AV.aviso = aviso;

  /* ---------------------------------------------------------
     Teclado de tildes (aparece al escribir en un ejercicio)
     --------------------------------------------------------- */
  var Tildes = {
    barra: null, campo: null,
    init: function () {
      var self = this;
      this.barra = h("div", { class: "tildes", role: "toolbar", "aria-label": "Letras del español" });
      "á é í ó ú ü ñ ¿ ¡".split(" ").forEach(function (c) {
        self.barra.appendChild(h("button", {
          type: "button", tabindex: "-1",
          onmousedown: function (e) { e.preventDefault(); },
          onclick: function () { self.insertar(c); },
        }, c));
      });
      document.body.appendChild(this.barra);
      document.addEventListener("focusin", function (e) {
        var t = e.target;
        if ((t.tagName === "INPUT" && t.type === "text") || t.tagName === "TEXTAREA") {
          if (t.closest(".ej, .herramienta")) { self.campo = t; self.barra.classList.add("visible"); }
        }
      });
      document.addEventListener("focusout", function () {
        setTimeout(function () {
          var a = document.activeElement;
          if (!a || !(a.tagName === "INPUT" || a.tagName === "TEXTAREA")) self.barra.classList.remove("visible");
        }, 120);
      });
    },
    insertar: function (c) {
      var t = this.campo;
      if (!t) return;
      var i = t.selectionStart, f = t.selectionEnd;
      t.value = t.value.slice(0, i) + c + t.value.slice(f);
      t.setSelectionRange(i + c.length, i + c.length);
      t.dispatchEvent(new Event("input", { bubbles: true }));
      t.focus();
    },
  };

  /* ---------------------------------------------------------
     Estrellas
     --------------------------------------------------------- */
  function estrellasDe(p) { return p >= 0.9 ? 3 : p >= 0.7 ? 2 : p >= 0.4 ? 1 : 0; }
  function dibujarEstrellas(n, max) {
    var s = h("span", { class: "estrellas", "aria-label": n + " de " + (max || 3) + " estrellas" });
    for (var i = 0; i < (max || 3); i++) s.appendChild(h("i", { class: i < n ? "llena" : "" }));
    return s;
  }
  AV.dibujarEstrellas = dibujarEstrellas;

  /* =========================================================
     BLOQUES DE LECTURA
     ========================================================= */
  var Bloques = {};

  function cabecera(b, extra) {
    if (!b.titulo && !b.num) return null;
    return h("header", { class: "bloque__cabecera" },
      b.num ? h("span", { class: "bloque__num" }, b.num) : null,
      h("div", null,
        b.etiqueta ? h("p", { class: "bloque__etiqueta" }, b.etiqueta) : null,
        h("h3", { class: "bloque__titulo", html: marcado(b.titulo || "") }),
        b.ru ? h("p", { class: "ru", lang: "ru" }, b.ru) : null),
      extra || null);
  }

  Bloques.figura = function (b) {
    return h("figure", { class: "figura" + (b.ancha ? " figura--ancha" : "") + (b.marco ? " figura--marco" : "") },
      imagen(b.src, b.alt),
      b.pie ? h("figcaption", { html: marcado(b.pie) }) : null);
  };

  Bloques.texto = function (b) {
    var lectura = h("div", { class: "lectura" + (b.capitular ? " lectura--capitular" : "") });
    if (b.encabezado) lectura.appendChild(h("h4", { class: "lectura__titulo" }, b.encabezado));
    (b.parrafos || []).forEach(function (p) { lectura.appendChild(h("p", { html: marcado(p) })); });
    var btn = Voz.ok ? botonEscuchar(function () {
      var textos = (b.encabezado ? [b.encabezado] : []).concat(b.parrafos);
      return leerSecuencia(textos.map(function (t) { return { t: t }; }));
    }, "Escuchar el texto") : null;
    var cuerpo = h("div", { class: "con-imagen" + (b.imagenIzq ? " con-imagen--izq" : "") },
      b.imagen ? h("figure", { class: "con-imagen__fig" }, imagen(b.imagen, b.alt)) : null,
      lectura);
    return h("section", { class: "bloque bloque--texto" }, cabecera(b, btn), cuerpo);
  };

  function botonEscuchar(fn, etiqueta) {
    var b = h("button", { type: "button", class: "btn-voz", "aria-label": etiqueta },
      h("span", { class: "btn-voz__icono", "aria-hidden": "true" }), h("span", null, etiqueta));
    var activo = false;
    b.addEventListener("click", function () {
      if (activo) { Voz.parar(); activo = false; b.classList.remove("sonando"); return; }
      activo = true; b.classList.add("sonando");
      Promise.resolve(fn()).then(function () { activo = false; b.classList.remove("sonando"); });
    });
    return b;
  }
  var lecturaId = 0;
  function leerSecuencia(items) {
    var mi = ++lecturaId;
    Voz.parar();
    var p = Promise.resolve();
    items.forEach(function (it) {
      p = p.then(function () {
        if (mi !== lecturaId) return;
        if (it.el) it.el.classList.add("leyendo");
        return Voz.decir(it.t, Object.assign({ cola: true }, it.op)).then(function () { if (it.el) it.el.classList.remove("leyendo"); });
      });
    });
    return p;
  }

  function avatar(nombre, grande) {
    var p = AV.personajes[nombre] || {};
    var c = h("span", { class: "avatar avatar--" + (p.color || "cafe") + (grande ? " avatar--grande" : ""), "aria-hidden": "true" },
      h("span", { class: "avatar__inicial" }, nombre.charAt(0)));
    if (p.img) {
      var im = imagen(p.img, "");
      c.appendChild(im);
    }
    return c;
  }
  AV.avatar = avatar;

  Bloques.dialogo = function (b) {
    var lista = h("ol", { class: "dialogo" });
    var filas = b.lineas.map(function (l) {
      var p = AV.personajes[l.p] || {};
      var li = h("li", { class: "dialogo__linea tono--" + (p.color || "cafe") },
        avatar(l.p),
        h("div", { class: "dialogo__globo" },
          h("span", { class: "dialogo__quien" }, l.p),
          h("p", { html: marcado(l.t) })),
        Voz.ok ? h("button", {
          type: "button", class: "dialogo__oir", "aria-label": "Escuchar la frase de " + l.p,
          onclick: function () { leerSecuencia([{ t: l.t, el: li, op: { tono: (p.voz || {}).tono } }]); },
        }) : null);
      lista.appendChild(li);
      return { li: li, l: l, p: p };
    });

    var controles = null;
    if (Voz.ok) {
      var roles = [];
      b.lineas.forEach(function (l) { if (roles.indexOf(l.p) < 0) roles.push(l.p); });
      var seguir = h("button", { type: "button", class: "btn btn--oro dialogo__seguir", hidden: true }, "Ya lo leí, sigue");
      var esperar = null;
      seguir.addEventListener("click", function () { if (esperar) { var f = esperar; esperar = null; f(); } });
      var actor = function (rol) {
        var mi = ++lecturaId;
        Voz.parar();
        lista.classList.add("modo-actor");
        var p = Promise.resolve();
        filas.forEach(function (f) {
          p = p.then(function () {
            if (mi !== lecturaId) return;
            f.li.classList.add("leyendo");
            if (f.l.p === rol) {
              f.li.classList.add("tu-turno");
              seguir.hidden = false;
              f.li.scrollIntoView({ block: "center", behavior: reduceMovimiento ? "auto" : "smooth" });
              return new Promise(function (res) { esperar = res; }).then(function () {
                seguir.hidden = true; f.li.classList.remove("leyendo", "tu-turno");
              });
            }
            return Voz.decir(f.l.t, { cola: true, tono: (f.p.voz || {}).tono }).then(function () { f.li.classList.remove("leyendo"); });
          });
        });
        return p.then(function () { lista.classList.remove("modo-actor"); seguir.hidden = true; });
      };
      controles = h("div", { class: "dialogo__controles" },
        botonEscuchar(function () {
          return leerSecuencia(filas.map(function (f) { return { t: f.l.t, el: f.li, op: { tono: (f.p.voz || {}).tono } }; }));
        }, "Escuchar el diálogo"),
        roles.length > 1 ? h("div", { class: "actor" },
          h("span", { class: "actor__txt" }, "Modo actor: lee tú el papel de"),
          roles.map(function (r) {
            return h("button", { type: "button", class: "chip-rol tono--" + ((AV.personajes[r] || {}).color || "cafe"), onclick: function () { actor(r); } }, r);
          })) : null,
        seguir);
    }

    var cuerpo = h("div", { class: "con-imagen" + (b.imagen ? "" : " con-imagen--sola") },
      b.imagen ? h("figure", { class: "con-imagen__fig" }, imagen(b.imagen, b.alt)) : null,
      h("div", null,
        b.intro ? h("p", { class: "dialogo__intro", html: marcado(b.intro) }) : null,
        b.encabezado ? h("h4", { class: "lectura__titulo" }, b.encabezado) : null,
        lista));
    return h("section", { class: "bloque bloque--dialogo" }, cabecera(b), controles, cuerpo);
  };

  Bloques.teoria = function (b) {
    return h("section", { class: "bloque bloque--teoria" + (b.imagen ? "" : " sin-img") },
      cabecera(b),
      h("div", { class: "con-imagen" + (b.imagenIzq ? " con-imagen--izq" : "") },
        b.imagen ? h("figure", { class: "con-imagen__fig con-imagen__fig--recorte" }, imagen(b.imagen, b.alt)) : null,
        h("div", { class: "teoria", html: b.html })));
  };

  Bloques.sabias = function (b) {
    return h("aside", { class: "sabias" },
      h("p", { class: "sabias__titulo" }, "¿Sabías que…?"),
      h("p", { html: marcado(b.texto) }),
      b.ru ? h("p", { class: "ru", lang: "ru" }, b.ru) : null);
  };

  Bloques.historieta = function (b) {
    var fig = h("figure", { class: "historieta" },
      h("button", { type: "button", class: "historieta__abrir", "aria-label": "Ampliar la historieta" }, imagen(b.src, b.alt)),
      h("figcaption", null, "Toca la historieta para verla en grande."));
    fig.querySelector("button").addEventListener("click", function () { abrirVisor(b.src, b.alt); });
    return h("section", { class: "bloque" }, cabecera(b), fig);
  };

  function abrirVisor(src, alt) {
    var d = h("dialog", { class: "visor", "aria-label": alt },
      h("button", { type: "button", class: "visor__cerrar", "aria-label": "Cerrar" }, "×"),
      h("div", { class: "visor__lienzo" }, imagen(src, alt)));
    document.body.appendChild(d);
    var cerrar = function () { d.close(); d.remove(); };
    d.querySelector(".visor__cerrar").addEventListener("click", cerrar);
    d.addEventListener("click", function (e) { if (e.target === d) cerrar(); });
    d.addEventListener("cancel", function (e) { e.preventDefault(); cerrar(); });
    d.showModal();
  }
  AV.abrirVisor = abrirVisor;

  /* Escala de frecuencia con deslizador */
  Bloques.escala = function (b) {
    var filas = b.filas;
    var grande = h("p", { class: "escala__palabra", "aria-live": "polite" });
    var ejemplo = h("p", { class: "escala__ejemplo" });
    var ru = h("p", { class: "ru escala__ru", lang: "ru" });
    var pct = h("span", { class: "escala__pct" });
    var rango = h("input", { type: "range", min: "0", max: "100", step: "1", value: "40", class: "escala__rango", "aria-label": "Frecuencia en porcentaje" });
    var lista = h("ol", { class: "escala__lista" });
    var lis = filas.map(function (f) {
      var li = h("li", null, h("button", { type: "button", onclick: function () { rango.value = f.pct; pintar(); } },
        h("span", { class: "escala__n" }, f.pct + " %"), h("b", null, f.es)));
      lista.appendChild(li); return li;
    });
    function pintar() {
      var v = +rango.value, mejor = filas[0];
      filas.forEach(function (f) { if (Math.abs(f.pct - v) < Math.abs(mejor.pct - v)) mejor = f; });
      grande.textContent = mejor.es;
      ejemplo.innerHTML = marcado(mejor.ej);
      ru.textContent = mejor.ru;
      pct.textContent = v + " %";
      rango.style.setProperty("--v", v + "%");
      lis.forEach(function (li, i) { li.classList.toggle("activa", filas[i] === mejor); });
    }
    rango.addEventListener("input", pintar);
    pintar();
    return h("section", { class: "bloque bloque--escala" }, cabecera(b),
      h("div", { class: "escala" },
        h("div", { class: "escala__visor" }, pct, grande, ru, ejemplo,
          Voz.ok ? h("button", { type: "button", class: "btn-voz btn-voz--mini", "aria-label": "Escuchar el ejemplo", onclick: function () { Voz.decir(ejemplo.textContent); } }, h("span", { class: "btn-voz__icono" })) : null),
        h("div", { class: "escala__control" }, h("span", null, "nunca"), rango, h("span", null, "siempre")),
        lista));
  };

  /* Herramienta: escribe un número y escúchalo en español */
  var UNI = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
  var DEC = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  var CEN = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  function hasta999(n) {
    if (n === 100) return "cien";
    var c = Math.floor(n / 100), r = n % 100, s = [];
    if (c) s.push(CEN[c]);
    if (r) s.push(r < 30 ? UNI[r] : DEC[Math.floor(r / 10)] + (r % 10 ? " y " + UNI[r % 10] : ""));
    return s.join(" ");
  }
  function enLetras(n) {
    if (n === 0) return "cero";
    var mill = Math.floor(n / 1e6), miles = Math.floor((n % 1e6) / 1000), resto = n % 1000, s = [];
    if (mill) s.push(mill === 1 ? "un millón" : hasta999(mill).replace(/uno$/, "un") + " millones");
    if (miles) s.push(miles === 1 ? "mil" : hasta999(miles).replace(/uno$/, "un") + " mil");
    if (resto) s.push(hasta999(resto));
    return s.join(" ").replace(/veintiuno mil/, "veintiún mil");
  }
  function numeroATexto(txt) {
    txt = String(txt).trim().replace(/\s/g, "");
    var m = txt.match(/^(\d{1,9})(?:[.,](\d{1,2}))?$/);
    if (!m) return null;
    var ent = parseInt(m[1], 10);
    var s = enLetras(ent);
    if (m[2]) s += " coma " + (m[2].length === 2 && m[2][0] === "0" ? "cero " + enLetras(+m[2][1]) : enLetras(+m[2]));
    return s;
  }
  AV.numeroATexto = numeroATexto;

  Bloques.numerador = function (b) {
    var campo = h("input", { type: "text", inputmode: "decimal", value: b.inicial || "1492", "aria-label": "Número", class: "numerador__campo", maxlength: "12" });
    var salida = h("p", { class: "numerador__salida", "aria-live": "polite" });
    function pintar() {
      var t = numeroATexto(campo.value);
      salida.textContent = t || "Escribe un número entero (hasta 999 999 999) o con decimales, como 3,4.";
      salida.classList.toggle("error", !t);
    }
    campo.addEventListener("input", pintar);
    pintar();
    return h("section", { class: "bloque herramienta" }, cabecera(b),
      h("div", { class: "numerador" },
        campo,
        h("span", { class: "numerador__flecha", "aria-hidden": "true" }, "="),
        salida,
        Voz.ok ? h("button", { type: "button", class: "btn-voz", onclick: function () { var t = numeroATexto(campo.value); if (t) Voz.decir(t, { vel: 0.85 }); } },
          h("span", { class: "btn-voz__icono", "aria-hidden": "true" }), h("span", null, "Escuchar")) : null),
      b.ejemplos ? h("div", { class: "numerador__ejemplos" },
        h("span", null, "Prueba con:"),
        b.ejemplos.map(function (e) { return h("button", { type: "button", class: "chip", onclick: function () { campo.value = e; pintar(); } }, e); })) : null);
  };

  /* =========================================================
     EJERCICIOS
     ========================================================= */
  var Ejercicios = {};

  /* Envoltorio común: cabecera, cuerpo, botones, resultado y guardado */
  function montarEjercicio(ctx, b, impl) {
    var id = ctx.id;
    var guardado = datos.ej[id] || {};
    var resultado = h("p", { class: "ej__resultado", "aria-live": "polite" });
    var est = h("span", { class: "ej__estrellas" });
    var tarjeta = h("section", { class: "bloque ej" + (impl.abierta ? " ej--abierta" : ""), id: id, "data-tipo": b.tipo });

    function pintarMejor() {
      est.innerHTML = "";
      var g = datos.ej[id];
      if (!impl.abierta && g && g.best != null) est.appendChild(dibujarEstrellas(estrellasDe(g.best)));
      tarjeta.classList.toggle("ej--hecho", !!(g && g.hecho));
    }

    var btnComprobar = impl.abierta ? null : h("button", { type: "button", class: "btn btn--tinta" }, "Comprobar");
    var btnSolucion = impl.abierta ? null : h("button", { type: "button", class: "btn btn--claro" }, "Ver la solución");
    var btnOtra = impl.abierta ? null : h("button", { type: "button", class: "btn btn--texto", hidden: true }, "Empezar de nuevo");

    function guardarEstado() {
      var g = datos.ej[id] = datos.ej[id] || {};
      g.r = impl.estado();
      if (impl.abierta && impl.completa && impl.completa() && !g.hecho) {
        g.hecho = true;
        ctx.alProgreso();
        pintarMejor();
      }
      guardar();
    }
    impl.alCambiar = function () { tarjeta.classList.remove("ej--corregido"); resultado.textContent = ""; guardarEstado(); };

    if (btnComprobar) btnComprobar.addEventListener("click", function () {
      var r = impl.comprobar();
      var p = r.total ? r.bien / r.total : 0;
      tarjeta.classList.add("ej--corregido");
      var g = datos.ej[id] = datos.ej[id] || {};
      var antes = g.best;
      if (!g.visto) g.best = Math.max(g.best || 0, p);
      g.hecho = true;
      g.r = impl.estado();
      guardar();
      var frase = r.bien === r.total ? "¡Perfecto! " : p >= 0.7 ? "¡Muy bien! " : p >= 0.4 ? "Vas bien. " : "Sigue intentándolo. ";
      resultado.textContent = frase + r.bien + " de " + r.total + " correctas." + (r.casi ? " Revisa las tildes en " + r.casi + "." : "") + (g.visto ? " (Ya viste la solución: no suma estrellas.)" : "");
      resultado.className = "ej__resultado " + (r.bien === r.total ? "ok" : p >= 0.5 ? "medio" : "mal");
      btnOtra.hidden = false;
      pintarMejor();
      if (r.bien === r.total) { Sonido.bien(); if ((antes || 0) < 1 && !g.visto) confeti(70); }
      else if (p >= 0.5) Sonido.regular(); else Sonido.mal();
      ctx.alProgreso();
    });
    if (btnSolucion) btnSolucion.addEventListener("click", function () {
      impl.mostrar();
      tarjeta.classList.add("ej--corregido", "ej--solucion");
      var g = datos.ej[id] = datos.ej[id] || {};
      if (!g.hecho) g.visto = true;
      g.r = impl.estado();
      guardar();
      resultado.textContent = "Esta es la solución. Léela con calma y vuelve a intentarlo cuando quieras.";
      resultado.className = "ej__resultado info";
      btnOtra.hidden = false;
    });
    if (btnOtra) btnOtra.addEventListener("click", function () {
      impl.reiniciar();
      tarjeta.classList.remove("ej--corregido", "ej--solucion");
      resultado.textContent = ""; btnOtra.hidden = true;
      var g = datos.ej[id] || {}; g.r = null; guardar();
    });

    var cuerpo = h("div", { class: "ej__cuerpo" + (b.imagen ? " con-imagen" : "") },
      b.imagen ? h("figure", { class: "con-imagen__fig" + (b.recorte ? " con-imagen__fig--recorte" : "") }, imagen(b.imagen, b.alt)) : null,
      h("div", { class: "ej__contenido" },
        b.antes ? h("div", { class: "ej__antes", html: b.antes }) : null,
        b.nota ? h("p", { class: "ej__nota", html: marcado(b.nota) }) : null,
        b.ejemplo ? h("p", { class: "ej__ejemplo", html: "<span>Ejemplo</span> " + marcado(b.ejemplo) }) : null,
        impl.cuerpo));

    tarjeta.appendChild(cabecera(b, est));
    tarjeta.appendChild(cuerpo);
    if (!impl.abierta) tarjeta.appendChild(h("footer", { class: "ej__pie" }, btnComprobar, btnSolucion, btnOtra, resultado));
    else if (impl.pie) tarjeta.appendChild(h("footer", { class: "ej__pie" }, impl.pie));

    if (guardado.r != null) { try { impl.restaurar(guardado.r); } catch (e) { /* datos antiguos */ } }
    pintarMejor();
    return tarjeta;
  }

  /* ---------- Elegir entre opciones (V/F, H/L…) ---------- */
  Ejercicios.elegir = function (b) {
    var opciones = b.opciones || [["V", "V", "Verdadero"], ["F", "F", "Falso"]];
    var resp = b.items.map(function () { return null; });
    var impl = {};
    var lista = h("ol", { class: "elegir" + (b.rejilla ? " elegir--rejilla" : "") });
    var filas = b.items.map(function (it, i) {
      var correcta = typeof it.r === "boolean" ? (it.r ? "V" : "F") : it.r;
      var botones = opciones.map(function (o) {
        return h("button", {
          type: "button", class: "opc", "aria-pressed": "false", title: o[2] || "",
          onclick: function () { resp[i] = o[0]; pintar(i); Sonido.toque(); impl.alCambiar(); },
        }, o[1]);
      });
      var nota = it.nota ? h("p", { class: "elegir__nota", html: marcado(it.nota) }) : null;
      var li = h("li", { class: "elegir__fila" }, h("span", { class: "elegir__texto", html: marcado(it.t) }), h("span", { class: "elegir__opciones", role: "group" }, botones), nota);
      lista.appendChild(li);
      return { li: li, botones: botones, correcta: correcta };
    });
    function pintar(i) {
      filas[i].botones.forEach(function (bt, k) { bt.setAttribute("aria-pressed", String(opciones[k][0] === resp[i])); });
      filas[i].li.classList.remove("bien", "mal");
    }
    var leyenda = b.leyenda !== false && opciones.some(function (o) { return o[2]; }) ?
      h("p", { class: "elegir__leyenda" }, opciones.map(function (o) { return h("span", null, h("b", null, o[1]), " " + (o[2] || "")); })) : null;
    impl.cuerpo = h("div", null, leyenda, lista);
    impl.comprobar = function () {
      var bien = 0;
      filas.forEach(function (f, i) { var ok = resp[i] === f.correcta; if (ok) bien++; f.li.classList.toggle("bien", ok); f.li.classList.toggle("mal", !ok); });
      return { bien: bien, total: filas.length };
    };
    impl.mostrar = function () { filas.forEach(function (f, i) { resp[i] = f.correcta; pintar(i); f.li.classList.add("bien"); }); };
    impl.reiniciar = function () { filas.forEach(function (f, i) { resp[i] = null; pintar(i); }); };
    impl.estado = function () { return resp.slice(); };
    impl.restaurar = function (r) { r.forEach(function (v, i) { resp[i] = v; pintar(i); }); };
    return impl;
  };
  Ejercicios.vf = Ejercicios.elegir;

  /* ---------- Test de opción múltiple ---------- */
  Ejercicios.test = function (b) {
    var resp = b.items.map(function () { return null; });
    var impl = {};
    var letras = "abcdef";
    var lista = h("ol", { class: "test" });
    var filas = b.items.map(function (it, i) {
      var orden = it.opciones.map(function (_, k) { return k; });
      var botones = orden.map(function (k) {
        return h("button", {
          type: "button", class: "test__opc", "aria-pressed": "false",
          onclick: function () { resp[i] = k; pintar(i); Sonido.toque(); impl.alCambiar(); },
        }, h("span", { class: "test__letra" }, letras[k] + ")"), h("span", { html: marcado(it.opciones[k]) }));
      });
      var li = h("li", { class: "test__pregunta" + (it.img ? " con-foto" : "") },
        it.img ? h("figure", { class: "test__foto" }, imagen(it.img, it.alt || "")) : null,
        h("div", null,
          h("p", { class: "test__q", html: marcado(it.q) }),
          h("div", { class: "test__opciones", role: "group" }, botones),
          it.nota ? h("p", { class: "test__nota", html: marcado(it.nota) }) : null));
      lista.appendChild(li);
      return { li: li, botones: botones, r: it.r };
    });
    function pintar(i) {
      filas[i].botones.forEach(function (bt, k) { bt.setAttribute("aria-pressed", String(k === resp[i])); bt.classList.remove("es-correcta"); });
      filas[i].li.classList.remove("bien", "mal");
    }
    impl.cuerpo = lista;
    impl.comprobar = function () {
      var bien = 0;
      filas.forEach(function (f, i) {
        var ok = resp[i] === f.r; if (ok) bien++;
        f.li.classList.toggle("bien", ok); f.li.classList.toggle("mal", !ok);
        f.botones.forEach(function (bt, k) { bt.classList.toggle("es-correcta", k === f.r && !ok && resp[i] != null); });
      });
      return { bien: bien, total: filas.length };
    };
    impl.mostrar = function () { filas.forEach(function (f, i) { resp[i] = f.r; pintar(i); f.li.classList.add("bien"); }); };
    impl.reiniciar = function () { filas.forEach(function (f, i) { resp[i] = null; pintar(i); }); };
    impl.estado = function () { return resp.slice(); };
    impl.restaurar = function (r) { r.forEach(function (v, i) { resp[i] = v; pintar(i); }); };
    return impl;
  };

  /* ---------- Huecos: con banco de fichas o escribiendo ---------- */
  Ejercicios.huecos = function (b) {
    var impl = {};
    var huecos = [];
    var conBanco = !!b.banco;
    var fichas = conBanco ? b.banco.map(function (x, i) { return { i: i, es: Array.isArray(x) ? x[0] : x, ru: Array.isArray(x) ? x[1] : null }; }) : [];
    var sel = null;

    function crearHueco(alts) {
      var libre = alts.length === 1 && alts[0] === "?";
      var hu = { alts: alts, libre: libre, ficha: null };
      if (conBanco) {
        hu.el = h("button", { type: "button", class: "hueco hueco--ficha", "aria-label": "Hueco vacío" });
        hu.el.addEventListener("click", function () {
          if (hu.ficha != null) { quitar(hu); seleccionar(hu); impl.alCambiar(); }
          else seleccionar(sel === hu ? null : hu);
        });
        hu.el.addEventListener("dragover", function (e) { e.preventDefault(); hu.el.classList.add("sobre"); });
        hu.el.addEventListener("dragleave", function () { hu.el.classList.remove("sobre"); });
        hu.el.addEventListener("drop", function (e) {
          e.preventDefault(); hu.el.classList.remove("sobre");
          var fi = +e.dataTransfer.getData("text/plain");
          if (!isNaN(fi)) { colocar(hu, fi); impl.alCambiar(); }
        });
      } else {
        var largo = Math.max.apply(null, alts.map(function (a) { return a.length; }));
        hu.el = h("input", {
          type: "text", class: "hueco hueco--texto", autocomplete: "off", autocapitalize: "off", spellcheck: "false",
          "aria-label": "Respuesta", style: "--ch:" + Math.max(4, Math.min(largo + 2, 32)),
        });
        hu.el.addEventListener("input", function () { hu.el.classList.remove("bien", "mal", "casi"); impl.alCambiar(); });
        hu.el.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            var k = huecos.indexOf(hu);
            if (huecos[k + 1]) huecos[k + 1].el.focus();
          }
        });
      }
      huecos.push(hu);
      return hu.el;
    }

    function parrafoConHuecos(txt) {
      var p = h("span", { class: "huecos__linea" });
      txt.split(/(\{\{[^}]*\}\})/).forEach(function (parte) {
        var m = parte.match(/^\{\{([^}]*)\}\}$/);
        if (m) p.appendChild(crearHueco(m[1].split("|")));
        else if (parte) p.appendChild(h("span", { html: marcado(parte) }));
      });
      return p;
    }

    var texto = h(b.lista ? "ol" : "div", { class: "huecos" + (b.lista ? " huecos--lista" : " lectura") });
    if (b.encabezado && !b.lista) texto.appendChild(h("h4", { class: "lectura__titulo" }, b.encabezado));
    b.parrafos.forEach(function (p) {
      texto.appendChild(h(b.lista ? "li" : "p", null, parrafoConHuecos(p)));
    });

    var banco = null, botonesFicha = [];
    if (conBanco) {
      var orden = b.fijo ? fichas : mezclarDistinto(fichas);
      botonesFicha = [];
      banco = h("div", { class: "banco", role: "group", "aria-label": "Recuadro de palabras" },
        h("p", { class: "banco__titulo" }, b.textoBanco || (b.reutilizable ? "Palabras (puedes usarlas más de una vez)" : "Palabras del recuadro")),
        h("div", { class: "banco__fichas" }, orden.map(function (f) {
          var bt = h("button", { type: "button", class: "ficha", draggable: "true", title: f.ru || "" }, f.es);
          bt.addEventListener("click", function () {
            if (bt.disabled) return;
            var destino = sel || huecos.find(function (x) { return x.ficha == null; });
            if (destino) { colocar(destino, f.i); impl.alCambiar(); Sonido.toque(); }
          });
          bt.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", String(f.i)); });
          botonesFicha[f.i] = bt;
          return bt;
        })));
    }

    function seleccionar(hu) {
      sel = hu;
      huecos.forEach(function (x) { x.el.classList.toggle("activo", x === hu); });
    }
    function colocar(hu, fi) {
      if (!b.reutilizable && huecos.some(function (x) { return x.ficha === fi && x !== hu; })) return;
      if (hu.ficha != null) quitar(hu);
      hu.ficha = fi;
      hu.el.textContent = fichas[fi].es;
      hu.el.classList.add("lleno");
      hu.el.classList.remove("bien", "mal");
      hu.el.setAttribute("aria-label", "Hueco: " + fichas[fi].es + ". Toca para quitar.");
      if (!b.reutilizable) botonesFicha[fi].disabled = true;
      var sig = huecos.slice(huecos.indexOf(hu) + 1).concat(huecos).find(function (x) { return x.ficha == null; });
      seleccionar(sig || null);
    }
    function quitar(hu) {
      if (hu.ficha == null) return;
      if (!b.reutilizable) botonesFicha[hu.ficha].disabled = false;
      hu.ficha = null; hu.el.textContent = ""; hu.el.classList.remove("lleno", "bien", "mal");
      hu.el.setAttribute("aria-label", "Hueco vacío");
    }
    function valor(hu) { return conBanco ? (hu.ficha != null ? fichas[hu.ficha].es : "") : hu.el.value; }

    var propuesta = b.propuesta ? h("p", { class: "huecos__propuesta", hidden: true, html: "<b>Una propuesta:</b> " + marcado(b.propuesta) }) : null;

    impl.cuerpo = h("div", { class: "huecos-ej" + (conBanco ? " con-banco" : "") }, banco, texto, propuesta,
      !conBanco ? h("p", { class: "consejo" }, "Escribe en cada hueco. Pulsa Intro para pasar al siguiente.") : null);

    impl.comprobar = function () {
      var bien = 0, casi = 0;
      huecos.forEach(function (hu) {
        var v = norm(valor(hu));
        var ok = false, porTilde = false;
        if (hu.libre) ok = !!v;
        else hu.alts.forEach(function (a) {
          if (norm(a) === v) ok = true;
          else if (v && sinTildes(norm(a)) === sinTildes(v)) porTilde = true;
        });
        if (ok) bien++; else if (porTilde) casi++;
        hu.el.classList.toggle("bien", ok);
        hu.el.classList.toggle("mal", !ok && !porTilde);
        hu.el.classList.toggle("casi", !ok && porTilde);
      });
      if (propuesta) propuesta.hidden = false;
      return { bien: bien, total: huecos.length, casi: casi ? casi + (casi === 1 ? " palabra" : " palabras") : 0 };
    };
    impl.mostrar = function () {
      if (conBanco) {
        huecos.forEach(quitar);
        var usadas = {};
        huecos.forEach(function (hu, k) {
          if (hu.libre) return;
          var f = fichas.find(function (f) {
            return (b.reutilizable || !usadas[f.i]) && hu.alts.some(function (a) { return norm(a) === norm(f.es); });
          });
          if (f) { usadas[f.i] = true; colocar(hu, f.i); }
        });
        if (b.solucionLibre) {
          huecos.filter(function (hu) { return hu.libre; }).forEach(function (hu, k) {
            var f = fichas.find(function (f) { return !usadas[f.i] && norm(f.es) === norm(b.solucionLibre[k] || ""); });
            if (f) { usadas[f.i] = true; colocar(hu, f.i); }
          });
        }
      } else {
        huecos.forEach(function (hu) { hu.el.value = hu.alts[0]; });
      }
      huecos.forEach(function (hu) { hu.el.classList.remove("mal", "casi"); if (!hu.libre || hu.ficha != null) hu.el.classList.add("bien"); });
      seleccionar(null);
      if (propuesta) propuesta.hidden = false;
    };
    impl.reiniciar = function () {
      huecos.forEach(function (hu) { if (conBanco) quitar(hu); else { hu.el.value = ""; } hu.el.classList.remove("bien", "mal", "casi"); });
      seleccionar(null);
      if (propuesta) propuesta.hidden = true;
    };
    impl.estado = function () { return huecos.map(function (hu) { return conBanco ? hu.ficha : hu.el.value; }); };
    impl.restaurar = function (r) {
      r.forEach(function (v, k) {
        var hu = huecos[k]; if (!hu || v == null) return;
        if (conBanco) colocar(hu, v); else hu.el.value = v;
      });
      seleccionar(null);
    };
    return impl;
  };

  /* ---------- Unir (pregunta ↔ respuesta) ---------- */
  Ejercicios.unir = function (b) {
    var impl = {};
    var letras = Object.keys(b.opciones);
    var resp = b.items.map(function () { return null; });
    var activa = null;
    var izq = h("ol", { class: "unir__izq" });
    var der = h("ul", { class: "unir__der" });
    var filas = b.items.map(function (it, i) {
      var marca = h("span", { class: "unir__marca", "aria-hidden": "true" });
      var bt = h("button", { type: "button", class: "unir__item", "aria-pressed": "false" },
        h("span", { class: "unir__n" }, String(i + 1)), h("span", { html: marcado(it.q) }), marca);
      bt.addEventListener("click", function () {
        if (resp[i] != null && activa !== i) { resp[i] = null; pintar(); impl.alCambiar(); }
        activa = activa === i ? null : i; pintar();
      });
      izq.appendChild(h("li", null, bt));
      return { bt: bt, marca: marca, r: it.r };
    });
    var opcs = {};
    letras.forEach(function (l) {
      var tags = h("span", { class: "unir__tags" });
      var bt = h("button", { type: "button", class: "unir__opc" },
        h("span", { class: "unir__letra" }, l), h("span", { html: marcado(b.opciones[l]) }), tags);
      bt.addEventListener("click", function () {
        if (activa == null) {
          var libre = resp.indexOf(null);
          if (libre < 0) return;
          activa = libre;
        }
        var ya = resp.indexOf(l);
        if (ya >= 0 && !b.repetir) resp[ya] = null;
        resp[activa] = l;
        Sonido.toque();
        var sig = resp.indexOf(null, activa + 1);
        if (sig < 0) sig = resp.indexOf(null);
        activa = sig >= 0 ? sig : null;
        pintar(); impl.alCambiar();
      });
      der.appendChild(h("li", null, bt));
      opcs[l] = { bt: bt, tags: tags };
    });
    function pintar() {
      filas.forEach(function (f, i) {
        f.bt.setAttribute("aria-pressed", String(activa === i));
        f.marca.textContent = resp[i] || "";
        f.bt.classList.toggle("unido", resp[i] != null);
        f.bt.classList.remove("bien", "mal");
      });
      letras.forEach(function (l) {
        var ns = []; resp.forEach(function (v, i) { if (v === l) ns.push(i + 1); });
        opcs[l].tags.textContent = ns.join(", ");
        opcs[l].bt.classList.toggle("unida", ns.length > 0);
      });
    }
    impl.cuerpo = h("div", null,
      h("p", { class: "consejo" }, "Toca una frase de la izquierda y después su pareja de la derecha."),
      h("div", { class: "unir" }, izq, der));
    impl.comprobar = function () {
      var bien = 0;
      filas.forEach(function (f, i) { var ok = resp[i] === f.r; if (ok) bien++; f.bt.classList.toggle("bien", ok); f.bt.classList.toggle("mal", !ok); });
      return { bien: bien, total: filas.length };
    };
    impl.mostrar = function () { filas.forEach(function (f, i) { resp[i] = f.r; }); activa = null; pintar(); filas.forEach(function (f) { f.bt.classList.add("bien"); }); };
    impl.reiniciar = function () { resp = resp.map(function () { return null; }); activa = null; pintar(); };
    impl.estado = function () { return resp.slice(); };
    impl.restaurar = function (r) { resp = r.slice(); pintar(); };
    pintar();
    return impl;
  };

  /* ---------- Ordenar palabras ---------- */
  Ejercicios.ordenar = function (b) {
    var impl = {};
    var lista = h("ol", { class: "ordenar" });
    var filas = b.items.map(function (it) {
      var frase = [];
      var orden = mezclarDistinto(it.palabras.map(function (_, k) { return k; }));
      var linea = h("div", { class: "ordenar__frase", "aria-live": "polite" });
      var pool = h("div", { class: "ordenar__pool" });
      var fila = { li: null, frase: frase, it: it };
      var bts = it.palabras.map(function (p, k) {
        var bt = h("button", { type: "button", class: "ficha" }, p);
        bt.addEventListener("click", function () { fila.frase.push(k); pintar(fila); Sonido.toque(); impl.alCambiar(); });
        return bt;
      });
      orden.forEach(function (k) { pool.appendChild(bts[k]); });
      fila.li = h("li", { class: "ordenar__item" }, linea, pool);
      fila.linea = linea; fila.bts = bts;
      lista.appendChild(fila.li);
      return fila;
    });
    function pintar(f) {
      f.linea.innerHTML = "";
      f.frase.forEach(function (k, pos) {
        f.linea.appendChild(h("button", {
          type: "button", class: "ficha ficha--puesta",
          onclick: function () { f.frase.splice(pos, 1); pintar(f); impl.alCambiar(); },
        }, f.it.palabras[k]));
      });
      if (!f.frase.length) f.linea.appendChild(h("span", { class: "ordenar__vacio" }, "Toca las palabras en orden…"));
      f.bts.forEach(function (bt, k) { bt.disabled = f.frase.indexOf(k) >= 0; });
      f.li.classList.remove("bien", "mal");
    }
    filas.forEach(pintar);
    impl.cuerpo = lista;
    impl.comprobar = function () {
      var bien = 0;
      filas.forEach(function (f) {
        var dicho = norm(f.frase.map(function (k) { return f.it.palabras[k]; }).join(" "));
        var ok = f.frase.length === f.it.palabras.length && f.it.variantes.some(function (v) { return norm(v) === dicho; });
        if (ok) bien++;
        f.li.classList.toggle("bien", ok); f.li.classList.toggle("mal", !ok);
      });
      return { bien: bien, total: filas.length };
    };
    impl.mostrar = function () {
      filas.forEach(function (f) {
        var v = f.it.variantes[0].split(" ");
        var usado = {};
        var res = [];
        var i = 0;
        while (i < v.length) {
          var hecho = false;
          for (var k = 0; k < f.it.palabras.length && !hecho; k++) {
            if (usado[k]) continue;
            var pw = f.it.palabras[k].split(" ");
            if (norm(v.slice(i, i + pw.length).join(" ")) === norm(f.it.palabras[k])) { res.push(k); usado[k] = true; i += pw.length; hecho = true; }
          }
          if (!hecho) i++;
        }
        f.frase.length = 0; Array.prototype.push.apply(f.frase, res); pintar(f); f.li.classList.add("bien");
      });
    };
    impl.reiniciar = function () { filas.forEach(function (f) { f.frase.length = 0; pintar(f); }); };
    impl.estado = function () { return filas.map(function (f) { return f.frase.slice(); }); };
    impl.restaurar = function (r) { r.forEach(function (fr, i) { if (!filas[i]) return; filas[i].frase.length = 0; Array.prototype.push.apply(filas[i].frase, fr); pintar(filas[i]); }); };
    return impl;
  };

  /* ---------- Respuesta abierta (sin corrección automática) ---------- */
  Ejercicios.abierta = function (b) {
    var impl = { abierta: true };
    var campos = [];
    var lista = h("ol", { class: "abierta" + (b.preguntas.length === 1 ? " abierta--una" : "") });
    b.preguntas.forEach(function (q) {
      var ta = h("textarea", { rows: String(q.lineas || 2), class: "abierta__campo", "aria-label": plano(q.q), placeholder: "Escribe aquí…" });
      var cont = h("span", { class: "abierta__contador" });
      var modelo = q.modelo ? h("p", { class: "abierta__modelo", hidden: true, html: "<b>" + (b.textoModelo || "Respuesta posible") + ":</b> " + marcado(q.modelo) }) : null;
      ta.addEventListener("input", function () { contar(); impl.alCambiar(); });
      function contar() { var n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; cont.textContent = n ? n + (n === 1 ? " palabra" : " palabras") : ""; }
      campos.push({ ta: ta, modelo: modelo, contar: contar });
      lista.appendChild(h("li", null, h("p", { class: "abierta__q", html: marcado(q.q) }), ta, cont, modelo));
    });
    var verModelos = b.preguntas.some(function (q) { return q.modelo; }) ? h("button", { type: "button", class: "btn btn--claro" }, b.textoBoton || "Ver respuestas posibles") : null;
    if (verModelos) verModelos.addEventListener("click", function () {
      var ocultos = campos.some(function (c) { return c.modelo && c.modelo.hidden; });
      campos.forEach(function (c) { if (c.modelo) c.modelo.hidden = !ocultos; });
      verModelos.textContent = ocultos ? "Ocultar respuestas posibles" : (b.textoBoton || "Ver respuestas posibles");
    });
    impl.pie = h("div", { class: "ej__pie-abierta" }, verModelos,
      h("span", { class: "consejo" }, "Tus respuestas se guardan en este navegador."));
    impl.cuerpo = lista;
    impl.completa = function () { return campos.every(function (c) { return c.ta.value.trim().length > 1; }); };
    impl.estado = function () { return campos.map(function (c) { return c.ta.value; }); };
    impl.restaurar = function (r) { r.forEach(function (v, i) { if (campos[i]) { campos[i].ta.value = v || ""; campos[i].contar(); } }); };
    return impl;
  };

  /* ---------- Tabla de formas con modo práctica ---------- */
  Ejercicios.formas = function (b) {
    var impl = {};
    var tabla = h("table", { class: "tabla-formas tabla-formas--practica" });
    if (b.encabezados) tabla.appendChild(h("thead", null, h("tr", null, b.encabezados.map(function (t) { return h("th", null, t); }))));
    var tb = h("tbody");
    var campos = [];
    b.filas.forEach(function (f) {
      var tr = h("tr", null, h("td", { class: "persona" }, f[0]));
      f.slice(1).forEach(function (forma) {
        var alts = forma.split("|");
        var inp = h("input", { type: "text", class: "hueco hueco--texto", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": f[0], style: "--ch:" + (alts[0].length + 3) });
        inp.addEventListener("input", function () { inp.classList.remove("bien", "mal", "casi"); impl.alCambiar(); });
        campos.push({ inp: inp, alts: alts });
        tr.appendChild(h("td", null, inp));
      });
      tb.appendChild(tr);
    });
    tabla.appendChild(tb);
    impl.cuerpo = h("div", { class: "tabla-envoltura" }, tabla, b.pie ? h("p", { class: "ej__nota", html: marcado(b.pie) }) : null);
    impl.comprobar = function () {
      var bien = 0, casi = 0;
      campos.forEach(function (c) {
        var v = norm(c.inp.value);
        var ok = c.alts.some(function (a) { return norm(a) === v; });
        var t = !ok && v && c.alts.some(function (a) { return sinTildes(norm(a)) === sinTildes(v); });
        if (ok) bien++; if (t) casi++;
        c.inp.classList.toggle("bien", ok); c.inp.classList.toggle("mal", !ok && !t); c.inp.classList.toggle("casi", !!t);
      });
      return { bien: bien, total: campos.length, casi: casi ? casi + (casi === 1 ? " forma" : " formas") : 0 };
    };
    impl.mostrar = function () { campos.forEach(function (c) { c.inp.value = c.alts[0]; c.inp.classList.remove("mal", "casi"); c.inp.classList.add("bien"); }); };
    impl.reiniciar = function () { campos.forEach(function (c) { c.inp.value = ""; c.inp.classList.remove("bien", "mal", "casi"); }); };
    impl.estado = function () { return campos.map(function (c) { return c.inp.value; }); };
    impl.restaurar = function (r) { r.forEach(function (v, i) { if (campos[i]) campos[i].inp.value = v || ""; }); };
    return impl;
  };

  /* =========================================================
     UNIDAD
     ========================================================= */
  AV.montarUnidad = function (U) {
    Glosa.init(); Voz.init(); Tildes.init();
    var n = U.numero;
    var raiz = document.getElementById("unidad");
    var ejercicios = []; // {id, abierta}
    var porSeccion = {};

    /* Portada de la unidad */
    var info = (AV.unidades || []).find(function (u) { return u.n === n; }) || {};
    var indice = h("ol", { class: "portada-u__indice" });
    var portada = h("header", { class: "portada-u" },
      h("div", { class: "portada-u__arte" }, imagen(U.portada, U.altPortada || "")),
      h("div", { class: "portada-u__texto" },
        h("p", { class: "portada-u__num" }, "Unidad " + n),
        h("h1", { class: "portada-u__titulo" }, info.titulo || U.titulo),
        h("p", { class: "ru portada-u__ru", lang: "ru" }, info.ru || ""),
        U.lema ? h("p", { class: "lema lema--claro" }, U.lema) : null,
        indice,
        h("div", { class: "portada-u__progreso" },
          h("div", { class: "barra-progreso", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": "Progreso de la unidad" }, h("i")),
          h("p", { class: "portada-u__cifras" }))));
    raiz.appendChild(portada);

    /* Pestañas de apartados */
    var pestanas = h("nav", { class: "apartados", "aria-label": "Apartados de la unidad" });
    var nav = document.getElementById("apartados-barra");
    (nav || raiz).appendChild(pestanas);

    var hoja = h("div", { class: "hoja" });
    raiz.appendChild(hoja);

    var secciones = U.secciones.map(function (s, si) {
      porSeccion[s.id] = [];
      var sec = h("section", { class: "apartado", id: "apartado-" + s.id, "aria-labelledby": "t-" + s.id, hidden: true });
      sec.appendChild(h("header", { class: "apartado__cabecera" },
        h("span", { class: "apartado__letra", "aria-hidden": "true" }, s.letra),
        h("div", null,
          h("h2", { class: "apartado__titulo", id: "t-" + s.id }, h("span", { class: "sr" }, s.letra + ". "), s.titulo),
          s.ru ? h("p", { class: "ru", lang: "ru" }, s.ru) : null,
          s.lema ? h("p", { class: "lema" }, s.lema) : null)));
      s.bloques.forEach(function (b, bi) {
        var el;
        if (Ejercicios[b.tipo]) {
          var id = "u" + n + "-" + s.id + "-" + (b.id || b.num || "x" + bi);
          var impl = Ejercicios[b.tipo](b);
          el = montarEjercicio({ id: id, alProgreso: actualizarProgreso }, b, impl);
          ejercicios.push({ id: id, abierta: !!impl.abierta, sec: s.id });
          porSeccion[s.id].push(id);
        } else if (Bloques[b.tipo]) el = Bloques[b.tipo](b);
        if (el) sec.appendChild(el);
      });
      /* navegación al final del apartado */
      var sig = U.secciones[si + 1];
      var ant = U.secciones[si - 1];
      sec.appendChild(h("nav", { class: "apartado__pie", "aria-label": "Cambiar de apartado" },
        ant ? h("a", { class: "btn btn--claro", href: "#" + ant.id }, "Volver a " + ant.letra + ". " + ant.titulo) : h("span"),
        sig ? h("a", { class: "btn btn--tinta", href: "#" + sig.id }, "Seguir con " + sig.letra + ". " + sig.titulo)
          : (U.siguiente ? h("a", { class: "btn btn--tinta", href: U.siguiente.href }, U.siguiente.texto) : h("a", { class: "btn btn--tinta", href: "index.html#unidades" }, "Volver a las unidades"))));
      hoja.appendChild(sec);

      var tab = h("a", { class: "apartado-tab", href: "#" + s.id },
        h("b", null, s.letra), h("span", null, s.corto || s.titulo), h("i", { class: "apartado-tab__ok", "aria-label": "completado" }));
      pestanas.appendChild(tab);
      indice.appendChild(h("li", null, h("a", { href: "#" + s.id }, h("b", null, s.letra), " ", s.titulo)));
      return { s: s, sec: sec, tab: tab };
    });

    /* Final de la unidad */
    var final = h("section", { class: "final-u", hidden: true, "aria-live": "polite" });
    hoja.appendChild(final);

    function mostrar(id) {
      var hallada = secciones.find(function (x) { return x.s.id === id; }) || secciones[0];
      secciones.forEach(function (x) {
        var on = x === hallada;
        x.sec.hidden = !on;
        if (on) x.tab.setAttribute("aria-current", "page"); else x.tab.removeAttribute("aria-current");
      });
      datos.ultima = { u: n, s: hallada.s.id }; guardar();
      Voz.parar();
      hallada.tab.scrollIntoView({ inline: "center", block: "nearest" });
      return hallada;
    }
    function irA(id, desplazar) {
      var x = mostrar(id);
      if (desplazar) {
        var y = hoja.getBoundingClientRect().top + scrollY - 120;
        window.scrollTo({ top: y, behavior: reduceMovimiento ? "auto" : "smooth" });
      }
      return x;
    }
    window.addEventListener("hashchange", function () { irA(location.hash.slice(1), true); });
    irA(location.hash.slice(1) || (datos.ultima && datos.ultima.u === n ? datos.ultima.s : U.secciones[0].id), !!location.hash);

    var completadaAntes = (datos.unidades[n] || {}).completa;
    function actualizarProgreso() {
      var hechos = 0, est = 0, maxEst = 0;
      ejercicios.forEach(function (e) {
        var g = datos.ej[e.id];
        if (g && g.hecho) hechos++;
        if (!e.abierta) { maxEst += 3; if (g && g.best != null) est += estrellasDe(g.best); }
      });
      var pct = ejercicios.length ? Math.round((hechos / ejercicios.length) * 100) : 0;
      datos.unidades[n] = { hechos: hechos, total: ejercicios.length, estrellas: est, max: maxEst, completa: hechos === ejercicios.length };
      guardar();
      portada.querySelector(".barra-progreso i").style.width = pct + "%";
      portada.querySelector(".barra-progreso").setAttribute("aria-valuenow", String(pct));
      portada.querySelector(".portada-u__cifras").innerHTML = "";
      anadir(portada.querySelector(".portada-u__cifras"), [
        h("span", null, hechos + " de " + ejercicios.length + " ejercicios"), " ", dibujarEstrellas(1, 1), " ", est + " de " + maxEst + " estrellas"]);
      var mini = document.getElementById("progreso-mini");
      if (mini) { mini.querySelector("i").style.width = pct + "%"; mini.querySelector("span").textContent = pct + " %"; }
      secciones.forEach(function (x) {
        var ids = porSeccion[x.s.id];
        var ok = ids.length && ids.every(function (id) { return datos.ej[id] && datos.ej[id].hecho; });
        x.tab.classList.toggle("hecho", !!ok);
      });
      final.innerHTML = "";
      if (hechos === ejercicios.length) {
        final.hidden = false;
        anadir(final, [
          h("p", { class: "lema" }, "¡Unidad completada!"),
          h("h2", null, "Has terminado la Unidad " + n),
          h("p", null, "Conseguiste " + est + " de " + maxEst + " estrellas. Puedes repetir cualquier ejercicio para mejorar tu resultado."),
          dibujarEstrellas(est >= maxEst * 0.9 ? 3 : est >= maxEst * 0.7 ? 2 : est >= maxEst * 0.4 ? 1 : 0),
          U.siguiente ? h("a", { class: "btn btn--oro", href: U.siguiente.href }, U.siguiente.texto) : h("a", { class: "btn btn--oro", href: "index.html#unidades" }, "Volver a las unidades"),
        ]);
        if (!completadaAntes) { completadaAntes = true; Sonido.fin(); confeti(220); }
      } else final.hidden = true;
    }
    actualizarProgreso();
    montarAjustes();
  };

  /* Panel de ajustes en la barra superior */
  function montarAjustes() {
    var boton = document.getElementById("ajustes-boton");
    var panel = document.getElementById("ajustes-panel");
    if (!boton || !panel) return;
    function interruptor(clave, texto, ru) {
      var inp = h("input", { type: "checkbox", role: "switch" });
      inp.checked = !!datos.ajustes[clave];
      inp.addEventListener("change", function () { datos.ajustes[clave] = inp.checked; guardar(); aplicarAjustes(); });
      return h("label", { class: "interruptor" }, inp, h("span", { class: "interruptor__pista", "aria-hidden": "true" }),
        h("span", null, texto, ru ? h("small", { lang: "ru" }, ru) : null));
    }
    panel.innerHTML = "";
    anadir(panel, [
      h("p", { class: "ajustes__titulo" }, "Ajustes"),
      interruptor("ru", "Ayudas en ruso", "Подсказки на русском"),
      interruptor("glosario", "Traducción de palabras", "Перевод слов"),
      interruptor("sonido", "Sonidos", "Звуки"),
      h("button", {
        type: "button", class: "btn btn--texto ajustes__borrar",
        onclick: function () {
          if (confirm("¿Borrar todo tu progreso y tus respuestas? No se puede deshacer.")) { AV.borrarProgreso(); location.reload(); }
        },
      }, "Borrar mi progreso"),
    ]);
    boton.addEventListener("click", function () {
      var abrir = panel.hidden;
      panel.hidden = !abrir;
      boton.setAttribute("aria-expanded", String(abrir));
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !boton.contains(e.target)) { panel.hidden = true; boton.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; boton.setAttribute("aria-expanded", "false"); boton.focus(); } });
  }
  AV.montarAjustes = montarAjustes;

  /* =========================================================
     PORTADA DEL SITIO
     ========================================================= */
  var PALOS = {
    oros: '<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="11" fill="currentColor" opacity=".55"/><g stroke="currentColor" stroke-width="3">' +
      [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<line x1="50" y1="20" x2="50" y2="12" transform="rotate(' + a + ' 50 50)"/>'; }).join("") + "</g>",
    copas: '<path d="M30 22h40c0 18-8 30-20 32-12-2-20-14-20-32z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M50 54v16M36 80h28M42 70h16" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>',
    espadas: '<path d="M50 10l7 12v44h-14V22z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M32 68h36M50 68v18" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="90" r="4" fill="currentColor"/>',
    bastos: '<path d="M40 88c-4-20-2-46 6-68 4-10 16-10 18 0 4 22 0 48-6 68z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M46 36l-8-4M58 52l9-4M48 66l-8-3" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
  };
  AV.palo = function (p) { return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + (PALOS[p] || PALOS.oros) + "</svg>"; };

  AV.montarPortada = function () {
    Glosa.init(); Voz.init();
    montarAjustes();

    /* Baraja de unidades */
    var baraja = document.getElementById("baraja");
    if (baraja) {
      AV.unidades.forEach(function (u) {
        var pr = datos.unidades[u.n];
        var carta;
        if (u.disponible) {
          var pct = pr && pr.total ? Math.round((pr.hechos / pr.total) * 100) : 0;
          carta = h("a", { class: "carta carta--abierta", href: u.pagina },
            h("span", { class: "carta__cara" },
              imagen(u.portada, ""),
              h("span", { class: "carta__palo carta__palo--sup", html: AV.palo(u.palo) }),
              h("span", { class: "carta__num" }, String(u.n))),
            h("span", { class: "carta__pie" },
              h("span", { class: "carta__unidad" }, "Unidad " + u.n),
              h("strong", { class: "carta__titulo" }, u.titulo),
              h("span", { class: "ru carta__ru", lang: "ru" }, u.ru),
              h("span", { class: "carta__estado" },
                h("span", { class: "barra-progreso barra-progreso--mini" }, h("i", { style: "width:" + pct + "%" })),
                h("span", null, pct ? (pct === 100 ? "Completada" : pct + " %") : "Empezar"),
                pr && pr.max ? h("span", { class: "carta__estrellas" }, dibujarEstrellas(1, 1), " " + pr.estrellas) : null)));
        } else {
          carta = h("div", { class: "carta carta--cerrada", tabindex: "0", "aria-label": "Unidad " + u.n + ": " + u.titulo + ". Todavía no está disponible." },
            h("span", { class: "carta__dorso" },
              h("span", { class: "carta__marco" }),
              h("span", { class: "carta__palo", html: AV.palo(u.palo) }),
              h("span", { class: "carta__candado", "aria-hidden": "true" }),
              h("span", { class: "carta__num carta__num--dorso" }, String(u.n))),
            h("span", { class: "carta__pie" },
              h("span", { class: "carta__unidad" }, "Unidad " + u.n),
              h("strong", { class: "carta__titulo" }, u.titulo),
              h("span", { class: "carta__pronto" }, "Bloqueada · próximamente")));
          carta.addEventListener("click", function () { carta.classList.remove("temblor"); void carta.offsetWidth; carta.classList.add("temblor"); aviso("La Unidad " + u.n + " todavía no está disponible. ¡Muy pronto se revelará!"); });
          carta.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); carta.click(); } });
        }
        baraja.appendChild(h("li", null, carta));
      });
    }

    /* Botón de continuar */
    var cont = document.getElementById("continuar");
    if (cont && datos.ultima && datos.ultima.u) {
      var u = AV.unidades.find(function (x) { return x.n === datos.ultima.u; });
      if (u && u.disponible) { cont.href = u.pagina + "#" + datos.ultima.s; cont.textContent = "Seguir donde lo dejé (Unidad " + u.n + ")"; cont.hidden = false; }
    }

    /* Galería de personajes */
    var gal = document.getElementById("personajes");
    if (gal) {
      AV.ordenPersonajes.forEach(function (nombre) {
        var p = AV.personajes[nombre];
        var bt = h("button", { type: "button", class: "persona tono--" + p.color, "aria-haspopup": "dialog" },
          h("span", { class: "persona__foto" }, imagen(p.img, "")),
          h("span", { class: "persona__nombre" }, nombre),
          h("span", { class: "persona__rol" }, p.rol));
        bt.addEventListener("click", function () { fichaPersonaje(nombre); });
        gal.appendChild(h("li", null, bt));
      });
    }
    var qq = document.getElementById("quien-es-quien");
    if (qq) AV.quienEsQuien.forEach(function (t) { qq.appendChild(h("li", null, t)); });
    var fam = document.getElementById("familias");
    if (fam) AV.familias.forEach(function (f) { fam.appendChild(h("p", null, h("b", null, f[0] + ": "), f[1])); });
  };

  function fichaPersonaje(nombre) {
    var p = AV.personajes[nombre];
    var d = h("dialog", { class: "ficha-p tono--" + p.color, "aria-labelledby": "ficha-nombre" },
      h("button", { type: "button", class: "visor__cerrar", "aria-label": "Cerrar" }, "×"),
      h("div", { class: "ficha-p__foto" }, imagen(p.img, nombre)),
      h("div", { class: "ficha-p__texto" },
        h("h3", { id: "ficha-nombre" }, nombre),
        h("p", { class: "ficha-p__rol" }, p.rol, h("span", { class: "ru", lang: "ru" }, " · " + p.ru)),
        h("p", null, p.desc),
        Voz.ok ? h("button", { type: "button", class: "btn-voz", onclick: function () { Voz.decir(nombre + ". " + p.desc, { tono: (p.voz || {}).tono }); } },
          h("span", { class: "btn-voz__icono", "aria-hidden": "true" }), h("span", null, "Escuchar")) : null));
    document.body.appendChild(d);
    var cerrar = function () { Voz.parar(); d.close(); d.remove(); };
    d.querySelector(".visor__cerrar").addEventListener("click", cerrar);
    d.addEventListener("click", function (e) { if (e.target === d) cerrar(); });
    d.addEventListener("cancel", function (e) { e.preventDefault(); cerrar(); });
    d.showModal();
  }
})();
