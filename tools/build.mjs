#!/usr/bin/env node
/*
 * dr.glo site build — no dependencies, just Node 18+.
 *
 *   node tools/build.mjs                      # uses SITE_URL below
 *   node tools/build.mjs https://www.example.com/
 *
 * index.html is the English source. This script:
 *   1. fills the <!-- seo:start/end --> head block (title, description, canonical,
 *      hreflang, Open Graph, Twitter, JSON-LD) and pre-renders the product cards;
 *   2. writes ar/index.html — the same page with Arabic text, lang="ar" dir="rtl";
 *   3. writes sitemap.xml and robots.txt.
 * Edit text in index.html (English) and js/data.js (Arabic, products), then re-run.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

// The brand site's domain (GitHub Pages custom domain, registered at Namecheap).
const DEFAULT_SITE_URL = "https://drgloglobal.com/";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = (process.argv[2] || DEFAULT_SITE_URL).replace(/\/?$/, "/");
const TODAY = new Date().toISOString().slice(0, 10);
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, f)), { recursive: true }); fs.writeFileSync(path.join(ROOT, f), s); console.log("wrote", f); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/* ---- load site data (browser scripts) into a sandbox ---- */
const ctx = vm.createContext({});
vm.runInContext(read("js/data.js") + "\n" + read("js/render.js") +
  "\n;globalThis.__d = { PRODUCTS, CATEGORIES, AR, cardHTML };", ctx);
const { PRODUCTS, AR, cardHTML } = ctx.__d;

const META = {
  en: {
    title: "dr.glo | Laundry Detergent Sheets — Bahrain & Saudi Arabia",
    desc: "Plant-based laundry detergent sheets with advanced enzymes — no phosphates, no chlorine. Laundry, dishwasher & floor sheets in Bahrain and Saudi Arabia.",
    ogLocale: "en_US", ogAlt: "ar_AR",
    imgAlt: "dr.glo detergent sheets — Cleaner homes, a brighter tomorrow"
  },
  ar: {
    title: "د. قلو | أوراق منظف الغسيل — البحرين والسعودية",
    desc: "أوراق منظف غسيل بتركيبة نباتية وإنزيمات متطورة — بدون فوسفات وبدون كلور. أوراق للغسيل وغسالة الصحون والأرضيات في البحرين والمملكة العربية السعودية.",
    ogLocale: "ar_AR", ogAlt: "en_US",
    imgAlt: "أوراق منظف د. قلو — منازل أنظف، مستقبل أكثر إشراقاً"
  }
};

const SOCIAL = [
  "https://www.instagram.com/drglo", "https://www.tiktok.com/@drglo", "https://www.facebook.com/drglo",
  "https://www.youtube.com/@drglo", "https://www.snapchat.com/add/drglo", "https://www.linkedin.com/company/drglo"
];

function jsonLd(lang) {
  const url = lang === "ar" ? SITE + "ar/" : SITE;
  const org = {
    "@type": "Organization",
    "@id": SITE + "#organization",
    name: "dr.glo",
    alternateName: ["Dr.glo", "dr glo", "د. قلو"],
    url: SITE,
    logo: { "@type": "ImageObject", url: SITE + "assets/img/logo.png", width: 900, height: 471 },
    image: SITE + "assets/img/og-image.jpg",
    description: META.en.desc,
    slogan: "Cleaner Homes, A Brighter Tomorrow",
    foundingLocation: { "@type": "Place", name: "Kingdom of Bahrain" },
    areaServed: [{ "@type": "Country", name: "Bahrain" }, { "@type": "Country", name: "Saudi Arabia" }],
    address: [
      { "@type": "PostalAddress", streetAddress: "Building 2446, Road 2831, Block 428", addressLocality: "Al Seef", addressCountry: "BH" },
      { "@type": "PostalAddress", streetAddress: "Al Shati District", addressLocality: "Al Qatif", addressRegion: "Eastern Province", addressCountry: "SA" }
    ],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer service", telephone: "+973-3364-0300", email: "dr.glo.bahrain@gmail.com", areaServed: "BH", availableLanguage: ["English", "Arabic"] },
      { "@type": "ContactPoint", contactType: "customer service", telephone: "+966-56-686-1555", email: "dr.glo.ksa@gmail.com", areaServed: "SA", availableLanguage: ["English", "Arabic"] }
    ],
    sameAs: [...SOCIAL, "https://www.drgloshop.com"]
  };
  const site = {
    "@type": "WebSite", "@id": SITE + "#website", url: SITE, name: "dr.glo",
    inLanguage: ["en", "ar"], publisher: { "@id": SITE + "#organization" }
  };
  const page = {
    "@type": "WebPage", "@id": url + "#webpage", url, name: META[lang].title, description: META[lang].desc,
    inLanguage: lang, isPartOf: { "@id": SITE + "#website" }, about: { "@id": SITE + "#organization" },
    primaryImageOfPage: SITE + "assets/img/og-image.jpg"
  };
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [org, site, page] }, null, 2)
    .replace(/</g, "\\u003c");
}

