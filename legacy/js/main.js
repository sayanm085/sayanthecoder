import Lenis from "lenis";

/* ------------------------------------------------------------------
   PORTFOLIO.OS — interaction layer
   One ticker. Springs. Scroll-triggered type. Pinned traverse.
------------------------------------------------------------------- */

const doc = document.documentElement;
const body = document.body;
doc.classList.add("js");
body.classList.add("is-loading");
window.scrollTo(0, 0);
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const desktop = window.matchMedia("(min-width: 1024px)");
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------- ticker ---------------- */
const ticker = (() => {
  const subscribers = new Set();
  let frame = 0;
  let last = 0;
  const loop = (time) => {
    const dt = Math.min(48, time - last || 16);
    last = time;
    for (const fn of subscribers) fn(time, dt);
    frame = requestAnimationFrame(loop);
  };
  return {
    add(fn) {
      subscribers.add(fn);
      if (!frame) frame = requestAnimationFrame(loop);
    },
    remove(fn) {
      subscribers.delete(fn);
      if (!subscribers.size && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
  };
})();

/* ---------------- spring ---------------- */
class Spring {
  constructor(value = 0, { tension = 190, friction = 26 } = {}) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.tension = tension;
    this.friction = friction;
    this.resting = true;
  }
  set(target) {
    this.target = target;
    this.resting = false;
  }
  snap(value) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.resting = true;
  }
  step(dt) {
    if (this.resting) return this.value;
    let remaining = Math.min(dt, 48);
    while (remaining > 0) {
      const s = Math.min(1, remaining);
      const force = -this.tension * (this.value - this.target) - this.friction * this.velocity;
      this.velocity += force * (s / 1000);
      this.value += this.velocity * (s / 1000);
      remaining -= s;
    }
    if (Math.abs(this.velocity) < 0.0015 && Math.abs(this.target - this.value) < 0.0015) {
      this.value = this.target;
      this.velocity = 0;
      this.resting = true;
    }
    return this.value;
  }
}

/* ---------------- lenis ---------------- */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
  lenis.stop();
  ticker.add((time) => lenis.raf(time));
}
const scrollToTarget = (target, opts = {}) => {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.15, ...opts });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
    else if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  }
};

/* ---------------- deferred release ---------------- */
let releaseResolve;
const released = new Promise((resolve) => (releaseResolve = resolve));

/* ---------------- text reveals ---------------- */
const reveals = [];
let releasedFlag = false;
released.then(() => (releasedFlag = true));

function setUnitFinal(unit, letters) {
  unit.el.style.opacity = "1";
  unit.el.style.transform = "none";
  unit.el.style.willChange = "auto";
}

function splitElement(el) {
  const mode = el.dataset.split === "letters" ? "letters" : "words";
  const plain = el.textContent.replace(/\s+/g, " ").trim();
  if (!plain) return;
  const hasHeadingLabel = Boolean(el.closest("[aria-label]"));
  const units = [];
  const visual = document.createElement("span");
  visual.className =
    "split-visual" +
    (mode === "letters" ? " split-visual--letters" : "") +
    (el.tagName === "P" ? " split-visual--block" : "");
  visual.setAttribute("aria-hidden", "true");

  const parts = mode === "letters" ? Array.from(plain) : plain.split(" ");
  parts.forEach((part) => {
    const span = document.createElement("span");
    span.className = "unit";
    if (mode === "letters" && part === " ") {
      span.classList.add("unit--space");
      span.innerHTML = "&nbsp;";
      visual.appendChild(span);
      return;
    }
    span.textContent = part;
    visual.appendChild(span);
    if (mode === "words") visual.appendChild(document.createTextNode(" "));
    units.push({
      el: span,
      spring: new Spring(0, { tension: mode === "letters" ? 200 : 170, friction: 24 }),
      startAt: 0,
      started: false,
      mode,
      done: reduced,
    });
  });

  el.textContent = "";
  if (!hasHeadingLabel) {
    const sr = document.createElement("span");
    sr.className = "sr-only";
    sr.textContent = plain;
    el.appendChild(sr);
  }
  el.appendChild(visual);

  const inHero = Boolean(el.closest(".hero"));
  const inTitle = Boolean(el.closest(".hero__title"));
  const inSectionTitle = Boolean(el.closest(".section-title"));
  const stagger = Number(el.dataset.stagger) || (inTitle ? 34 : inSectionTitle ? 48 : 16);
  const baseDelay = Number(el.dataset.delay) || 0;

  const record = {
    el,
    units,
    stagger,
    baseDelay,
    triggered: false,
    inHero,
    startAt: 0,
  };
  reveals.push(record);

  if (reduced) {
    units.forEach((u) => {
      u.spring.snap(1);
      setUnitFinal(u, mode === "letters");
    });
    record.triggered = true;
    record.done = true;
    return;
  }

  units.forEach((u) => {
    u.el.style.opacity = "0";
    u.el.style.transform = `translateY(${mode === "letters" ? 0.3 : 0.35}em)`;
  });

  if (!inHero) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerText(record);
          io.disconnect();
        }
      },
      { rootMargin: "0% 0% -8% 0%", threshold: 0.01 }
    );
    io.observe(el);
  }
}

