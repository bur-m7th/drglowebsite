/* Product card markup — shared by the browser (main.js) and the build (tools/build.mjs). */
const ARROW_SVG = '<svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

function cardHTML(p, lang, imgBase) {
  const L = (o) => (o && (o[lang] ?? o.en)) || "";
  const more = lang === "ar" ? "عرض التفاصيل" : "View details";
  return `
      <article class="card reveal is-in" data-id="${p.id}" data-cat="${p.cat}" style="--tint:${p.tint}">
        <div class="card__media">
          <img src="${imgBase}${p.img}-sm.webp" alt="${L(p.name)}" loading="lazy" decoding="async" width="560" height="560">
          ${p.tag ? `<span class="card__tag">${L(p.tag)}</span>` : ""}
          <span class="card__shine"></span>
        </div>
        <div class="card__body">
          <span class="card__cat">${L(CATEGORIES[p.cat])}</span>
          <h3 class="card__name"><button class="card__link" type="button" aria-label="${more}: ${L(p.name)}">${L(p.name)}</button></h3>
          <p class="card__meta">${L(p.meta)}</p>
        </div>
        <span class="card__more" aria-hidden="true">${ARROW_SVG}</span>
      </article>`;
}
