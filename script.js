// =========================
// Helpers
// =========================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// =========================
// Mobile Nav
// =========================
const navToggle = $("#navToggle");
const nav = $("#nav");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

// Close nav when clicking a link (mobile)
$$(".nav__link, .nav__cta", nav).forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });
});

// =========================
// Reveal on Scroll (IntersectionObserver)
// =========================
const revealEls = $$(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => io.observe(el));

// =========================
// Active Nav Link (Scroll Spy)
// =========================
const sections = $$("section[id]").filter((s) => s.id !== "top");
const navLinks = $$(".nav__link");

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");
      navLinks.forEach((l) => l.classList.remove("is-active"));
      const active = navLinks.find((l) => l.getAttribute("href") === `#${id}`);
      active?.classList.add("is-active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
);

sections.forEach((s) => spy.observe(s));

// =========================
// Tabs (Brands Section)
// =========================
const tabs = $$(".tab");
const panels = $$(".panel");

tabs.forEach((t) => {
  t.addEventListener("click", () => {
    const target = t.dataset.tab;

    tabs.forEach((x) => x.classList.remove("is-active"));
    t.classList.add("is-active");

    panels.forEach((p) => p.classList.remove("is-active"));
    $(`#${target}`)?.classList.add("is-active");
  });
});

// =========================
// Animated Counters (Stats)
// =========================
const counters = $$("[data-counter]");
let countersStarted = false;

function animateCounter(el, to) {
  const duration = 1100; // ms
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const val = Math.round(start + (to - start) * eased);
    el.textContent = val.toString();
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsSection = $("#stats");
if (statsSection) {
  const statsObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          counters.forEach((c) => {
            const to = Number(c.getAttribute("data-counter") || "0");
            animateCounter(c, to);
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  statsObs.observe(statsSection);
}

// =========================
// Fake Form Submit (Front-end only)
// =========================
const fakeSubmit = $("#fakeSubmit");
const formNote = $("#formNote");

fakeSubmit?.addEventListener("click", () => {
  if (!formNote) return;
  formNote.textContent = "تم الاستلام (واجهة فقط). اربط النموذج بخدمة إرسال لاحقاً.";
});

// =========================
// Footer Year
// =========================
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