function triggerText(record, extraDelay = 0) {
  if (record.triggered) return;
  record.triggered = true;
  const now = performance.now();
  record.startAt = now + record.baseDelay + extraDelay;
  record.units.forEach((unit, i) => {
    unit.startAt = record.startAt + i * record.stagger;
    unit.el.style.willChange = "transform, opacity";
  });
}

function updateReveals(now, dt) {
  for (const record of reveals) {
    if (!record.triggered || record.done) continue;
    let allDone = true;
    for (const unit of record.units) {
      if (!unit.started) {
        if (now >= unit.startAt) {
          unit.started = true;
          unit.spring.set(1);
        } else {
          allDone = false;
          continue;
        }
      }
      const v = unit.spring.step(dt);
      unit.el.style.opacity = clamp01(v).toFixed(3);
      const distance = (1 - v) * (unit.mode === "letters" ? 0.3 : 0.35);
      unit.el.style.transform = `translateY(${distance.toFixed(3)}em)`;
      if (unit.spring.resting) {
        if (v >= 0.999) setUnitFinal(unit, unit.mode === "letters");
      } else {
        allDone = false;
      }
    }
    if (allDone) record.done = true;
  }
}

function prepareText() {
  document.querySelectorAll("[data-split]").forEach(splitElement);
}
ticker.add((now, dt) => updateReveals(now, dt));

/* ---------------- generic in-view reveals ---------------- */
function prepareBlocks() {
  if (reduced) return;
  const selector = [
    ".archive__head",
    ".archive__row",
    ".credentials",
    ".principles__grid li",
    ".stack-list",
    ".contact__aside",
    ".contact__actions",
  ].join(",");
  const items = [...document.querySelectorAll(selector)];
  items.forEach((el, i) => {
    el.classList.add("reveal-init");
    if (el.matches(".archive__row, .principles__grid li")) {
      el.style.setProperty("--rd", `${(i % 4) * 0.06}s`);
    }
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0% 0% -9% 0%", threshold: 0.01 }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------------- loader ---------------- */
const loader = document.getElementById("loader");
const loaderPct = document.getElementById("loader-pct");
const loaderState = document.getElementById("loader-state");
const fallbackPortrait = document.querySelector(".portrait__fallback");
const progress = new Spring(0.02, { tension: 10, friction: 30 });
let loaderFinished = false;

function setLoaderProgress(value) {
  if (!loader) return;
  loader.style.setProperty("--p", value.toFixed(4));
  if (loaderPct) loaderPct.textContent = String(Math.round(value * 100)).padStart(2, "0");
}
ticker.add((now, dt) => {
  if (loaderFinished) return;
  progress.step(dt);
  setLoaderProgress(progress.value);
});

function finishLoader(controller) {
  if (loaderFinished) return;
  loaderFinished = true;
  clearTimeout(window.__bootFallback);
  if (loaderState) loaderState.textContent = "READY";
  const startP = progress.value;
  const started = performance.now();
  const duration = reduced ? 0 : 520;

  const lift = () => {
    if (loader) {
      setLoaderProgress(1);
      loader.classList.add("is-done");
      loader.removeAttribute("aria-live");
    }
    doc.classList.add("is-loaded");
    body.classList.remove("is-loading");
    if (lenis) lenis.start();
    try {
      controller?.begin?.();
    } catch (error) {
      console.warn("Scene begin failed", error);
    }
    window.setTimeout(() => releaseResolve(), reduced ? 0 : 380);
    const removalStart = performance.now();
    const remove = () => {
      if (!loader) return;
      if (getComputedStyle(loader).opacity <= 0.004 || performance.now() - removalStart > 3200) {
        loader.remove();
      } else {
        requestAnimationFrame(remove);
      }
    };
    requestAnimationFrame(remove);
  };

  if (reduced) {
    setLoaderProgress(1);
    window.setTimeout(lift, 60);
    return;
  }
  const tween = () => {
    const t = clamp01((performance.now() - started) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    setLoaderProgress(startP + (1 - startP) * eased);
    if (t < 1) requestAnimationFrame(tween);
    else window.setTimeout(lift, 140);
  };
  tween();
}

async function initExperience() {
  progress.set(0.68);
  let controller = null;
  const skipScene =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse) and (max-width: 1199px)").matches;
  const minWait = new Promise((resolve) => setTimeout(resolve, reduced || skipScene ? 300 : 820));
  const fonts = document.fonts?.ready || Promise.resolve();
  const image = fallbackPortrait?.decode
    ? fallbackPortrait.decode().catch(() => {})
    : Promise.resolve();

  if (!reduced && !skipScene) {
    const scenePromise = import("./hero-scene.js")
      .then((mod) =>
        mod.initHeroScene({
          canvas: document.getElementById("hero-canvas"),
          stage: document.getElementById("portrait-stage"),
          reducedMotion: reduced,
        })
      )
      .then((instance) => {
        if (instance) {
          body.classList.add("scene-ready");
          controller = instance;
        }
        return instance;
      })
      .catch((error) => {
        console.warn("Hero scene unavailable:", error);
        return null;
      });
    await Promise.all([scenePromise, fonts, image, minWait]);
  } else {
    await Promise.all([fonts, image, minWait]);
  }
  finishLoader(controller);
}

window.setTimeout(() => finishLoader(null), 9000);

/* ---------------- header theme & scroll ---------------- */
const header = document.getElementById("site-header");
const toneSections = [...document.querySelectorAll("[data-tone]")];
let lastHeaderCheck = 0;
function updateHeader(now) {
  if (now - lastHeaderCheck < 80) return;
  lastHeaderCheck = now;
  const y = window.scrollY;
  if (header) {
    header.classList.toggle("is-scrolled", y > 24);
    let tone = "light";
    for (const section of toneSections) {
      if (section.offsetTop <= y + 70) tone = section.dataset.tone;
    }
    header.dataset.theme = tone;
    const totalScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    header.style.setProperty("--scroll", clamp01(y / totalScroll).toFixed(4));
  }
  const railLinks = document.querySelectorAll("[data-rail]");
  if (railLinks.length) {
    let active = "top";
    for (const link of railLinks) {
      const target = document.getElementById(link.dataset.rail);
      if (!target) continue;
      const rect = target.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.45) active = link.dataset.rail;
    }
    railLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.rail === active));
    body.classList.toggle("at-contact", active === "contact");
    const line = document.getElementById("rail-progress");
    if (line) {
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      line.style.height = `${clamp01(y / total) * 100}%`;
    }
  }
}
ticker.add(updateHeader);

