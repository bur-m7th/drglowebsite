/* dr.glo site content — edit products, partners and translations here. */

/* Pages under /ar/ set data-root="../" so asset paths resolve from either page. */
const ROOT = typeof document !== "undefined" ? document.documentElement.dataset.root || "" : "";
const IMG = ROOT + "assets/img/products/";

const CATEGORIES = {
  laundry: { en: "Laundry", ar: "الغسيل" },
  care: { en: "Laundry care", ar: "العناية بالملابس" },
  scent: { en: "Scent boosters", ar: "معززات الرائحة" },
  home: { en: "Home", ar: "المنزل" }
};

const PRODUCTS = [
  {
    id: "4in1", cat: "laundry", img: "4in1-laundry-sheets", tint: "#bcd6f3",
    name: { en: "4-in-1 Laundry Detergent Sheets", ar: "أوراق غسيل ٤ في ١" },
    meta: { en: "50 loads · Scent free", ar: "٥٠ غسلة · بدون رائحة" },
    tag: { en: "Best seller", ar: "الأكثر مبيعاً" },
    desc: {
      en: "Our signature sheet. A plant-based Middle East formula with advanced enzymes that replaces liquid and powder detergent — one sheet, one load.",
      ar: "ورقتنا المميزة. تركيبة نباتية مخصصة للشرق الأوسط مع إنزيمات متطورة تستبدل المنظفات السائلة والبودرة — ورقة واحدة لكل غسلة."
    },
    points: {
      en: ["Powerful cleaning", "Stain removal", "Brightens fabrics", "Gentle on clothes"],
      ar: ["تنظيف قوي", "إزالة البقع", "يبرز إشراق الأقمشة", "لطيف على الملابس"]
    },
    how: {
      en: "Place one sheet in the drum before adding clothes. Use two for large or heavily soiled loads.",
      ar: "ضع ورقة واحدة في حوض الغسالة قبل إضافة الملابس. استخدم ورقتين للأحمال الكبيرة أو شديدة الاتساخ."
    }
  },
  {
    id: "5in1-flower", cat: "laundry", img: "5in1-azhar-al-reef", tint: "#f6c9dd",
    name: { en: "5-in-1 Laundry Sheets — Azhar Al Reef", ar: "أوراق غسيل ٥ في ١ — أزهار الريف" },
    meta: { en: "50 loads · Flower scent · Solid enzyme", ar: "٥٠ غسلة · عطر الزهور · إنزيم صلب" },
    desc: {
      en: "Everything in the 4-in-1, plus a strong, long-lasting floral fragrance inspired by countryside blossoms.",
      ar: "كل مزايا ٤ في ١، مع عطر زهري قوي يدوم طويلاً مستوحى من أزهار الريف."
    },
    points: {
      en: ["Prevents discolouration", "Inhibits bacteria", "Efficient cleaning", "Strong, long-lasting fragrance"],
      ar: ["يمنع بهتان الألوان", "يحد من البكتيريا", "تنظيف فعال", "عطر قوي يدوم طويلاً"]
    },
    how: {
      en: "Place one sheet in the drum before adding clothes.",
      ar: "ضع ورقة واحدة في حوض الغسالة قبل إضافة الملابس."
    }
  },
  {
    id: "5in1-grape", cat: "laundry", img: "5in1-grape", tint: "#d9c8f0",
    name: { en: "5-in-1 Laundry Sheets — Grape", ar: "أوراق غسيل ٥ في ١ — العنب" },
    meta: { en: "50 loads · Grape scent · Solid enzyme", ar: "٥٠ غسلة · عطر العنب · إنزيم صلب" },
    desc: {
      en: "Deep-cleaning technology with a juicy, fresh grape fragrance that lingers long after the wash.",
      ar: "تكنولوجيا التنظيف العميق مع عطر العنب المنعش الذي يدوم بعد الغسيل."
    },
    points: {
      en: ["Prevents discolouration", "Inhibits bacteria", "Efficient cleaning", "Strong, long-lasting fragrance"],
      ar: ["يمنع بهتان الألوان", "يحد من البكتيريا", "تنظيف فعال", "عطر قوي يدوم طويلاً"]
    },
    how: {
      en: "Place one sheet in the drum before adding clothes.",
      ar: "ضع ورقة واحدة في حوض الغسالة قبل إضافة الملابس."
    }
  },
  {
    id: "white-magic", cat: "care", img: "white-magic", tint: "#e6eef7",
    name: { en: "White Magic", ar: "وايت ماجيك" },
    meta: { en: "28 sheets · Upgraded formula · White clothes only", ar: "٢٨ ورقة · تركيبة مطورة · للملابس البيضاء فقط" },
    tag: { en: "Upgraded", ar: "مطوّر" },
    desc: {
      en: "The white clothes saviour. Improved efficiency for safer, more radiant whiteness — perfect for thobes and white linens.",
      ar: "منقذ الملابس البيضاء. أداء أعلى وبياض أكثر إشراقاً بأمان — مثالي للثياب والمفارش البيضاء."
    },
    points: {
      en: ["More radiant whiteness", "Improved efficiency", "Safe on fabrics", "Made only for white clothes"],
      ar: ["بياض أكثر إشراقاً", "كفاءة محسّنة", "آمن على الأقمشة", "مخصص للملابس البيضاء فقط"]
    },
    how: {
      en: "Add one sheet to a white-only load.",
      ar: "أضف ورقة واحدة مع حمولة الملابس البيضاء فقط."
    }
  },
  {
    id: "black-magic", cat: "care", img: "black-magic", tint: "#3a4555",
    name: { en: "Black Magic", ar: "بلاك ماجيك" },
    meta: { en: "20 sheets · Black clothes only", ar: "٢٠ ورقة · للملابس السوداء فقط" },
    desc: {
      en: "A deepening-black sheet that keeps your black clothes rich and dark, wash after wash.",
      ar: "ورقة مجددة للون الأسود تحافظ على عمق وسواد ملابسك غسلة بعد غسلة."
    },
    points: {
      en: ["Restores deep black", "Prevents discolouration", "Long-lasting results", "Great value"],
      ar: ["يجدد اللون الأسود", "يحمي من البهتان", "نتائج تدوم", "اقتصادي"]
    },
    how: {
      en: "Add one sheet to a black-only load.",
      ar: "أضف ورقة واحدة مع حمولة الملابس السوداء فقط."
    }
  },
  {
    id: "color-catcher", cat: "care", img: "color-catcher-sheets", tint: "#cdeae3",
    name: { en: "Laundry Colour Catcher Sheets", ar: "أوراق التقاط الألوان" },
    meta: { en: "30 sheets · Premium care", ar: "٣٠ ورقة · عناية فائقة" },
    desc: {
      en: "Traps loose dyes in the water so colours don't run — wash mixed loads together with confidence.",
      ar: "تلتقط الأصباغ الحرة في الماء فلا تنتقل الألوان — اغسل الملابس المختلطة معاً بثقة."
    },
    points: {
      en: ["Prevents colour runs", "Wash mixed loads together", "Keeps colours true", "Saves time and water"],
      ar: ["يمنع انتقال الألوان", "اغسل الألوان معاً", "يحافظ على الألوان", "يوفر الوقت والماء"]
    },
    how: {
      en: "Add one sheet with your detergent sheet to any mixed-colour load.",
      ar: "أضف ورقة واحدة مع ورقة الغسيل لأي حمولة ألوان مختلطة."
    }
  },
  {
    id: "booster-purple", cat: "scent", img: "scent-booster-purple-garden", tint: "#d7c3ec",
    name: { en: "In-Wash Scent Booster — Purple Garden", ar: "معزز رائحة الغسيل — الحديقة البنفسجية" },
    meta: { en: "275 g · Up to 12 weeks of freshness", ar: "٢٧٥ غ · انتعاش يدوم حتى ١٢ أسبوعاً" },
    desc: {
      en: "Fragrance beads that soften and scent your laundry with a lavender-and-blossom bouquet.",
      ar: "حبيبات عطرية تنعّم الغسيل وتعطّره بباقة من الخزامى والأزهار."
    },
    points: {
      en: ["Long-lasting freshness", "Softens fabrics", "Works with any detergent"],
      ar: ["انتعاش يدوم طويلاً", "ينعّم الأقمشة", "يعمل مع أي منظف"]
    },
    how: {
      en: "Add a capful of beads to the drum before washing.",
      ar: "أضف غطاءً من الحبيبات إلى الحوض قبل الغسيل."
    }
  },
  {
    id: "booster-mysteries", cat: "scent", img: "scent-booster-mysteries-garden", tint: "#f2d6d0",
    name: { en: "In-Wash Scent Booster — Mysteries Garden", ar: "معزز رائحة الغسيل — حديقة الأسرار" },
    meta: { en: "275 g · Up to 12 weeks of freshness", ar: "٢٧٥ غ · انتعاش يدوم حتى ١٢ أسبوعاً" },
    desc: {
      en: "A soft, romantic rose fragrance that turns every wash into a garden.",
      ar: "عطر وردي ناعم يحوّل كل غسلة إلى حديقة."
    },
    points: {
      en: ["Long-lasting freshness", "Softens fabrics", "Works with any detergent"],
      ar: ["انتعاش يدوم طويلاً", "ينعّم الأقمشة", "يعمل مع أي منظف"]
    },
    how: {
      en: "Add a capful of beads to the drum before washing.",
      ar: "أضف غطاءً من الحبيبات إلى الحوض قبل الغسيل."
    }
  },
  {
    id: "booster-green", cat: "scent", img: "scent-booster-green", tint: "#c5e3cf",
    name: { en: "In-Wash Scent Booster — Aurora Forest", ar: "معزز رائحة الغسيل — غابة الشفق" },
    meta: { en: "275 g · Up to 12 weeks of freshness", ar: "٢٧٥ غ · انتعاش يدوم حتى ١٢ أسبوعاً" },
    desc: {
      en: "A crisp, green, leafy freshness for laundry that smells like the outdoors.",
      ar: "انتعاش أخضر منعش يمنح الغسيل رائحة الطبيعة."
    },
    points: {
      en: ["Long-lasting freshness", "Softens fabrics", "Works with any detergent"],
      ar: ["انتعاش يدوم طويلاً", "ينعّم الأقمشة", "يعمل مع أي منظف"]
    },
    how: {
      en: "Add a capful of beads to the drum before washing.",
      ar: "أضف غطاءً من الحبيبات إلى الحوض قبل الغسيل."
    }
  },
  {
    id: "dishwasher", cat: "home", img: "dishwasher-sheets", tint: "#f4e7a6",
    name: { en: "Automatic Dishwasher Sheets", ar: "أوراق غسالة الصحون" },
    meta: { en: "30 loads · Fresh lemon · Solid enzyme", ar: "٣٠ غسلة · ليمون منعش · إنزيم صلب" },
    tag: { en: "Eco friendly", ar: "صديق للبيئة" },
    desc: {
      en: "Sparkling dishes with no pods, powders or plastic tubs — just drop in a sheet with a fresh lemon finish.",
      ar: "صحون لامعة بدون كبسولات أو بودرة — فقط ضع ورقة واحدة واستمتع بلمسة الليمون المنعشة."
    },
    points: {
      en: ["Cuts through grease", "Fresh lemon scent", "Solid enzyme formula", "Eco friendly"],
      ar: ["يزيل الدهون", "رائحة الليمون المنعشة", "تركيبة إنزيم صلب", "صديق للبيئة"]
    },
    how: {
      en: "Fold and place one sheet in the detergent compartment, then run your usual cycle.",
      ar: "اطوِ الورقة وضعها في حجرة المنظف، ثم شغّل الدورة المعتادة."
    }
  },
  {
    id: "floor", cat: "home", img: "floor-sheets", tint: "#ddd3ef",
    name: { en: "Floor Detergent Sheets", ar: "أوراق تنظيف الأرضيات" },
    meta: { en: "36 sheets · Lavender · New formula", ar: "٣٦ ورقة · خزامى · تركيبة جديدة" },
    desc: {
      en: "Super-clean floors in one sheet. Dissolve in a bucket of water for a fresh lavender mop.",
      ar: "نظافة فائقة للأرضيات بورقة واحدة. أذبها في دلو ماء لمسح منعش برائحة الخزامى."
    },
    points: {
      en: ["For sealed and unsealed floors", "Protects joints and edges from moisture", "Fresh lavender scent"],
      ar: ["للأرضيات المعالجة وغير المعالجة", "يحمي الفواصل والحواف من الرطوبة", "رائحة الخزامى المنعشة"]
    },
    how: {
      en: "Dissolve one sheet in a bucket of water and mop as usual.",
      ar: "أذب ورقة واحدة في دلو ماء وامسح كالمعتاد."
    }
  },
  {
    id: "toilet", cat: "home", img: "toilet-bowl-sheets", tint: "#d3e6f3",
    name: { en: "Toilet Bowl Cleaner Sheets", ar: "أوراق تنظيف المرحاض" },
    meta: { en: "36 sheets · Love Forest", ar: "٣٦ ورقة · غابة الحب" },
    desc: {
      en: "A cleaning and deep-sanitising formula — drop a sheet in the bowl for freshness with every flush.",
      ar: "تركيبة تنظيف وتعقيم عميقة — ضع ورقة في المرحاض لانتعاش مع كل تدفق."
    },
    points: {
      en: ["Deep cleaning", "Freshness with every flush", "Helps prevent limescale"],
      ar: ["تنظيف عميق", "انتعاش مع كل تدفق", "يساعد على منع الترسبات الكلسية"]
    },
    how: {
      en: "Drop one sheet in the bowl, wait a few minutes, brush and flush.",
      ar: "ضع ورقة في المرحاض، انتظر بضع دقائق، ثم نظّف بالفرشاة واسحب الماء."
    }
  }
];

