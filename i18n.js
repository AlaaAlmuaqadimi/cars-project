"use strict";

/**
 * i18n.js (Clean)
 * - Globe language switcher (AR/EN) with dropdown
 * - Auto RTL/LTR + <html lang/dir> + html.is-ltr class
 * - Translates elements with:
 *    data-i18n="key"                 => textContent
 *    data-i18n-placeholder="key"     => placeholder
 *    data-i18n-alt="key"             => alt
 *    data-i18n-title="key"           => title
 *    data-i18n-aria="key"            => aria-label
 *    data-i18n-content="key"         => meta[name="description"] content
 *    data-i18n-select="key"          => <select> options (array)
 */

const I18N_STORAGE_KEY = "site_lang";
const SUPPORTED_LANGS = ["ar", "en"];

/* =========================
   Dictionary (keep as-is)
   ========================= */
const dict = {
  ar: {
    meta: {
      title: "شركة لبدة الليبية | استيراد السيارات وقطع الغيار",
      description:
        "شركة لبدة الليبية لاستيراد السيارات وقطع الغيار - خدمات احترافية، توريد موثوق، وقطع أصلية.",
    },
    a11y: {
      goTop: "الانتقال إلى الأعلى",
      openMenu: "فتح القائمة",
      backTop: "العودة للأعلى",
      logoAlt: "شركة لبدة الليبية",
      mapTitle: "خريطة شركة لبدة الليبية",
    },
    brand: {
      name: "شركة لبدة الليبية",
      tagline: "لاستيراد السيارات وقطع الغيار",
      taglineShort: "استيراد السيارات وقطع الغيار",
    },
    nav: {
      home: "الرئيسية",
      about: "نبذة",
      why: "لماذا نحن",
      services: "الخدمات",
      process: "آلية العمل",
      location: "الموقع",
      contact: "التواصل",
      cta: "تواصل معنا",
    },
    hero: {
      badge: "توريد موثوق • قطع أصلية • متابعة حتى التسليم",
      title1: "استيراد سيارات وقطع غيار",
      title2: "بمعايير احترافية",
      text:
        "شركة لبدة الليبية توفر لك حلول استيراد فعّالة، شفافة، وسريعة — من اختيار السيارة أو القطعة إلى الشحن والمتابعة وخدمة ما بعد البيع.",
      btnServices: "استعرض الخدمات",
      btnQuality: "كيف نضمن الجودة؟",
      card1: { title: "فحص قبل الشحن", text: "تدقيق مواصفات وحالة" },
      card2: { title: "سلاسة الإجراءات", text: "خطوات واضحة ومتابعة" },
      card3: { title: "توريد قطع أصلية", text: "خيارات متعددة ومضمونة" },
    },
    about: {
      title: "نبذة عن الشركة",
      desc:
        "نركز على تقديم تجربة استيراد واضحة، ونتعامل بمعايير احترافية تعكس الثقة والاستمرارية.",
      visionTitle: "رؤيتنا",
      visionText:
        "أن نكون الخيار الأول في توريد السيارات وقطع الغيار عبر نموذج خدمة يعتمد على الشفافية والجودة وسرعة الاستجابة.",
      missionTitle: "رسالتنا",
      missionText:
        "توفير حلول استيراد عملية، مع متابعة دقيقة للطلب وتقديم خيارات متعددة تناسب احتياجات العملاء.",
      valuesTitle: "قيمنا",
      values: {
        1: "الالتزام بالمواعيد قدر الإمكان",
        2: "مصداقية في المواصفات والتسعير",
        3: "جودة في اختيار الموردين",
        4: "تواصل واضح طوال رحلة الطلب",
      },
    },
    why: {
      title: "لماذا تختارنا؟",
      desc:
        "لأنك تريد تقليل المخاطر في الاستيراد: مواصفات واضحة، موردين موثوقين، وقرارات مبنية على فحص ومتابعة.",
      f1: { title: "تقليل المخاطر", text: "فحص وتدقيق معلومات قبل تأكيد الطلب لتقليل المفاجآت." },
      f2: { title: "توريد منظم", text: "خط سير واضح: اختيار → تأكيد → شحن → تتبع → تسليم." },
      f3: { title: "قطع غيار متنوعة", text: "توفير خيارات (أصلية/بدائل) بحسب المطلوب وبشفافية." },
      f4: { title: "تواصل سريع", text: "استجابة منظمة عبر الهاتف/الواتساب وتحديثات مستمرة." },
    },
    services: {
      title: "خدماتنا",
      desc:
        "باقات خدمات مصممة لتناسب احتياجات الأفراد والتجار — من طلب واحد إلى توريد متكرر.",
      s1: {
        title: "استيراد السيارات",
        text: "اختيار سيارات حسب الميزانية والمواصفات المطلوبة مع متابعة كاملة.",
        t1: "مطابقة مواصفات",
        t2: "متابعة الشحن",
        t3: "تحديثات دورية",
      },
      s2: {
        title: "قطع الغيار",
        text: "توريد قطع غيار مع خيارات متعددة وتوضيح الفروقات قبل الشراء.",
        t1: "أصلية/بدائل",
        t2: "تحديد رقم القطعة",
        t3: "توافقية دقيقة",
      },
      s3: {
        title: "خدمة طلبات التجار",
        text: "تنسيق طلبات متعددة وتوريد دوري للتجار مع آلية متابعة واضحة.",
        t1: "تجميع شحنات",
        t2: "تنظيم فواتير",
        t3: "تحديث حالة الطلب",
      },
    },
    process: {
      title: "كيف نعمل",
      desc: "خطوات قصيرة وواضحة تقلل أي التباس وتضمن أنك فاهم أين وصل طلبك.",
      p1: { title: "تحديد الطلب", text: "تحديد السيارة/القطعة + المواصفات + الميزانية." },
      p2: { title: "مراجعة وتأكيد", text: "تأكيد المواصفات وتوضيح الخيارات قبل اعتماد الطلب." },
      p3: { title: "شحن وتتبع", text: "بدء الشحن مع تحديثات حالة الشحنة حتى الوصول." },
      p4: { title: "تسليم ودعم", text: "تسليم الطلب وتقديم دعم بخصوص أي استفسار لاحق." },
    },
    location: {
      title: "موقعنا على الخريطة",
      desc:
        "زورنا في المكتب أو افتح الموقع على خرائط Google للحصول على الاتجاهات مباشرة.",
      company: "شركة لبدة الليبية",
      address: "شركة لبدة الليبية، استيراد السيارات وقطع الغيار، طرابلس، ليبيا",
      phoneLabel: "الهاتف",
      daysLabel: "أيام العمل",
      daysValue: "السبت – الخميس",
      timeLabel: "الوقت",
      timeValue: "09:00 – 17:00",
      openMaps: "فتح الاتجاهات على Google Maps",
      whatsappTitle: "واتساب",
      fastReply: "رد سريع",
      whatsappText: "مراسلة مباشرة على واتساب لتسريع الطلبات والاستفسارات.",
      openWhatsapp: "فتح واتساب",
    },
    contact: {
      title: "معلومات التواصل",
      desc: "املأ نموذج التواصل وسنقوم بالرد عليك في أقرب وقت ممكن.",
      formTitle: "نموذج تواصل سريع",
      formText: "يرجى ملء النموذج أدناه وسنعود إليك في أقرب وقت ممكن.",
      nameLabel: "الاسم",
      namePlaceholder: "اكتب اسمك",
      phoneLabel: "رقم الهاتف",
      phonePlaceholder: "مثال: 091xxxxxxx",
      typeLabel: "الطلب",
      typeOptions: ["استيراد سيارة", "قطع غيار", "طلب تاجر / كميات", "استفسار عام"],
      msgLabel: "الرسالة",
      msgPlaceholder: "اكتب التفاصيل... (موديل/سنة/رقم شاصي إن وجد)",
      submit: "إرسال الطلب",
    },
    footer: {
      motto: "جودة • شفافية • متابعة — هدفنا تجربة استيراد سلسة وواضحة.",
      linksTitle: "روابط",
      links: { about: "نبذة", services: "الخدمات", process: "كيف نعمل", location: "الموقع" },
      contactTitle: "تواصل",
      googleMaps: "Google Maps",
      rights: "شركة لبدة الليبية. جميع الحقوق محفوظة.",
    },
  },

  en: {
    meta: {
      title: "Lebda Libya Company | Car & Spare Parts Import",
      description:
        "Lebda Libya Company for car and spare parts import — professional services, reliable supply, and genuine parts.",
    },
    a11y: {
      goTop: "Go to top",
      openMenu: "Open menu",
      backTop: "Back to top",
      logoAlt: "Lebda Libya Company",
      mapTitle: "Lebda Libya Company Map",
    },
    brand: {
      name: "Lebda Libya Company",
      tagline: "Car & Spare Parts Import",
      taglineShort: "Car & Spare Parts Import",
    },
    nav: {
      home: "Home",
      about: "About",
      why: "Why Us",
      services: "Services",
      process: "How It Works",
      location: "Location",
      contact: "Contact",
      cta: "Contact Us",
    },
    hero: {
      badge: "Reliable Supply • Genuine Parts • Support Until Delivery",
      title1: "Import Cars & Spare Parts",
      title2: "With Professional Standards",
      text:
        "Lebda Libya Company provides efficient, transparent, and fast import solutions — from selecting the car or part to shipping, tracking, and after-sales support.",
      btnServices: "View Services",
      btnQuality: "How do we ensure quality?",
      card1: { title: "Pre-shipment inspection", text: "Specs & condition check" },
      card2: { title: "Smooth procedures", text: "Clear steps & tracking" },
      card3: { title: "Genuine parts supply", text: "Multiple verified options" },
    },
    about: {
      title: "About the Company",
      desc:
        "We focus on a clear import experience and operate with professional standards that build trust and consistency.",
      visionTitle: "Our Vision",
      visionText:
        "To become the first choice for supplying cars and spare parts through a service model based on transparency, quality, and responsiveness.",
      missionTitle: "Our Mission",
      missionText:
        "Provide practical import solutions with close order follow-up and multiple options tailored to customer needs.",
      valuesTitle: "Our Values",
      values: {
        1: "Commitment to timelines whenever possible",
        2: "Honesty in specs and pricing",
        3: "Quality supplier selection",
        4: "Clear communication throughout the journey",
      },
    },
    why: {
      title: "Why Choose Us?",
      desc:
        "Because you want less risk in importing: clear specs, trusted suppliers, and decisions based on inspection and follow-up.",
      f1: { title: "Lower risk", text: "Verify details before confirmation to reduce surprises." },
      f2: { title: "Organized supply", text: "Clear flow: Select → Confirm → Ship → Track → Deliver." },
      f3: { title: "Varied spare parts", text: "Original/alternative options with transparent differences." },
      f4: { title: "Fast communication", text: "Structured support via phone/WhatsApp with updates." },
    },
    services: {
      title: "Our Services",
      desc:
        "Service packages designed for individuals and traders — from single orders to recurring supply.",
      s1: {
        title: "Car Import",
        text: "Select cars based on budget and required specs with full follow-up.",
        t1: "Spec matching",
        t2: "Shipping tracking",
        t3: "Regular updates",
      },
      s2: {
        title: "Spare Parts",
        text: "Source parts with multiple options and clear differences before purchase.",
        t1: "Original/Alternative",
        t2: "Part number lookup",
        t3: "Precise compatibility",
      },
      s3: {
        title: "Trader Orders",
        text: "Coordinate multiple orders and recurring supply with a clear tracking process.",
        t1: "Shipment consolidation",
        t2: "Invoice organization",
        t3: "Order status updates",
      },
    },
    process: {
      title: "How We Work",
      desc: "Short, clear steps that remove confusion and keep you updated.",
      p1: { title: "Define request", text: "Car/part + specs + budget." },
      p2: { title: "Review & confirm", text: "Confirm specs and options before approval." },
      p3: { title: "Ship & track", text: "Start shipping with updates until arrival." },
      p4: { title: "Delivery & support", text: "Deliver and provide help for any follow-up questions." },
    },
    location: {
      title: "Find Us on the Map",
      desc: "Visit our office or open Google Maps to get directions instantly.",
      company: "Lebda Libya Company",
      address: "Lebda Libya Company, Car & Spare Parts Import, Tripoli, Libya",
      phoneLabel: "Phone",
      daysLabel: "Working Days",
      daysValue: "Saturday – Thursday",
      timeLabel: "Hours",
      timeValue: "09:00 – 17:00",
      openMaps: "Open directions in Google Maps",
      whatsappTitle: "WhatsApp",
      fastReply: "Fast reply",
      whatsappText: "Message us on WhatsApp for faster orders and inquiries.",
      openWhatsapp: "Open WhatsApp",
    },
    contact: {
      title: "Contact Information",
      desc: "Fill the form and we will get back to you as soon as possible.",
      formTitle: "Quick Contact Form",
      formText: "Please fill out the form below and we will respond shortly.",
      nameLabel: "Name",
      namePlaceholder: "Type your name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Example: 091xxxxxxx",
      typeLabel: "Request Type",
      typeOptions: ["Car Import", "Spare Parts", "Trader / Bulk Orders", "General Inquiry"],
      msgLabel: "Message",
      msgPlaceholder: "Write details... (model/year/VIN if available)",
      submit: "Send Request",
    },
    footer: {
      motto: "Quality • Transparency • Follow-up — a smooth and clear import experience.",
      linksTitle: "Links",
      links: { about: "About", services: "Services", process: "How It Works", location: "Location" },
      contactTitle: "Contact",
      googleMaps: "Google Maps",
      rights: "Lebda Libya Company. All rights reserved.",
    },
  },
};