/* ---------------- custom cursor ---------------- */
const cursor = document.getElementById("cursor");
const cursorLabel = document.getElementById("cursor-label");
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2, nx: 0.5, ny: 0.5 };
const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cursorOn = false;

if (finePointer && !reduced && cursor) {
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      pointer.nx = event.clientX / window.innerWidth;
      pointer.ny = event.clientY / window.innerHeight;
      if (!cursorOn) {
        cursorOn = true;
        cursor.classList.add("is-on");
        body.classList.add("has-cursor");
      }
      const target = event.target.closest("a, button");
      const isInteractive = Boolean(target);
      cursor.classList.toggle("is-link", isInteractive);
      let label = "";
      if (target) {
        if (target.matches(".btn--fiverr") || target.matches(".btn--fiverr *")) label = "HIRE";
        else if (target.matches(".project__link, .project__link *, .archive__link, .archive__link *, .text-link")) label = "OPEN";
        else if (target.closest(".site-nav, .menu-sheet__nav, .section-rail, .contact__nav")) label = "GO";
      }
      cursor.classList.toggle("is-active", Boolean(label));
      if (cursorLabel) cursorLabel.textContent = label || "VIEW";
    },
    { passive: true }
  );
  document.addEventListener("mouseleave", () => cursor.classList.remove("is-on"));
  document.addEventListener("mouseenter", () => cursorOn && cursor.classList.add("is-on"));
  ticker.add((now, dt) => {
    const ease = 1 - Math.pow(0.001, dt / 1000);
    ring.x = lerp(ring.x, pointer.x, ease);
    ring.y = lerp(ring.y, pointer.y, ease);
    const dot = cursor.querySelector(".cursor__dot");
    const outer = cursor.querySelector(".cursor__ring");
    if (dot) dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
    if (outer) outer.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
  });
}

/* ---------------- menu ---------------- */
const menuBtn = document.getElementById("menu-btn");
const menuSheet = document.getElementById("menu-sheet");
const menuClose = document.getElementById("menu-close");
let menuOpen = false;

function openMenu() {
  if (!menuSheet || menuOpen) return;
  menuOpen = true;
  menuSheet.hidden = false;
  body.classList.add("menu-open");
  document.querySelector("main")?.setAttribute("inert", "");
  document.getElementById("site-header")?.setAttribute("inert", "");
  if (lenis) lenis.stop();
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => menuSheet.classList.add("is-open"));
  setTimeout(() => menuClose?.focus(), 60);
}
function closeMenu(returnFocus = true) {
  if (!menuSheet || !menuOpen) return;
  menuOpen = false;
  menuSheet.classList.remove("is-open");
  body.classList.remove("menu-open");
  document.querySelector("main")?.removeAttribute("inert");
  document.getElementById("site-header")?.removeAttribute("inert");
  if (lenis && doc.classList.contains("is-loaded")) lenis.start();
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  if (returnFocus) menuBtn?.focus();
  setTimeout(() => {
    if (!menuOpen) menuSheet.hidden = true;
  }, reduced ? 10 : 480);
}
menuBtn?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", () => closeMenu());
menuSheet?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu(true)));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuOpen) closeMenu();
  if (event.key !== "Tab" || !menuOpen || !menuSheet) return;
  const focusables = [...menuSheet.querySelectorAll("a[href],button:not([disabled])")].filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
window.matchMedia("(min-width: 1200px)").addEventListener("change", (event) => {
  if (event.matches && menuOpen) closeMenu(false);
});

/* ---------------- smooth anchors ---------------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (link.classList.contains("skip-link")) return;
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    if (menuOpen) closeMenu(false);
    if (id === "#top") {
      scrollToTarget(0);
      return;
    }
    scrollToTarget(target, { offset: -6 });
  });
});

/* ---------------- sticky recede ---------------- */
const pinned = [
  { section: document.querySelector(".hero"), inner: document.querySelector(".hero__inner"), shade: document.querySelector(".hero .pin-shade"), next: document.querySelector(".expertise") },
  { section: document.querySelector(".expertise"), inner: document.querySelector(".expertise__inner"), shade: document.querySelector(".expertise .pin-shade"), next: document.querySelector(".work") },
].filter((item) => item.section && item.inner && item.shade && item.next);