/* Inline SVG icons (24×24). Outline icons inherit the text colour. */
const SHIRT = "M8 3 3 6l2 4 2-1v11h10V9l2 1 2-4-5-3c0 2-2 3-4 3S8 5 8 3Z";
const SPARK = (x, y, s) => `M${x} ${y - s}c${s * .15} ${s * .7} ${s * .3} ${s * .85} ${s} ${s}c-${s * .7} ${s * .15}-${s * .85} ${s * .3}-${s} ${s}c-${s * .15}-${s * .7}-${s * .3}-${s * .85}-${s}-${s}c${s * .7}-${s * .15} ${s * .85}-${s * .3} ${s}-${s}Z`;
const ICONS = {
  shirt: `<path d="${SHIRT}"/>`,
  dishes: `<circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2.5"/><path d="M3 3v5a1.5 1.5 0 0 0 3 0V3M4.5 9.5V21M21 3c-1.7 0-3 2-3 5v4h3m0-9v18"/>`,
  mop: `<path d="M16 3 11 14.5"/><path d="M5 21l2.5-6.5h7L17 21Z"/><path d="M8.5 18h7"/>`,
  toilet: `<path d="M7 3h6v7H7z"/><path d="M4 10h16c0 4-3 6.5-6 7l1 4H9l1-4c-3-.5-6-3-6-7Z"/>`,
  mix: `<g stroke="none" opacity=".9"><circle cx="9" cy="9.5" r="5" fill="#ff8fb8"/><circle cx="15" cy="9.5" r="5" fill="#7fc8ff"/><circle cx="12" cy="15" r="5" fill="#ffd36b"/></g>`,
  whites: `<path d="${SHIRT}" fill="#fff"/><path d="${SPARK(19.5, 15.5, 2.5)}" fill="#ffd36b" stroke-width="1.2"/>`,
  blacks: `<path d="${SHIRT}" fill="#1b2340"/>`,
  basket: `<path d="M3 10h18l-2 10H5Z"/><path d="M7 10l3-6M17 10l-3-6M9 13.5v3.5M12 13.5v3.5M15 13.5v3.5"/>`,
  drop: `<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9.5 14.5A2.5 2.5 0 0 0 12 17"/>`,
  flower: `<g fill="#ffb3d1" stroke="none"><circle cx="12" cy="6.8" r="3.4"/><circle cx="16.8" cy="10.3" r="3.4"/><circle cx="14.9" cy="15.9" r="3.4"/><circle cx="9.1" cy="15.9" r="3.4"/><circle cx="7.2" cy="10.3" r="3.4"/></g><circle cx="12" cy="11.8" r="2.6" fill="#ffd36b" stroke="none"/>`,
  grapes: `<path d="M12 6.5V3m0 1.5c1.5-1.5 3.5-1.5 5 0" stroke="#3f8f4f"/><g fill="#9b6bd6" stroke="none"><circle cx="8" cy="9.5" r="2.3"/><circle cx="12" cy="9.5" r="2.3"/><circle cx="16" cy="9.5" r="2.3"/><circle cx="10" cy="13.6" r="2.3"/><circle cx="14" cy="13.6" r="2.3"/><circle cx="12" cy="17.7" r="2.3"/></g>`,
  sparkle: `<path d="${SPARK(10, 9.5, 6.5)}" fill="#ffd36b" stroke="#b8893a"/><path d="${SPARK(18.5, 17, 3)}" fill="#c9a8ff" stroke="#8a63d2" stroke-width="1.2"/>`,
  bubble: `<circle cx="12" cy="12" r="8.5"/><path d="M8 10a4.5 4.5 0 0 1 3.5-3.5"/>`
};
const icon = (name, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

/* Quiz: each answer either goes to another question (next) or ends with product ids (result). */
const QUIZ = {
  start: "what",
  questions: {
    what: {
      q: { en: "What are you cleaning today?", ar: "ماذا تنظف اليوم؟" },
      a: [
        { icon: "shirt", t: { en: "Clothes", ar: "الملابس" }, next: "colour" },
        { icon: "dishes", t: { en: "Dishes", ar: "الصحون" }, result: ["dishwasher"] },
        { icon: "mop", t: { en: "Floors", ar: "الأرضيات" }, result: ["floor"] },
        { icon: "toilet", t: { en: "Bathroom", ar: "الحمام" }, result: ["toilet"] }
      ]
    },
    colour: {
      q: { en: "What's in the basket?", ar: "ماذا يوجد في سلة الغسيل؟" },
      a: [
        { icon: "mix", t: { en: "A colourful mix", ar: "ألوان مختلطة" }, next: "scent", add: ["color-catcher"] },
        { icon: "whites", t: { en: "Whites only", ar: "ملابس بيضاء فقط" }, next: "scent", add: ["white-magic"] },
        { icon: "blacks", t: { en: "Blacks & abayas", ar: "ملابس سوداء وعبايات" }, next: "scent", add: ["black-magic"] },
        { icon: "basket", t: { en: "A bit of everything", ar: "قليل من كل شيء" }, next: "scent" }
      ]
    },
    scent: {
      q: { en: "How do you like it to smell?", ar: "ما الرائحة التي تفضلها؟" },
      a: [
        { icon: "drop", t: { en: "Clean & scent free", ar: "نظيفة وبدون عطر" }, result: ["4in1"] },
        { icon: "flower", t: { en: "Floral", ar: "زهرية" }, result: ["5in1-flower"] },
        { icon: "grapes", t: { en: "Fruity", ar: "فاكهية" }, result: ["5in1-grape"] },
        { icon: "sparkle", t: { en: "Extra fragrant, for weeks", ar: "عطر إضافي يدوم أسابيع" }, result: ["4in1", "booster-purple"] }
      ]
    }
  }
};

/* Map: lon/lat are projected onto the SVG in main.js. status: now | base | next */
const MAP = {
  bahrain: [
    { id: "bh", lon: 50.55, lat: 26.07, en: "Bahrain", ar: "البحرين", status: "now",
      note: { en: "Where our journey began · 57 points of sale", ar: "حيث بدأت رحلتنا · ٥٧ منفذ بيع" } }
  ],
  saudi: [
    { id: "east", lon: 50.0, lat: 26.55, en: "Eastern Province", ar: "المنطقة الشرقية", status: "base",
      note: { en: "Our operations base (Al Qatif)", ar: "مركز عملياتنا الحالي (القطيف)" } },
    { id: "riyadh", lon: 46.7, lat: 24.7, en: "Riyadh", ar: "الرياض", status: "next" },
    { id: "qassim", lon: 43.97, lat: 26.33, en: "Qassim", ar: "القصيم", status: "next" },
    { id: "hail", lon: 41.69, lat: 27.52, en: "Hail", ar: "حائل", status: "next" },
    { id: "jouf", lon: 40.2, lat: 29.97, en: "Al Jouf", ar: "الجوف", status: "next" },
    { id: "north", lon: 41.04, lat: 30.98, en: "Northern Borders", ar: "الحدود الشمالية", status: "next" },
    { id: "tabuk", lon: 36.57, lat: 28.38, en: "Tabuk", ar: "تبوك", status: "next" },
    { id: "madinah", lon: 39.61, lat: 24.47, en: "Madinah", ar: "المدينة المنورة", status: "next" },
    { id: "makkah", lon: 39.83, lat: 21.42, en: "Makkah", ar: "مكة المكرمة", status: "next" },
    { id: "asir", lon: 42.5, lat: 18.22, en: "Asir", ar: "عسير", status: "next" },
    { id: "jazan", lon: 42.55, lat: 16.89, en: "Jazan", ar: "جازان", status: "next" },
    { id: "najran", lon: 44.13, lat: 17.49, en: "Najran", ar: "نجران", status: "next" }
  ],
  /* Simplified outlines (lon, lat) — stylised, not survey-accurate. */
  saOutline: [
    [34.95, 29.36], [36.07, 29.19], [36.5, 29.5], [37.5, 30.0], [38.0, 30.5], [37.0, 31.5], [39.2, 32.15],
    [40.4, 31.9], [42.0, 31.1], [44.7, 29.2], [46.5, 29.1], [47.7, 28.5], [48.4, 28.0], [48.9, 27.6],
    [49.6, 27.0], [50.15, 26.4], [50.15, 25.9], [50.5, 25.2], [50.8, 24.75], [51.6, 24.25], [52.6, 22.95],
    [55.1, 22.6], [55.65, 21.95], [55.0, 20.0], [52.0, 19.0], [48.8, 18.2], [47.0, 17.0], [46.3, 17.25],
    [45.2, 17.4], [44.0, 17.4], [43.3, 17.0], [43.0, 16.6], [42.8, 16.4], [42.6, 16.9], [42.2, 17.9],
    [41.4, 19.0], [40.6, 20.0], [39.5, 21.2], [39.1, 22.3], [38.5, 23.6], [37.6, 24.6], [37.2, 25.3],
    [36.5, 26.2], [35.6, 27.4], [35.1, 28.1], [34.95, 29.36]
  ],
  bhOutline: [
    [50.45, 26.23], [50.52, 26.24], [50.58, 26.235], [50.6, 26.21], [50.62, 26.2], [50.63, 26.15], [50.62, 26.08],
    [50.6, 26.0], [50.6, 25.92], [50.58, 25.84], [50.56, 25.79], [50.53, 25.84], [50.5, 25.95], [50.47, 26.03], [50.46, 26.12]
  ],
  muharraqOutline: [[50.58, 26.255], [50.62, 26.29], [50.665, 26.28], [50.66, 26.245], [50.62, 26.235]]
};

const PARTNERS = [
  "Danube", "Al Helli Supermarket", "AlSater Markets", "Tamimi Markets", "Mega Mart",
  "Al Anwar Discount Center", "Hamza Center", "AlSalam", "Ali Centre", "Day to Day",
  "Mazaya", "Al Muntazah Markets", "Al-A'raf Markets"
];

/* Arabic translations. English lives in the HTML and is captured at runtime. */
const AR = {
  "nav.sheet": "الورقة", "nav.products": "المنتجات", "nav.quiz": "اختر منتجك", "nav.story": "قصتنا",
  "nav.contact": "تواصل معنا", "nav.buy": "أين تشتري",
  "hero.eyebrow": "من البحرين إلى غدٍ أكثر إشراقاً",
  "hero.t1": "منازل أنظف ..", "hero.t2": "مستقبل أكثر إشراقاً.",
  "hero.lead": "ورقة واحدة .. كل ما تحتاجه. أوراق منظفة بتركيبة نباتية وإنزيمات متعددة متطورة — بدون قياس، بدون انسكاب، وبدون عبوات ثقيلة.",
  "hero.cta1": "اكتشف منتجاتنا", "hero.cta2": "اعثر على ورقتك",
  "hero.hint": "جرّب أن تفرقع الفقاعات!",
  "v.plant": "تركيبة نباتية", "v.enzyme": "إنزيمات متعددة", "v.eco": "صديق للبيئة", "v.safe": "آمن وفعال",
  "v.bio": "قابل للتحلل الحيوي", "v.travel": "مناسب للسفر", "v.trust": "جودة تستحق الثقة",
  "sheet.eyebrow": "ورقة د. قلو", "sheet.title": "ورقة واحدة .. كل ما تحتاجه.",
  "sheet.sub": "تركيبة نباتية متعددة الاستخدامات مع إنزيمات إسبانية متطورة في ورقة واحدة خفيفة. اضغط على أي ميزة لتعرف أكثر.",
  "sheet.drop": "أسقط الورقة في الماء", "sheet.again": "جرّب مرة أخرى",
  "sheet.caption": "شاهدها تختفي — بدون بقايا وبدون قياس.",
  "sheet.done": "ذابت تماماً. ملابس نظيفة، بدون بقايا.",
  "b.plant.t": "مكونات نباتية", "b.plant.d": "آمنة وطبيعية — لطيفة على عائلتك وعلى الأقمشة.",
  "b.soft.t": "ملمس أكثر نعومة", "b.soft.d": "تحافظ على نعومة الأقمشة غسلة بعد غسلة.",
  "b.scent.t": "رائحة منعشة طويلة", "b.scent.d": "انتعاش يدوم طويلاً، من الغسالة إلى الخزانة.",
  "b.odour.t": "مضاد للروائح", "b.odour.d": "يتخلص من الروائح غير المرغوبة من مصدرها.",
  "b.color.t": "حماية الألوان", "b.color.d": "يحافظ على إشراق الألوان ويحميها من البهتان.",
  "b.deep.t": "تنظيف عميق", "b.deep.d": "إنزيمات تزيل البقع الصعبة لملابس أنظف.",
  "tech.es.t": "إنزيمات إسبانية متطورة", "tech.es.d": "إنزيمات متعددة تزيل البقع بعمق.",
  "tech.kr.t": "تقنية كورية", "tech.kr.d": "مستقبل الإنزيمات في كل ورقة.",
  "tech.me.t": "تركيبة الشرق الأوسط", "tech.me.d": "مصممة لمياهنا ومناخنا وملابسنا — آمنة لجميع الأقمشة والعبايات.",
  "cmp.eyebrow": "استبدلها بورقة واحدة", "cmp.title": "ورقة صغيرة .. تغيير كبير.", "cmp.sub": "اسحب المقبض لترى الفرق.",
  "cmp.old.t": "المنظفات التقليدية", "cmp.old.1": "تحتوي على فوسفات", "cmp.old.2": "مواد كيميائية قاسية",
  "cmp.old.3": "بقايا على الملابس", "cmp.old.4": "عبوات بلاستيكية ضخمة",
  "cmp.new.t": "ورقة د. قلو", "cmp.new.1": "بدون فوسفات", "cmp.new.2": "بدون كلور", "cmp.new.3": "بدون ألوان صناعية",
  "cmp.new.4": "مكونات نباتية", "cmp.new.5": "إنزيمات إسبانية متطورة", "cmp.new.6": "آمنة لجميع الأقمشة والعبايات",
  "p.eyebrow": "منتجاتنا", "p.title": "ورقة لكل زاوية في منزلك.",
  "p.sub": "من الغسيل اليومي إلى الصحون اللامعة والأرضيات المنعشة. اضغط على أي منتج لتعرف المزيد.",
  "f.all": "الكل", "f.laundry": "الغسيل", "f.care": "العناية بالملابس", "f.scent": "معززات الرائحة", "f.home": "المنزل",
  "q.eyebrow": "اختبار ٣٠ ثانية", "q.title": "اعثر على ورقتك المثالية.",
  "q.sub": "أجب عن بضعة أسئلة سريعة وسنقترح عليك منتج د. قلو المناسب.",
  "q.result": "منتجك المثالي", "q.restart": "ابدأ من جديد", "q.view": "عرض المنتج", "q.back": "رجوع",
  "s.eyebrow": "قصة ابتكار", "s.title": "تحولت إلى علامة تجارية تنمو إقليمياً.",
  "s.bh": "البحرين", "s.sa": "السعودية",
  "s.hint": "اضغط على أي دبوس لعرض المنطقة.", "s.lg.now": "التواجد الحالي", "s.lg.next": "مناطق نستهدف التوسع فيها",
  "s.bh.k": "البحرين — من هنا بدأت رحلتنا", "s.bh.t": "السوق الذي بدأت منه قصة النجاح.",
  "s.bh.d": "البحرين هي السوق الذي انطلقت منه قصة نجاح د. قلو، حيث شهدت تطوير نموذج العمل واختبار المنتجات وبناء علاقة راسخة مع المستهلك — مع تغطية واسعة في مختلف محافظات المملكة.",
  "s.bh.s1": "منفذ بيع", "s.bh.s2": "شركاء تجزئة", "s.bh.s3": "قطعة مخزون جاهز", "s.bh.s4": "كحد أقصى للتوصيل في البحرين",
  "s.days": " أيام",
  "s.sa.k": "السعودية — بوابتنا نحو المستقبل", "s.sa.t": "نرتقي بمعايير النظافة في المملكة.",
  "s.sa.d": "من مركز عملياتنا في المنطقة الشرقية، نحن جاهزون للتوسع في جميع مناطق المملكة — دعماً لرؤية السعودية ٢٠٣٠.",
  "s.sa.s1": "منفذ بيع حالياً", "s.sa.s2": "شركاء توزيع وتجزئة رئيسيين", "s.sa.s3": "قطعة جاهزة للسوق", "s.sa.s4": "مدة التوصيل لجميع المناطق",
  "t1.t": "انطلقنا من البحرين", "t1.d": "منتجات اختُبرت وأحبتها البيوت البحرينية.",
  "t2.t": "في كل المحافظات", "t2.d": "٥٧ منفذ بيع و١١ شريك تجزئة ومتجرنا الإلكتروني.",
  "t3.t": "إلى المملكة", "t3.d": "مركز عمليات في المنطقة الشرقية و٢٧ منفذ بيع.",
  "t4.t": "كل المناطق قريباً", "t4.d": "جاهزون للتوسع في جميع مناطق المملكة.",
  "c.eyebrow": "التزامنا", "c.title": "شراكة اليوم .. مستقبل أنظف.",
  "c1.t": "تغطية متزايدة", "c1.d": "مدن أكثر ورفوف أكثر، أقرب إليك.",
  "c2.t": "شراكات طويلة الأمد", "c2.d": "ننمو مع شركائنا في التجزئة والتوزيع.",
  "c3.t": "توفير مستمر للمخزون", "c3.d": "مخزون جاهز لتبقى الرفوف ممتلئة مع نمو الطلب.",
  "c4.t": "دعم ما بعد البيع", "c4.d": "فريق حقيقي جاهز لخدمة عملائنا.",
  "pt.title": "تجدنا لدى شركائنا في التجزئة",
  "buy.script": "أنظف، أنعم، أكثر إشراقاً — كل يوم", "buy.title": "مستعد للتغيير؟",
  "buy.sub": "منتجات د. قلو متوفرة لدى شركائنا في البحرين والسعودية، وعبر متجرنا الإلكتروني مع التوصيل خلال يومين في البحرين.",
  "buy.cta1": "تسوق أونلاين — drgloshop.com", "buy.cta2": "كن شريك تجزئة",
  "faq.eyebrow": "معلومات تهمك", "faq.title": "أسئلة وأجوبة.",
  "faq.q1": "ما هي أوراق منظف الغسيل؟",
  "faq.a1": "أوراق رقيقة من منظف مركّز بتركيبة نباتية وإنزيمات متعددة متطورة. تذوب تماماً أثناء الغسيل وتستبدل المنظفات السائلة والبودرة — بدون قياس، بدون انسكاب، وبدون عبوات بلاستيكية ثقيلة.",
  "faq.q2": "كيف أستخدم ورقة غسيل د. قلو؟",
  "faq.a2": "ضع ورقة واحدة في حوض الغسالة قبل إضافة الملابس، ثم اغسل كالمعتاد. للأحمال الكبيرة أو شديدة الاتساخ استخدم ورقتين.",
  "faq.q3": "هل أوراق د. قلو آمنة على العبايات والملابس الرقيقة؟",
  "faq.a3": "نعم. تركيبتنا نباتية، بدون فوسفات وبدون كلور وبدون ألوان صناعية، وآمنة لجميع الأقمشة والعبايات. وللملابس السوداء والعبايات، تساعد بلاك ماجيك على الحفاظ على عمق اللون الأسود.",
  "faq.q4": "أين أشتري د. قلو في البحرين؟",
  "faq.a4": "تتوفر د. قلو في ٥٧ منفذ بيع في جميع محافظات البحرين، منها الدانوب والحلي وأسواق التميمي وميغا مارت، وعبر متجرنا الإلكتروني <a href=\"https://www.drgloshop.com\" target=\"_blank\" rel=\"noopener\">drgloshop.com</a> مع التوصيل خلال يومين.",
  "faq.q5": "هل تتوفر د. قلو في السعودية؟",
  "faq.a5": "نعم. من مركز عملياتنا في المنطقة الشرقية، تتوفر د. قلو في ٢٧ منفذ بيع عبر شركاء منهم مزايا وأسواق المنتزه وأسواق الأعراف، مع التوصيل لجميع المناطق خلال ٣ إلى ٥ أيام.",
  "faq.q6": "هل الأوراق مناسبة للسفر؟",
  "faq.a6": "جداً. أوراق د. قلو خفيفة وصغيرة ولا تنسكب، لذا يمكنك أخذ بعضها معك في أي رحلة.",
  "faq.q7": "كيف يمكن لمتجري توفير منتجات د. قلو؟",
  "faq.a7": "يسعدنا التعاون معك. راسلنا على <a href=\"mailto:dr.glo.bahrain@gmail.com\">dr.glo.bahrain@gmail.com</a> للبحرين أو <a href=\"mailto:dr.glo.ksa@gmail.com\">dr.glo.ksa@gmail.com</a> للسعودية.",
  "ct.eyebrow": "تواصل معنا", "ct.title": "يسعدنا أن نسمع منك.",
  "ct.bh.t": "مكتب البحرين", "ct.bh.k": "من هنا بدأت رحلتنا",
  "ct.bh.a": "السيف – مجمع ٤٢٨ – طريق ٢٨٣١، مبنى ٢٤٤٦، مملكة البحرين",
  "ct.sa.t": "مكتب السعودية", "ct.sa.k": "شريكنا نحو مستقبل أفضل",
  "ct.sa.a": "القطيف – حي الشاطئ، الرياض ٣٢، المملكة العربية السعودية",
  "ct.fl.t": "تابعونا",
  "ft.script": "معاً .. لعالم أنظف لحياة أفضل", "ft.rights": "أوراق المنظفات. جميع الحقوق محفوظة.",
  "m.how": "طريقة الاستخدام", "m.cta": "متوفر على drgloshop.com",
  "toast.pop": "أنت بطل الفقاعات!", "toast.pop.sub": "فرقعت ٢٥ فقاعة"
};

const EN_EXTRA = {
  "sheet.again": "Try it again", "sheet.done": "Fully dissolved. Clean clothes, zero residue.",
  "q.result": "Your perfect match", "q.restart": "Start over", "q.view": "View product", "q.back": "Back",
  "toast.pop": "You're a Glo-getter!", "toast.pop.sub": "25 bubbles popped"
};