/* =========================
   Helpers
   ========================= */
function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);
}

function setHtmlLangDir(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  html.classList.toggle("is-ltr", lang === "en");
}

function getInitialLang() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (SUPPORTED_LANGS.includes(saved)) return saved;

  const browser = (navigator.language || "ar").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(browser) ? browser : "ar";
}

/* =========================
   Apply translations
   ========================= */
function applyTranslations(lang) {
  const t = dict[lang] || dict.ar;

  // data-i18n => textContent
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = getByPath(t, key);
    if (typeof val === "string") el.textContent = val;
  });

  // placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = getByPath(t, key);
    if (typeof val === "string") el.setAttribute("placeholder", val);
  });

  // alt
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    const val = getByPath(t, key);
    if (typeof val === "string") el.setAttribute("alt", val);
  });

  // title attr
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const val = getByPath(t, key);
    if (typeof val === "string") el.setAttribute("title", val);
  });

  // aria-label
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const val = getByPath(t, key);
    if (typeof val === "string") el.setAttribute("aria-label", val);
  });

  // meta content
  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const key = el.getAttribute("data-i18n-content");
    const val = getByPath(t, key);
    if (typeof val === "string") el.setAttribute("content", val);
  });

  // select options (array)
  document.querySelectorAll("[data-i18n-select]").forEach((el) => {
    const key = el.getAttribute("data-i18n-select");
    const val = getByPath(t, key);
    if (!Array.isArray(val) || el.tagName !== "SELECT") return;

    const oldIndex = el.selectedIndex;
    el.innerHTML = val.map((opt) => `<option>${opt}</option>`).join("");
    el.selectedIndex = Math.min(oldIndex, val.length - 1);
  });

  // Document title
  const titleKeyEl = document.querySelector("title[data-i18n]");
  if (!titleKeyEl && t.meta?.title) document.title = t.meta.title;

  setHtmlLangDir(lang);
  updateLangMenuUI(lang);
}