let lastRecede = 0;
function updateRecede(now) {
  if (now - lastRecede < 32) return;
  lastRecede = now;
  if (!desktop.matches || reduced) {
    pinned.forEach(({ inner, shade }) => {
      inner.style.transform = "";
      inner.style.willChange = "";
      inner.style.visibility = "";
      shade.style.opacity = "0";
    });
    return;
  }
  const vh = window.innerHeight || 1;
  for (const { inner, shade, next } of pinned) {
    const p = clamp01(1 - next.getBoundingClientRect().top / vh);
    const shrink = 0.06;
    inner.style.transform = p > 0.001 ? `scale(${1 - shrink * p})` : "";
    inner.style.willChange = p > 0.001 ? "transform, visibility" : "";
    inner.style.visibility = p >= 1 ? "hidden" : "visible";
    shade.style.opacity = String(0.58 * p);
  }
}
ticker.add(updateRecede);

/* ---------------- contour fields ---------------- */
class ContourField {
  constructor(canvas, { color, lines = 2.5, cells = 78, speed = 1.66 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.color = color || "rgba(6,8,7,0.07)";
    this.lines = lines;
    this.cells = cells;
    this.speed = speed;
    this.visible = false;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.last = 0;
    this.start = performance.now();
    this.resize();
    new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((entry) => entry.isIntersecting);
        if (this.visible) this.render(performance.now());
      },
      { rootMargin: "10% 0% 10% 0%" }
    ).observe(canvas);
    window.addEventListener("resize", () => this.resize(), { passive: true });
    if (reduced) this.render(0);
    else
      ticker.add((now) => {
        if (!this.visible || now - this.last < 38) return;
        if (this.canvas.dataset.contour === "light" && window.scrollY > window.innerHeight * 1.4) return;
        this.last = now;
        this.render(now);
      });
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.dpr = Math.min(1.8, window.devicePixelRatio || 1);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.last = 0;
  }
  render(now) {
    if (!this.width || !this.height) return;
    const { ctx, width, height, lines, cells } = this;
    const t = reduced ? 0 : ((now - this.start) / 1000) * this.speed;
    const cols = width >= height ? cells : Math.max(8, Math.round((cells * width) / height));
    const rows = Math.max(8, Math.round((cols * height) / width));
    const stepX = width / cols;
    const stepY = height / rows;
    const aspect = width / height;
    const values = new Float32Array((cols + 1) * (rows + 1));
    const field = (x, y, time) => {
      let f = Math.sin(x * 1.0 + time * 0.6) * 0.5;
      f += Math.sin(y * 0.85 - time * 0.45) * 0.45;
      f += Math.sin((x + y) * 0.65 + time * 0.35) * 0.35;
      f += Math.sin((x - y) * 0.95 - time * 0.55) * 0.25;
      return f * 0.5 + 0.5;
    };
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const nx = ((i / cols) * 2 - 1) * aspect * 3.8;
        const ny = ((j / rows) * 2 - 1) * 3.8;
        const qx = nx + Math.sin(ny * 0.8 + t * 0.7) * 0.37;
        const qy = ny + Math.cos(nx * 0.7 - t * 0.6) * 0.37;
        values[j * (cols + 1) + i] = field(qx, qy, t) * lines;
      }
    }
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let level = 0.5; level < lines; level += 1) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = values[j * (cols + 1) + i];
          const b = values[j * (cols + 1) + i + 1];
          const c = values[(j + 1) * (cols + 1) + i + 1];
          const d = values[(j + 1) * (cols + 1) + i];
          const index = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
          if (index === 0 || index === 15) continue;
          const x0 = i * stepX;
          const y0 = j * stepY;
          const top = [x0 + stepX * ((level - a) / (b - a)), y0];
          const right = [x0 + stepX, y0 + stepY * ((level - b) / (c - b))];
          const bottom = [x0 + stepX * ((level - d) / (c - d)), y0 + stepY];
          const left = [x0, y0 + stepY * ((level - a) / (d - a))];
          const seg = (p, q) => {
            ctx.moveTo(p[0], p[1]);
            ctx.lineTo(q[0], q[1]);
          };
          switch (index) {
            case 1: case 14: seg(left, bottom); break;
            case 2: case 13: seg(bottom, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(top, right); break;
            case 6: case 9: seg(top, bottom); break;
            case 7: case 8: seg(left, top); break;
            case 5: seg(left, top); seg(bottom, right); break;
            case 10: seg(left, bottom); seg(top, right); break;
          }
        }
      }
    }
    ctx.stroke();
  }
}

document.querySelectorAll("[data-contour]").forEach((canvas) => {
  const dark = canvas.dataset.contour === "dark";
  new ContourField(canvas, {
    color: dark ? "rgba(198,255,61,0.09)" : "rgba(6,8,7,0.072)",
    cells: dark ? 52 : 78,
  });
});

