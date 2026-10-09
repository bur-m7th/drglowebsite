/* dr.glo — interactions */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Hover effects only on real mice: on touch screens a hover that changes the page
     makes iOS/Android swallow the first tap, so users have to tap twice. */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  /* Each language is its own page (/ and /ar/), so the language comes from the document. */
  const lang = document.documentElement.lang === "ar" ? "ar" : "en";
  const L = (obj) => (obj && (obj[lang] ?? obj.en)) || "";
  const fmt = (n) => n.toLocaleString("en-US");

  /* ---------------- Marquees (duplicate for a seamless loop) ---------------- */
  const partnerTrack = $("#partnerTrack");
  partnerTrack.innerHTML = PARTNERS.map((p) => `<span class="partner">${p}</span>`).join("");
  $$(".marquee__track").forEach((t) => { t.innerHTML += t.innerHTML; });
  $$(".marquee__track").forEach((t) => {
    [...t.children].slice(t.children.length / 2).forEach((c) => c.setAttribute("aria-hidden", "true"));
  });

  /* ---------------- i18n ---------------- */
  const EN = { ...EN_EXTRA };
  $$("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] ??= el.innerHTML; });
  const t = (key) => (lang === "ar" ? AR[key] : EN[key]) ?? EN[key] ?? key;


  /* ---------------- Nav ---------------- */
  const nav = $("#nav");
  const bar = $(".scroll-progress span");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const observeReveals = () => $$(".reveal:not(.is-in)").forEach((el) => revealObs.observe(el));

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(html) {
    const el = $("#toast");
    el.innerHTML = html;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 3600);
  }

  /* ---------------- Hero bubbles (poppable) ---------------- */
  const canvas = $("#bubbles");
  const ctx = canvas.getContext("2d");
  const hero = $(".hero");
  let W = 0, H = 0, DPR = 1, bubbles = [], shards = [], popped = 0, mouse = { x: -999, y: -999 };
  const HUES = [190, 260, 320, 50];

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function spawn(y) {
    const r = (10 + Math.random() * Math.random() * 46) * (W < 600 ? 0.6 : W > 1800 ? 1.25 : 1);
    return {
      x: Math.random() * W, y: y ?? H + r + Math.random() * H * 0.5, r,
      vy: -(0.25 + Math.random() * 0.6) * (1.2 - r / 80), vx: 0, wob: Math.random() * Math.PI * 2,
      hue: HUES[(Math.random() * HUES.length) | 0]
    };
  }
  function seed() {
    const n = Math.round(Math.min(40, Math.max(W < 600 ? 9 : 16, (W * H) / 32000)));
    bubbles = Array.from({ length: n }, () => spawn(Math.random() * H));
  }
  function drawBubble(b) {
    const { x, y, r, hue } = b;
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
    g.addColorStop(0, "rgba(255,255,255,0.10)");
    g.addColorStop(0.75, `hsla(${hue},90%,80%,0.06)`);
    g.addColorStop(0.93, `hsla(${hue},100%,85%,0.35)`);
    g.addColorStop(1, "rgba(255,255,255,0.55)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    // iridescent rim
    ctx.lineWidth = Math.max(1, r * 0.06);
    const rim = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    rim.addColorStop(0, "rgba(159,232,255,.7)"); rim.addColorStop(0.4, "rgba(201,168,255,.55)");
    rim.addColorStop(0.7, "rgba(255,180,218,.6)"); rim.addColorStop(1, "rgba(255,241,166,.6)");
    ctx.strokeStyle = rim; ctx.stroke();
    // highlight
    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.beginPath(); ctx.ellipse(x - r * 0.42, y - r * 0.45, r * 0.22, r * 0.11, -0.7, 0, Math.PI * 2); ctx.fill();
  }
  function pop(b) {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + Math.random() * 0.3, s = 1.5 + Math.random() * 2.5;
      shards.push({ x: b.x + Math.cos(a) * b.r, y: b.y + Math.sin(a) * b.r, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue: b.hue });
    }
    popped++;
    const pc = $("#popCount");
    pc.hidden = false; pc.innerHTML = `${icon("bubble")} ${popped}`;
    pc.classList.remove("bump"); void pc.offsetWidth; pc.classList.add("bump");
    if (popped === 25) toast(`${icon("sparkle")} ${t("toast.pop")} <small>${t("toast.pop.sub")}</small>`);
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.wob += 0.015;
      const dx = b.x - mouse.x, dy = b.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < b.r + 70 && d > 0) { b.vx += (dx / d) * 0.12; }
      b.vx *= 0.96;
      b.x += Math.sin(b.wob) * 0.35 + b.vx;
      b.y += b.vy;
      if (b.y < -b.r - 10) bubbles[i] = spawn();
      else drawBubble(b);
    }
    for (let i = shards.length - 1; i >= 0; i--) {
      const s = shards[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.life -= 0.03;
      if (s.life <= 0) { shards.splice(i, 1); continue; }
      ctx.fillStyle = `hsla(${s.hue},100%,85%,${s.life})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, 2.2 * s.life + 0.5, 0, Math.PI * 2); ctx.fill();
    }
    if (heroVisible) requestAnimationFrame(tick);
  }
  let heroVisible = true;
  new IntersectionObserver(([e]) => {
    const was = heroVisible; heroVisible = e.isIntersecting;
    if (heroVisible && !was && !reduceMotion) requestAnimationFrame(tick);
  }).observe(hero);

  function hitBubble(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left, y = clientY - rect.top;
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      if (Math.hypot(b.x - x, b.y - y) < b.r + 8) { pop(b); bubbles[i] = spawn(); return true; }
    }
    return false;
  }
  hero.addEventListener("pointerdown", (e) => {
    if (e.target.closest("a, button")) return;
    hitBubble(e.clientX, e.clientY);
  });
  hero.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
  resize(); seed();
  if (reduceMotion) bubbles.forEach(drawBubble); else requestAnimationFrame(tick);
  let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { resize(); seed(); if (reduceMotion) bubbles.forEach(drawBubble); }, 150); });

  /* hero product stack parallax */
  const stack = $("#heroStack");
  if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const rx = (e.clientY / innerHeight - 0.5) * -8, ry = (e.clientX / innerWidth - 0.5) * 12;
      stack.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    stack.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1)";
    stack.style.transformStyle = "preserve-3d";
  }

  /* ---------------- Benefits ---------------- */
  const benefits = $$(".benefit");
  let bIndex = 0, bTimer, bTouched = false;
  const setBenefit = (i) => { bIndex = i; benefits.forEach((b, j) => b.classList.toggle("is-active", j === i)); };
  benefits.forEach((b, i) => {
    const act = () => { bTouched = true; clearInterval(bTimer); setBenefit(i); };
    b.addEventListener("click", act);
    if (canHover) b.addEventListener("mouseenter", act);
    b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
  });
  new IntersectionObserver(([e]) => {
    clearInterval(bTimer);
    if (e.isIntersecting && !bTouched && !reduceMotion) bTimer = setInterval(() => setBenefit((bIndex + 1) % benefits.length), 3200);
  }, { threshold: 0.4 }).observe($("#benefits"));

  /* ---------------- Dissolve demo ---------------- */
  const dis = $("#dissolve"), dropBtn = $("#dropBtn"), dBubbles = $("#dBubbles");
  let dissolveState = "idle";
  function burst(n, spread) {
    const rect = dis.querySelector(".dissolve__stage").getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const b = document.createElement("i");
      const s = 6 + Math.random() * 16;
      b.style.width = b.style.height = s + "px";
      b.style.left = rect.width / 2 - spread / 2 + Math.random() * spread + "px";
      b.style.setProperty("--x", (Math.random() - 0.5) * 60 + "px");
      b.style.setProperty("--d", 1.4 + Math.random() * 1.6 + "s");
      b.style.animationDelay = Math.random() * 0.8 + "s";
      dBubbles.appendChild(b);
      b.addEventListener("animationend", () => b.remove());
    }
  }
  dropBtn.addEventListener("click", () => {
    if (dissolveState === "running") return;
    if (dissolveState === "done") {
      dis.classList.remove("is-dropping", "is-dissolving", "is-foamy");
      dissolveState = "idle";
      dropBtn.innerHTML = t("sheet.drop");
      $("#dCaption").innerHTML = t("sheet.caption");
      return;
    }
    dissolveState = "running";
    dropBtn.disabled = true;
    dis.classList.add("is-dropping");
    setTimeout(() => {
      dis.classList.remove("is-dropping");
      dis.classList.add("is-dissolving", "is-foamy");
      burst(26, 180);
      setTimeout(() => burst(18, 240), 700);
    }, reduceMotion ? 10 : 1100);
    setTimeout(() => {
      dissolveState = "done";
      dropBtn.disabled = false;
      dropBtn.innerHTML = t("sheet.again");
      $("#dCaption").innerHTML = t("sheet.done");
    }, reduceMotion ? 20 : 3400);
  });

  /* ---------------- Compare slider ---------------- */
  const cmp = $("#compare"), handle = $("#compareHandle");
  let pos = 50;
  const setPos = (p) => {
    pos = Math.max(4, Math.min(96, p));
    cmp.style.setProperty("--pos", pos + "%");
    handle.setAttribute("aria-valuenow", Math.round(pos));
  };
  const fromEvent = (e) => {
    const r = cmp.getBoundingClientRect();
    let p = ((e.clientX - r.left) / r.width) * 100;
    if (document.documentElement.dir === "rtl") p = 100 - p;
    setPos(p);
  };
  let dragging = false;
  cmp.addEventListener("pointerdown", (e) => { dragging = true; cmp.classList.add("is-dragging"); cmp.setPointerCapture(e.pointerId); fromEvent(e); });
  cmp.addEventListener("pointermove", (e) => { if (dragging) fromEvent(e); });
  const stopDrag = () => { dragging = false; cmp.classList.remove("is-dragging"); };
  cmp.addEventListener("pointerup", stopDrag);
  cmp.addEventListener("pointercancel", stopDrag);
  handle.addEventListener("keydown", (e) => {
    const rtl = document.documentElement.dir === "rtl";
    if (e.key === "ArrowLeft") setPos(pos + (rtl ? 5 : -5));
    else if (e.key === "ArrowRight") setPos(pos + (rtl ? -5 : 5));
    else return;
    e.preventDefault();
  });
  /* a little "hint" wiggle the first time it scrolls into view */
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting || reduceMotion) return;
    o.disconnect();
    const seq = [50, 34, 66, 50]; let k = 0;
    cmp.querySelectorAll(".compare__side--new, .compare__handle").forEach((el) => { el.style.transition = "clip-path .6s, left .6s, right .6s"; });
    const step = () => { setPos(seq[k++]); if (k < seq.length) setTimeout(step, 650); else setTimeout(() => cmp.querySelectorAll(".compare__side--new, .compare__handle").forEach((el) => { el.style.transition = ""; }), 700); };
    setTimeout(step, 400);
  }, { threshold: 0.6 }).observe(cmp);

  /* ---------------- Products ---------------- */
  const grid = $("#productGrid");
  let filter = "all";

  function renderProducts() {
    grid.innerHTML = PRODUCTS.map((p) => cardHTML(p, lang, IMG)).join("");
    applyFilter(false);
  }
  function applyFilter(animate = true) {
    $$(".card", grid).forEach((c, i) => {
      const show = filter === "all" || c.dataset.cat === filter;
      c.classList.toggle("is-hidden", !show);
      if (show && animate) {
        c.classList.remove("is-entering"); void c.offsetWidth;
        c.style.animationDelay = (i % 6) * 50 + "ms";
        c.classList.add("is-entering");
      }
    });
  }
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip"); if (!chip) return;
    filter = chip.dataset.filter;
    $$(".chip").forEach((c) => { const on = c === chip; c.classList.toggle("is-active", on); c.setAttribute("aria-selected", on); });
    applyFilter();
  });
  grid.addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openModal(c.dataset.id, c.querySelector(".card__link")); });
  if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
    grid.addEventListener("pointermove", (e) => {
      const c = e.target.closest(".card"); if (!c) return;
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-4px)`;
      c.style.setProperty("--mx", px * 100 + "%"); c.style.setProperty("--my", py * 100 + "%");
    });
    grid.addEventListener("pointerout", (e) => {
      const c = e.target.closest(".card");
      if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
    });
  }

  /* ---------------- Modal ---------------- */
  const modal = $("#modal");
  let lastFocus = null;
  function openModal(id, from) {
    const p = PRODUCTS.find((x) => x.id === id); if (!p) return;
    lastFocus = from || document.activeElement;
    $(".modal__media", modal).style.setProperty("--tint", p.tint);
    const img = $("#mImg"); img.src = IMG + p.img + ".webp"; img.alt = L(p.name);
    $("#mCat").textContent = L(CATEGORIES[p.cat]);
    $("#mTitle").textContent = L(p.name);
    $("#mMeta").textContent = L(p.meta);
    $("#mDesc").textContent = L(p.desc);
    $("#mPoints").innerHTML = L(p.points).map((x) => `<li>${x}</li>`).join("");
    $("#mHow").textContent = L(p.how);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    lastFocus?.focus?.();
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") { /* keep focus inside the dialog */
      const f = $$("button, a[href]", modal); const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- Quiz ---------------- */
  const qBody = $("#quizBody"), qBar = $("#quizBar");
  let qHistory = [], qAdds = [], qResult = null;
  const totalSteps = 3;

  function renderQuiz() {
    if (qResult) return renderResult();
    const id = qHistory.length ? qHistory[qHistory.length - 1] : QUIZ.start;
    const q = QUIZ.questions[id];
    qBar.style.width = (Math.max(0, qHistory.length - 1) / totalSteps) * 100 + "%";
    qBody.innerHTML = `
      <div class="quiz__step">
        <h3 class="quiz__q">${L(q.q)}</h3>
        <div class="quiz__answers">
          ${q.a.map((a, i) => `<button class="answer" type="button" data-i="${i}"><span class="answer__icon" aria-hidden="true">${icon(a.icon)}</span><span>${L(a.t)}</span></button>`).join("")}
        </div>
        ${qHistory.length ? `<button class="quiz__back" type="button" data-back>← ${t("q.back")}</button>` : ""}
      </div>`;
  }
  function renderResult() {
    qBar.style.width = "100%";
    const items = [...new Set(qResult)].map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    qBody.innerHTML = `
      <div class="quiz__step quiz__result">
        <h3>${t("q.result")}</h3>
        <div class="quiz__matches">
          ${items.map((p, i) => `
            <div class="match" style="animation-delay:${i * 120}ms">
              <img src="${IMG}${p.img}-sm.webp" alt="" loading="lazy">
              <div><h4>${L(p.name)}</h4><p>${L(p.meta)}</p><button type="button" data-open="${p.id}">${t("q.view")} →</button></div>
            </div>`).join("")}
        </div>
        <div class="quiz__actions"><button class="btn btn--primary" type="button" data-restart>${t("q.restart")}</button></div>
      </div>`;
  }
  qBody.addEventListener("click", (e) => {
    const ans = e.target.closest(".answer");
    if (ans) {
      const id = qHistory.length ? qHistory[qHistory.length - 1] : QUIZ.start;
      const a = QUIZ.questions[id].a[+ans.dataset.i];
      if (!qHistory.length) qHistory.push(QUIZ.start);
      qAdds.push(a.add || []);
      if (a.result) {
        qResult = [...a.result, ...qAdds.flat()];
        bubbleConfetti(ans);
      } else qHistory.push(a.next);
      return renderQuiz();
    }
    if (e.target.closest("[data-back]")) {
      qHistory.pop(); qAdds.pop();
      if (qHistory.length === 1) qHistory = [];
      return renderQuiz();
    }
    if (e.target.closest("[data-restart]")) { qHistory = []; qAdds = []; qResult = null; return renderQuiz(); }
    const open = e.target.closest("[data-open]");
    if (open) openModal(open.dataset.open, open);
  });

  function bubbleConfetti(fromEl) {
    if (reduceMotion) return;
    const r = fromEl.getBoundingClientRect();
    for (let i = 0; i < 18; i++) {
      const b = document.createElement("span");
      const s = 8 + Math.random() * 18;
      Object.assign(b.style, {
        position: "fixed", left: r.left + r.width / 2 + "px", top: r.top + r.height / 2 + "px", width: s + "px", height: s + "px",
        borderRadius: "50%", pointerEvents: "none", zIndex: 95,
        background: "radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,.2) 45%, transparent 60%)",
        border: `1.5px solid hsl(${[190, 260, 320, 50][i % 4]} 90% 75%)`
      });
      document.body.appendChild(b);
      const dx = (Math.random() - 0.5) * 320, dy = -120 - Math.random() * 220;
      b.animate([{ transform: "translate(-50%,-50%) scale(.3)", opacity: 1 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`, opacity: 0 }],
        { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = () => b.remove();
    }
  }

  /* ---------------- Map ---------------- */
  const svg = $("#map"), tip = $("#mapTip");
  const K = 38, P = (lon, lat) => [20 + (lon - 34) * K, (32.5 - lat) * K];
  const poly = (pts, proj = P) => "M" + pts.map((p) => proj(...p).map((v) => v.toFixed(1)).join(",")).join("L") + "Z";
  const INSET = { cx: 770, cy: 120, r: 92, lon: 50.555, lat: 26.03, k: 300 };
  const PI = (lon, lat) => [INSET.cx + (lon - INSET.lon) * INSET.k, INSET.cy - (lat - INSET.lat) * INSET.k];
  let region = "bh";
  const labelPos = { jazan: "left", east: "above-left", tabuk: "below", north: "above" };

  function pinMarkup(m, x, y, cls, extra = "") {
    const pos = labelPos[m.id];
    let tx = x + 15, ty = y + 6, anchor = "start";
    if (pos === "left") { tx = x - 15; anchor = "end"; }
    if (pos === "above-left") { tx = x + 6; ty = y - 16; anchor = "end"; }
    if (pos === "below") { tx = x; ty = y + 30; anchor = "middle"; }
    if (pos === "above") { tx = x; ty = y - 16; anchor = "middle"; }
    const name = lang === "ar" ? m.ar : m.en;
    return `<g class="pin ${cls}" tabindex="0" data-id="${m.id}" ${extra}>
      ${m.status !== "next" ? `<circle class="pulse" cx="${x}" cy="${y}" r="10"/>` : ""}
      <circle class="core" cx="${x}" cy="${y}" r="8"/>
      <text class="halo" x="${tx}" y="${ty}" text-anchor="${anchor}">${name}</text>
      <text x="${tx}" y="${ty}" text-anchor="${anchor}">${name}</text>
    </g>`;
  }
  function renderMap() {
    const [hx, hy] = P(MAP.saudi[0].lon, MAP.saudi[0].lat);
    const [bx, by] = P(MAP.bahrain[0].lon, MAP.bahrain[0].lat);
    const routes = MAP.saudi.slice(1).map((m, i) => {
      const [x, y] = P(m.lon, m.lat);
      const cx = (hx + x) / 2, cy = Math.min(hy, y) - 60 - Math.abs(hx - x) * 0.08;
      return `<path class="route ${region === "sa" ? "route--draw" : ""}" style="animation-delay:${i * 90}ms, ${2400 + i * 90}ms" d="M${hx},${hy} Q${cx},${cy} ${x},${y}"/>`;
    }).join("");
    const pins = MAP.saudi.map((m) => { const [x, y] = P(m.lon, m.lat); return pinMarkup(m, x, y, `pin--${m.status}`); }).join("");
    const [ix, iy] = PI(MAP.bahrain[0].lon, MAP.bahrain[0].lat);
    const bh = MAP.bahrain[0];

    svg.innerHTML = `
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle class="sea-dot" cx="2" cy="2" r="1.6"/></pattern>
        <clipPath id="insetClip"><circle cx="${INSET.cx}" cy="${INSET.cy}" r="${INSET.r}"/></clipPath>
      </defs>
      <rect width="880" height="640" fill="url(#dots)" opacity=".7"/>
      <path class="land ${region === "sa" ? "is-focus" : ""}" d="${poly(MAP.saOutline)}"/>
      <path class="land land--bh ${region === "bh" ? "is-focus" : ""}" d="${poly(MAP.bhOutline)}"/>
      <path class="land land--bh ${region === "bh" ? "is-focus" : ""}" d="${poly(MAP.muharraqOutline)}"/>
      ${routes}
      <path class="route ${region === "bh" ? "route--draw" : ""}" d="M${bx},${by} Q${(bx + hx) / 2},${Math.min(by, hy) - 24} ${hx},${hy}"/>
      <line x1="${bx}" y1="${by}" x2="${INSET.cx - INSET.r * 0.7}" y2="${INSET.cy + INSET.r * 0.7}" stroke="#e58d99" stroke-width="1.5" stroke-dasharray="3 4"/>
      ${pins}
      <circle class="inset" cx="${INSET.cx}" cy="${INSET.cy}" r="${INSET.r}"/>
      <g clip-path="url(#insetClip)">
        <rect x="${INSET.cx - INSET.r}" y="${INSET.cy - INSET.r}" width="${INSET.r * 2}" height="${INSET.r * 2}" fill="url(#dots)"/>
        <path class="land land--bh ${region === "bh" ? "is-focus" : ""}" d="${poly(MAP.bhOutline, PI)}"/>
        <path class="land land--bh ${region === "bh" ? "is-focus" : ""}" d="${poly(MAP.muharraqOutline, PI)}"/>
      </g>
      ${pinMarkup({ ...bh, id: "bh" }, ix, iy - 10, "pin--now pin--bh")}
      <text class="big halo" x="${INSET.cx}" y="${INSET.cy + INSET.r + 30}" text-anchor="middle">${lang === "ar" ? "البحرين" : "Bahrain"}</text>
      <text class="big" x="${INSET.cx}" y="${INSET.cy + INSET.r + 30}" text-anchor="middle">${lang === "ar" ? "البحرين" : "Bahrain"}</text>
      <text class="big halo" x="${P(44.6, 22.3)[0]}" y="${P(44.6, 22.3)[1]}" text-anchor="middle">${lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}</text>
      <text class="big" x="${P(44.6, 22.3)[0]}" y="${P(44.6, 22.3)[1]}" text-anchor="middle" opacity=".55">${lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}</text>`;
  }
  function setRegion(r) {
    if (r === region) return;
    region = r;
    $$(".map-tab").forEach((b) => { const on = b.dataset.region === r; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
    $$(".panel").forEach((p) => p.classList.toggle("is-active", p.dataset.panel === r));
    renderMap();
    runCounters($(`.panel[data-panel="${r}"]`));
  }
  $$(".map-tab").forEach((b) => b.addEventListener("click", () => setRegion(b.dataset.region)));

  function showTip(g) {
    const id = g.dataset.id;
    const m = id === "bh" ? MAP.bahrain[0] : MAP.saudi.find((x) => x.id === id);
    const status = m.note ? L(m.note) : t("s.lg.next");
    tip.innerHTML = `<b>${lang === "ar" ? m.ar : m.en}</b>${status}`;
    const card = svg.closest(".map-card").getBoundingClientRect();
    const c = g.querySelector(".core").getBoundingClientRect();
    tip.style.left = c.left + c.width / 2 - card.left + "px";
    tip.style.top = c.top - card.top + "px";
    tip.hidden = false;
  }
  svg.addEventListener("pointerover", (e) => { if (e.pointerType !== "mouse") return; const g = e.target.closest(".pin"); if (g) showTip(g); });
  svg.addEventListener("pointerout", (e) => { if (e.pointerType === "mouse" && e.target.closest(".pin") && !e.relatedTarget?.closest?.(".pin")) tip.hidden = true; });
  svg.addEventListener("focusin", (e) => { const g = e.target.closest(".pin"); if (g) showTip(g); });
  svg.addEventListener("focusout", () => { tip.hidden = true; });
  svg.addEventListener("click", (e) => {
    const g = e.target.closest(".pin"); if (!g) return;
    setRegion(g.dataset.id === "bh" ? "bh" : "sa");
    requestAnimationFrame(() => { const ng = svg.querySelector(`.pin[data-id="${g.dataset.id}"]`); if (ng) showTip(ng); });
  });

  /* ---------------- Counters ---------------- */
  function runCounters(scope) {
    $$("[data-count]", scope).forEach((el) => {
      const end = +el.dataset.count;
      if (reduceMotion) { el.textContent = fmt(end); return; }
      const start = performance.now(), dur = 1400 + Math.min(1200, end / 200);
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(end * e));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
  new IntersectionObserver(([e], o) => {
    if (e.isIntersecting || e.boundingClientRect.top < 0) { o.disconnect(); runCounters($(".panel.is-active")); }
  }, { threshold: 0, rootMargin: "0px 0px -15% 0px" }).observe($(".story__panels"));

  /* ---------------- Init ---------------- */
  $("#year").textContent = new Date().getFullYear();
  if (grid.querySelector(".card")) applyFilter(false); /* cards are pre-rendered into the HTML by the build */
  else renderProducts();
  renderQuiz();
  renderMap();
  observeReveals();
})();