function seoBlock(lang) {
  const m = META[lang], url = lang === "ar" ? SITE + "ar/" : SITE, r = lang === "ar" ? "../" : "";
  const img = SITE + "assets/img/og-image.jpg";
  return `<!-- seo:start -->
  <title>${esc(m.title)}</title>
  <meta name="description" content="${esc(m.desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${SITE}">
  <link rel="alternate" hreflang="ar" href="${SITE}ar/">
  <link rel="alternate" hreflang="x-default" href="${SITE}">
  <meta name="theme-color" content="#0a1d6e">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="dr.glo">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(m.title)}">
  <meta property="og:description" content="${esc(m.desc)}">
  <meta property="og:image" content="${img}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(m.imgAlt)}">
  <meta property="og:locale" content="${m.ogLocale}">
  <meta property="og:locale:alternate" content="${m.ogAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(m.title)}">
  <meta name="twitter:description" content="${esc(m.desc)}">
  <meta name="twitter:image" content="${img}">
  <link rel="icon" type="image/png" sizes="256x256" href="${r}assets/img/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="${r}assets/img/apple-touch-icon.png">
  <link rel="manifest" href="${r}site.webmanifest">
  <script type="application/ld+json">
${jsonLd(lang)}
  </script>
  <!-- seo:end -->`;
}

const replaceBlock = (html, name, content) => {
  const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  if (!re.test(html)) throw new Error(`marker ${name} not found`);
  return html.replace(re, () => content);
};
const products = (lang, imgBase) =>
  `<!-- products:start -->${PRODUCTS.map((p) => cardHTML(p, lang, imgBase)).join("")}\n        <!-- products:end -->`;

/* ---- English page (in place) ---- */
let en = read("index.html");
en = replaceBlock(en, "seo", seoBlock("en"));
en = replaceBlock(en, "products", products("en", "assets/img/products/"));
write("index.html", en);

/* ---- Arabic page ---- */
let ar = en;
ar = ar.replace('<html lang="en" dir="ltr">', '<html lang="ar" dir="rtl" data-root="../">');
ar = replaceBlock(ar, "seo", seoBlock("ar"));
ar = replaceBlock(ar, "products", products("ar", "../assets/img/products/"));
const missing = new Set();
ar = ar.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (all, open, tag, key, inner, close) => {
  if (!(key in AR)) { missing.add(key); return all; }
  return open + AR[key] + close;
});
if (missing.size) console.warn("⚠️  missing Arabic for:", [...missing].join(", "));
// asset paths are one level up from /ar/
ar = ar.replace(/\b(src|href)="(assets|css|js)\//g, '$1="../$2/');
// language switch points back to English
ar = ar.replace('<a class="lang-toggle" id="langToggle" href="ar/" hreflang="ar" lang="ar">عربي</a>',
  '<a class="lang-toggle" id="langToggle" href="../" hreflang="en" lang="en">English</a>');
// translate the few English-only attributes
for (const [a, b] of [
  ['aria-label="dr.glo home"', 'aria-label="الصفحة الرئيسية لـ د. قلو"'],
  ['aria-label="Main"', 'aria-label="القائمة الرئيسية"'],
  ['aria-label="Menu"', 'aria-label="القائمة"'],
  ['aria-label="Scroll down"', 'aria-label="مرر للأسفل"'],
  ['aria-label="Close"', 'aria-label="إغلاق"'],
  ['aria-label="Comparison slider"', 'aria-label="شريط المقارنة"'],
  ['aria-label="What we stand for"', 'aria-label="قيمنا"'],
  ['alt="dr.glo detergent"', 'alt="منظف د. قلو"'],
  ['alt="dr.glo White Magic laundry sheets"', 'alt="أوراق وايت ماجيك للغسيل من د. قلو"'],
  ['aria-label="Map of dr.glo presence in Bahrain and Saudi Arabia"', 'aria-label="خريطة تواجد د. قلو في البحرين والسعودية"']
]) ar = ar.split(a).join(b);
write("ar/index.html", ar);

/* ---- sitemap + robots ---- */
const alt = `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}"/>`;
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${TODAY}</lastmod>${alt}
  </url>
  <url>
    <loc>${SITE}ar/</loc>
    <lastmod>${TODAY}</lastmod>${alt}
  </url>
</urlset>
`);
write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${SITE}sitemap.xml
`);