/* ---------------- data dissolve seams ---------------- */
class Seam {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.section = canvas.closest("section");
    this.carry = canvas.dataset.seam === "dark" ? "dark" : "light";
    this.visible = false;
    this.width = 0;
    this.height = 0;
    this.lastP = -1;
    this.resize();
    new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((entry) => entry.isIntersecting);
        if (this.visible) this.draw();
      },
      { rootMargin: "20% 0% 20% 0%" }
    ).observe(canvas);
    window.addEventListener("resize", () => this.resize(), { passive: true });
    ticker.add((now) => {
      if (!this.visible) return;
      if (now - (this.lastDraw || 0) < 26) return;
      this.lastDraw = now;
      this.draw();
    });
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(1.6, window.devicePixelRatio || 1);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.lastP = -1;
  }
  draw() {
    if (!this.width || !this.height || !this.section) return;
    const rect = this.section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const p = clamp01(1 - rect.top / vh);
    if (Math.abs(p - this.lastP) < 0.002) return;
    this.lastP = p;
    const { ctx, width, height } = this;
    const cell = width < 640 ? 16 : 22;
    const columns = Math.ceil(width / cell) + 1;
    const rows = Math.ceil(height / cell) + 1;
    const noise = (x, y) => {
      let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };
    ctx.clearRect(0, 0, width, height);
    const solidUntil = 0.16;
    const lift = 2;
    const accentShare = 0.055;
    const depthBase = p * lift;
    const surface = this.carry === "light" ? "#f2f4ee" : "#060807";
    const accent = "#c6ff3d";
    for (let y = 0; y < rows; y++) {
      const depth = y / Math.max(1, rows - 1) + depthBase;
      if (depth > 1) break;
      const isSolid = depth <= solidUntil;
      const fade = clamp01(1 - (depth - solidUntil) / (1 - solidUntil));
      if (!isSolid && fade <= 0) break;
      for (let x = 0; x < columns; x++) {
        if (!isSolid) {
          if ((x + y) % 2 !== 0) continue;
          if (noise(x, y) > fade) continue;
        }
        ctx.fillStyle = !isSolid && noise(x + 101, y + 57) < accentShare ? accent : surface;
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }
}
document.querySelectorAll("[data-seam]").forEach((canvas) => new Seam(canvas));

/* ---------------- hero atmosphere & floats ---------------- */
const portraitStage = document.getElementById("portrait-stage");
const decryptLabel = document.querySelector(".portrait__decrypt");
const floatOpslin = document.querySelector(".float-card--opslin");
const floatLndry = document.querySelector(".float-card--lndry");
const codeLeft = document.querySelector(".hero__code--left");
const codeRight = document.querySelector(".hero__code--right");
let scanPhase = 0;
let decryptSeen = false;
ticker.add((now, dt) => {
  if (!portraitStage) return;
  scanPhase += dt * 0.00006;
  const scan = 24 + (Math.sin(scanPhase) * 0.5 + 0.5) * 52;
  portraitStage.style.setProperty("--scan", `${scan}%`);
  if (!finePointer) return;
  const px = pointer.nx - 0.5;
  const py = pointer.ny - 0.5;
  if (floatOpslin) floatOpslin.style.transform = `translate3d(${px * 18}px, ${py * 14}px, 0) rotate(2deg)`;
  if (floatLndry) floatLndry.style.transform = `translate3d(${px * -24}px, ${py * -18}px, 0) rotate(-5deg)`;
  if (codeLeft) codeLeft.style.transform = `translate3d(${px * -10}px, ${py * -8}px, 0)`;
  if (codeRight) codeRight.style.transform = `translate3d(${px * 12}px, ${py * 9}px, 0)`;
});
function markDecrypt() {
  if (decryptSeen) return;
  decryptSeen = true;
  decryptLabel?.classList.add("is-hidden");
}
window.addEventListener("pointermove", markDecrypt, { passive: true, once: true });

/* ---------------- skills map ---------------- */
const skillData = {
  web: { index: "01 / 07", title: "Websites & Web Apps", copy: "Interfaces that feel fast, accessible and inevitable — backed by APIs that hold up under real use.", tags: ["React", "Next.js", "TypeScript", "Fastify", "PostgreSQL"] },
  mobile: { index: "02 / 07", title: "Flutter Apps", copy: "Native-feeling iOS and Android products from one codebase, with realtime state and offline-safe flows.", tags: ["Flutter", "Dart", "Riverpod", "GoRouter", "Socket.IO"] },
  saas: { index: "03 / 07", title: "SaaS Platforms", copy: "Multi-tenant products with auth, roles, billing, dashboards and the operational surfaces around them.", tags: ["Multi-tenant", "Auth", "RBAC", "Billing", "Realtime"] },
  ai: { index: "04 / 07", title: "AI Agents", copy: "LLM-powered systems that take real work off real people: tool use, retrieval, evaluations and guardrails.", tags: ["LLM orchestration", "Tool calling", "RAG", "Evals"] },
  automation: { index: "05 / 07", title: "Automation", copy: "Queues, integrations, scheduled jobs and webhook pipelines that quietly remove the manual steps.", tags: ["BullMQ", "Webhooks", "Cron", "Integrations"] },
  devops: { index: "06 / 07", title: "DevOps & Cloud", copy: "Linux, Docker, Nginx, CI/CD and observability designed in from day one — not bolted on after an incident.", tags: ["Docker", "Linux", "Nginx", "AWS", "CI/CD"] },
  games: { index: "07 / 07", title: "Game Development", copy: "Interactive worlds and gameplay systems built with the same engineering discipline as production software.", tags: ["Godot", "GDScript", "Shaders", "Gameplay"] },
};
const skillMap = document.getElementById("skill-map");
const skillDetail = document.getElementById("skill-detail");
const skillTitle = document.getElementById("skill-title");
const skillCopy = document.getElementById("skill-copy");
const skillTags = document.getElementById("skill-tags");
const skillIndex = document.getElementById("skill-index");
const skillNodes = [...document.querySelectorAll(".node[data-skill]")];
const signal = document.getElementById("map-signal");
const mapFrame = document.querySelector(".map__frame");
const mapReticle = document.getElementById("map-reticle");
const mapReadout = document.getElementById("map-readout");
let activeSkill = "web";
let signalStart = performance.now();
let signalRaf = 0;
let mapInView = false;

function setSkillTags(tags) {
  if (!skillTags) return;
  skillTags.replaceChildren(
    ...tags.map((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      return li;
    })
  );
}

function activateSkill(key, animate = true) {
  const data = skillData[key];
  if (!data) return;
  activeSkill = key;
  skillNodes.forEach((node) => {
    const active = node.dataset.skill === key;
    node.classList.toggle("is-active", active);
    node.setAttribute("aria-pressed", active ? "true" : "false");
  });
  document.querySelectorAll(".map__wires path").forEach((path) => {
    path.classList.toggle("is-active", path.dataset.line === key);
  });
  if (!skillDetail) return;
  if (animate && !reduced) {
    skillTitle?.classList.add("is-swapping");
    skillCopy?.classList.add("is-swapping");
    skillTags?.classList.add("is-swapping");
    setTimeout(() => {
      if (skillIndex) skillIndex.textContent = data.index;
      if (skillTitle) skillTitle.textContent = data.title;
      if (skillCopy) skillCopy.textContent = data.copy;
      setSkillTags(data.tags);
      skillTitle?.classList.remove("is-swapping");
      skillCopy?.classList.remove("is-swapping");
      skillTags?.classList.remove("is-swapping");
    }, 170);
  } else {
    if (skillIndex) skillIndex.textContent = data.index;
    if (skillTitle) skillTitle.textContent = data.title;
    if (skillCopy) skillCopy.textContent = data.copy;
    setSkillTags(data.tags);
  }
  signalStart = performance.now();
}
skillNodes.forEach((node) => {
  node.addEventListener("click", () => activateSkill(node.dataset.skill));
  node.addEventListener("focus", () => activateSkill(node.dataset.skill));
  if (finePointer) node.addEventListener("pointerenter", () => activateSkill(node.dataset.skill));
});
if (skillNodes.length) {
  activateSkill(activeSkill, false);
  new IntersectionObserver(
    (entries) => {
      mapInView = entries.some((entry) => entry.isIntersecting);
      if (mapInView) skillMap?.classList.add("is-inview");
    },
    { rootMargin: "0% 0% -10% 0%" }
  ).observe(skillMap);
  const animateSignal = (now) => {
    if (!signal || !mapInView) {
      signalRaf = requestAnimationFrame(animateSignal);
      return;
    }
    const path = document.querySelector(`.map__wires path[data-line="${activeSkill}"]`);
    if (path) {
      const len = path.getTotalLength();
      const t = ((now - signalStart) / 2600) % 1;
      const point = path.getPointAtLength(t * len);
      signal.setAttribute("cx", point.x);
      signal.setAttribute("cy", point.y);
      signal.classList.add("is-live");
    }
    signalRaf = requestAnimationFrame(animateSignal);
  };
  if (!reduced && window.matchMedia("(min-width: 1024px)").matches) requestAnimationFrame(animateSignal);
  else signal?.remove();
}
if (mapFrame) {
  mapFrame.addEventListener("pointermove", (event) => {
    const rect = mapFrame.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mapFrame.style.setProperty("--rx", `${x}px`);
    mapFrame.style.setProperty("--ry", `${y}px`);
    if (mapReticle) {
      mapReticle.style.setProperty("--rx", `${x}px`);
      mapReticle.style.setProperty("--ry", `${y}px`);
    }
    if (mapReadout) {
      const nx = Math.round((x / rect.width) * 1000);
      const ny = Math.round((y / rect.height) * 700);
      mapReadout.textContent = `X ${String(nx).padStart(4, "0")} / Y ${String(ny).padStart(4, "0")}`;
    }
  });
}

/* ---------------- tech marquee ---------------- */
const techTrack = document.getElementById("tech-track");
let marqueeInView = false;
if (techTrack) {
  new IntersectionObserver((entries) => (marqueeInView = entries.some((entry) => entry.isIntersecting))).observe(techTrack);
  if (!reduced) {
    ticker.add((now) => {
      if (!marqueeInView) return;
      const half = techTrack.scrollWidth / 2;
      if (!half) return;
      const x = -((now * 0.035) % half);
      techTrack.style.transform = `translate3d(${x}px,0,0)`;
    });
  }
}

/* ---------------- selected work traverse ---------------- */
const workScroll = document.getElementById("work-scroll");
const workViewport = document.getElementById("work-viewport");
const workTrack = document.getElementById("work-track");
const workCurrent = document.getElementById("work-current");
const workProgress = document.getElementById("work-progress");
const workProgressFill = workProgress?.querySelector("i");
const workPrev = document.getElementById("work-prev");
const workNext = document.getElementById("work-next");
const projectCards = [...document.querySelectorAll(".project")];
let workTravel = 0;
let workActive = -1;
let workPin = document.querySelector(".work__pin");

function layoutWork() {
  if (!workScroll || !workTrack || !workViewport) return;
  if (!desktop.matches) {
    workScroll.style.height = "";
    workTrack.style.transform = "";
    workTrack.style.paddingLeft = "";
    workTrack.style.paddingRight = "";
    return;
  }
  const cardWidth = projectCards[0]?.offsetWidth || 0;
  const pad = Math.max(0, Math.round((workViewport.clientWidth - cardWidth) / 2));
  workTrack.style.paddingLeft = `${pad}px`;
  workTrack.style.paddingRight = `${pad}px`;
  workTravel = Math.max(0, workTrack.scrollWidth - workViewport.clientWidth);
  workScroll.style.height = `${Math.round(window.innerHeight + workTravel)}px`;
}
function setActiveProject(index) {
  if (!projectCards.length) return;
  index = Math.max(0, Math.min(projectCards.length - 1, index));
  if (index === workActive && projectCards[index].classList.contains("is-active")) return;
  workActive = index;
  projectCards.forEach((card, i) => card.classList.toggle("is-active", i === index));
  if (workCurrent) workCurrent.textContent = String(index + 1).padStart(2, "0");
  if (workPrev) workPrev.disabled = index === 0;
  if (workNext) workNext.disabled = index === projectCards.length - 1;
}
function updateWork() {
  if (!workScroll || !workTrack || !projectCards.length) return;
  const gate = workScroll.getBoundingClientRect();
  if (gate.top > window.innerHeight * 1.3 || gate.bottom < -window.innerHeight * 0.25) return;
  if (!desktop.matches) {
    if (workViewport) {
      const center = workViewport.scrollLeft + workViewport.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      projectCards.forEach((card, i) => {
        const c = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < distance) {
          distance = d;
          best = i;
        }
      });
      setActiveProject(best);
    }
    return;
  }
  const rect = workScroll.getBoundingClientRect();
  const max = Math.max(1, workScroll.offsetHeight - window.innerHeight);
  const p = clamp01(-rect.top / max);
  workTrack.style.transform = `translate3d(${-p * workTravel}px,0,0)`;
  if (workProgressFill) workProgressFill.style.width = `${p * 100}%`;
  const center = p * workTravel + workViewport.clientWidth / 2;
  let best = 0;
  let distance = Infinity;
  projectCards.forEach((card, i) => {
    const c = card.offsetLeft + card.offsetWidth / 2;
    const d = Math.abs(c - center);
    if (d < distance) {
      distance = d;
      best = i;
    }
  });
  setActiveProject(best);
}
function goToProject(index) {
  if (!workScroll || !desktop.matches) return;
  index = Math.max(0, Math.min(projectCards.length - 1, index));
  const max = Math.max(1, workScroll.offsetHeight - window.innerHeight);
  const top = workScroll.getBoundingClientRect().top + window.scrollY + (index / Math.max(1, projectCards.length - 1)) * max;
  scrollToTarget(top);
}
workPrev?.addEventListener("click", () => goToProject(workActive - 1));
workNext?.addEventListener("click", () => goToProject(workActive + 1));
workViewport?.addEventListener(
  "scroll",
  () => {
    if (!desktop.matches) updateWork();
  },
  { passive: true }
);
workTrack?.addEventListener("focusin", (event) => {
  const card = event.target.closest(".project");
  if (!card || !desktop.matches) return;
  const index = projectCards.indexOf(card);
  if (index >= 0 && index !== workActive) goToProject(index);
});
let workResizeTimer = 0;
const onWorkResize = () => {
  clearTimeout(workResizeTimer);
  workResizeTimer = window.setTimeout(() => {
    layoutWork();
    updateWork();
  }, 120);
};
window.addEventListener("resize", onWorkResize, { passive: true });
if ("ResizeObserver" in window && workTrack) new ResizeObserver(onWorkResize).observe(workTrack);
layoutWork();
setActiveProject(0);
updateWork();
ticker.add((now) => {
  if (now - (ticker.lastWork || 0) < 28) return;
  ticker.lastWork = now;
  updateWork();
});

