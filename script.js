"use strict";

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
  nav?.classList.toggle("is-open");
});

// Close nav when clicking a link (mobile)
$$(".nav__link, .nav__cta", nav || document).forEach((a) => {
  a.addEventListener("click", () => {
    nav?.classList.remove("is-open");
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
// Footer Year
// =========================
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================
// Contact + Map Enhancements
// =========================

// Toast helper
const toastEl = document.getElementById("toast");
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("is-open");
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(() => toastEl.classList.remove("is-open"), 2200);
}

// Copy map link
const copyMapBtn = document.getElementById("copyMapLink");
copyMapBtn?.addEventListener("click", async () => {
  const link = "https://maps.app.goo.gl/CSfUKTBjY8PnpJjAA";
  try {
    await navigator.clipboard.writeText(link);
    toast("تم نسخ رابط الموقع ✅");
  } catch {
    toast("تعذر النسخ — انسخ الرابط يدويًا");
  }
});

// =========================
// Contact Form -> Email (temporary via mailto)
// =========================

// ضع بريد الاستقبال هنا (مؤقتًا)
const TO_EMAIL = "info@example.com"; // <-- غيّره لبريد الشركة الحقيقي

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function normalizePhoneForDisplay(phone) {
  // لا نغير الرقم كثيرًا—فقط تنظيف خفيف
  return phone.replace(/\s+/g, " ").trim();
}

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name")?.value.trim();
  const phoneRaw = document.getElementById("phone")?.value.trim();
  const type = document.getElementById("type")?.value;
  const message = document.getElementById("message")?.value.trim();

  const phone = normalizePhoneForDisplay(phoneRaw || "");

  if (!name || !phone || !message) {
    if (formNote) formNote.textContent = "رجاءً املأ جميع الحقول المطلوبة.";
    toast("رجاءً أكمل البيانات المطلوبة");
    return;
  }

  const subject = `طلب جديد - ${type} | شركة لبدة الليبية`;
  const body =
`مرحباً،

وصل طلب جديد عبر الموقع:

الاسم: ${name}
رقم الهاتف: ${phone}
نوع الطلب: ${type}

التفاصيل:
${message}

— تم الإرسال من نموذج الموقع`;

  // mailto (حل مؤقت: يفتح برنامج البريد لدى المستخدم)
  const mailtoUrl =
    `mailto:${encodeURIComponent(TO_EMAIL)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;

  if (formNote) formNote.textContent = "تم تجهيز البريد ✅ يرجى الضغط على إرسال داخل تطبيق البريد.";
  toast("تم فتح البريد برسالة جاهزة ✅");
});