/* =========================
   Globe menu UI
   ========================= */
function updateLangMenuUI(lang) {
  document.querySelectorAll(".lang-item").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });

  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.setAttribute("aria-label", lang === "en" ? "Change language (EN)" : "تغيير اللغة (AR)");
    btn.setAttribute("data-lang", lang === "en" ? "EN" : "AR"); // ✅
  }
}


function closeLangMenu() {
  const wrap = document.getElementById("langSwitch");
  const btn = document.getElementById("langBtn");
  wrap?.classList.remove("is-open");
  btn?.setAttribute("aria-expanded", "false");
}


document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("langSwitch");
  const btn = document.getElementById("langBtn");

  // Apply initial language once
  const initial = getInitialLang();
  applyTranslations(initial);

  // If globe UI is not present, just stop here (translations still work)
  if (!wrap || !btn) return;

  // منع ظهور أي قائمة (حتى لو موجودة بالـ HTML)
  wrap.classList.remove("is-open");
  btn.setAttribute("aria-expanded", "false");

  // Toggle language مباشرة عند الضغط على الكوكب
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const current =
      localStorage.getItem(I18N_STORAGE_KEY) ||
      document.documentElement.lang ||
      "ar";

    const next = current === "ar" ? "en" : "ar";

    localStorage.setItem(I18N_STORAGE_KEY, next);
    applyTranslations(next);

    // Close mobile nav (optional)
    document.getElementById("nav")?.classList.remove("is-open");
  });
});