/* ---------------- journey ---------------- */
const timeline = document.getElementById("timeline");
const timelineProgress = document.getElementById("timeline-progress");
const timelineMarker = document.getElementById("timeline-marker");
const chapters = [...document.querySelectorAll("[data-chapter]")];
let timelineInView = false;

if (timeline) {
  new IntersectionObserver((entries) => (timelineInView = entries.some((entry) => entry.isIntersecting)), { rootMargin: "10% 0% 10% 0%" }).observe(timeline);
  if (!reduced) {
    ticker.add((now) => {
      if (!timelineInView) return;
      if (now - (ticker.lastTimeline || 0) < 32) return;
      ticker.lastTimeline = now;
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp01((vh * 0.48 - rect.top) / Math.max(1, rect.height));
      if (timelineProgress) timelineProgress.style.height = `${p * 100}%`;
      if (timelineMarker) {
        timelineMarker.style.top = `${p * 100}%`;
        timelineMarker.style.setProperty("--tlr", `${p * 1800}deg`);
      }
      chapters.forEach((chapter) => {
        const cr = chapter.getBoundingClientRect();
        const cp = clamp01((vh - cr.top) / (vh + cr.height));
        const img = chapter.querySelector(".chapter__media > img");
        if (img && !chapter.querySelector(".chapter__media--phone")) {
          const shift = (cp - 0.5) * -42;
          img.style.transform = `translate3d(0, ${shift}px, 0)`;
        }
      });
    });
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0% 0% -12% 0%", threshold: 0.05 }
  );
  chapters.forEach((chapter) => io.observe(chapter));
  if (finePointer) {
    chapters.forEach((chapter) => {
      chapter.addEventListener("pointerenter", () => {
        chapters.forEach((c) => c.classList.toggle("is-hover", c === chapter));
        timeline.classList.add("is-focus");
      });
      chapter.addEventListener("pointerleave", () => {
        chapter.classList.remove("is-hover");
        timeline.classList.remove("is-focus");
      });
    });
  }
}

/* ---------------- AI network plate ---------------- */
(() => {
  const canvas = document.getElementById("ai-net");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let dpr = 1;
  let visible = false;
  const nodes = Array.from({ length: 19 }, (_, i) => ({
    x: 0.15 + ((i * 0.618) % 1) * 0.7,
    y: 0.16 + ((i * 0.381) % 1) * 0.68,
    r: 1 + (i % 3),
    phase: i * 0.7,
  }));
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.hypot(dx, dy) < 0.24) edges.push([i, j]);
    }
  }
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (time) => {
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    const positions = nodes.map((n, i) => ({
      x: n.x * w + Math.sin(time * 0.0003 + n.phase) * 11,
      y: n.y * h + Math.cos(time * 0.00025 + n.phase) * 9,
    }));
    ctx.lineWidth = 1;
    edges.forEach(([i, j], index) => {
      const a = positions[i];
      const b = positions[j];
      ctx.strokeStyle = `rgba(198,255,61,${0.08 + (index % 3) * 0.025})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });
    const pulse = (time * 0.00016) % 1;
    if (edges.length) {
      const [i, j] = edges[Math.floor(pulse * edges.length)];
      const a = positions[i];
      const b = positions[j];
      const t = (pulse * edges.length) % 1;
      ctx.fillStyle = "#c6ff3d";
      ctx.beginPath();
      ctx.arc(lerp(a.x, b.x, t), lerp(a.y, b.y, t), 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    positions.forEach((p, i) => {
      const active = (Math.sin(time * 0.0012 + i) + 1) / 2;
      ctx.fillStyle = i % 4 === 0 ? "#c6ff3d" : "rgba(242,244,238,0.55)";
      ctx.globalAlpha = 0.3 + active * 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodes[i].r, 0, Math.PI * 2);
      ctx.fill();
      if (i % 4 === 0) {
        ctx.strokeStyle = "rgba(198,255,61,0.28)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodes[i].r + 7 + active * 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  };
  new IntersectionObserver((entries) => (visible = entries.some((entry) => entry.isIntersecting)), { rootMargin: "10% 0% 10% 0%" }).observe(canvas);
  window.addEventListener("resize", resize, { passive: true });
  resize();
  if (reduced) draw(0);
  else
    ticker.add((now) => {
      if (!visible) return;
      if (now - (canvas._last || 0) < 40) return;
      canvas._last = now;
      draw(now);
    });
})();

/* ---------------- contact copy ---------------- */
const copyBtn = document.getElementById("copy-email");
copyBtn?.addEventListener("click", async () => {
  const email = copyBtn.dataset.email || "hello@shotlin.in";
  let copied = false;
  try {
    await navigator.clipboard.writeText(email);
    copied = true;
  } catch {
    const area = document.createElement("textarea");
    area.value = email;
    area.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.appendChild(area);
    area.select();
    try {
      copied = document.execCommand("copy");
    } catch {}
    area.remove();
  }
  if (!copied) return;
  copyBtn.classList.add("is-copied");
  copyBtn.setAttribute("aria-label", "Email copied to clipboard");
  setTimeout(() => {
    copyBtn.classList.remove("is-copied");
    copyBtn.removeAttribute("aria-label");
  }, 1800);
});

/* ---------------- init ---------------- */
prepareText();
prepareBlocks();
initExperience();

window.addEventListener("error", (event) => {
  if (!loaderFinished) {
    console.warn("Force-finishing loader after error", event.message);
    finishLoader(null);
  }
});
window.addEventListener("unhandledrejection", () => {
  if (!loaderFinished) finishLoader(null);
});

released.then(() => {
  const heroReveals = reveals.filter((record) => record.inHero);
  heroReveals.forEach((record) => triggerText(record, 0));
  const portrait = document.querySelector(".portrait");
  if (portrait) portrait.classList.add("is-revealed");
});
