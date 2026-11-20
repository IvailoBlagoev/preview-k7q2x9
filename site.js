/* Рендерира страниците от window.SITE (content.js).
   Тук обикновено нищо не се променя при смяна на клиниката. */
(function () {
  const S = window.SITE, C = S.clinic;
  const page = document.body.dataset.page;               // home | services | digital
  const $ = (sel, root = document) => root.querySelector(sel);
  const li = (arr) => arr.map((t) => `<li>${t}</li>`).join("");
  const paras = (arr = []) => arr.map((t) => `<p>${t}</p>`).join("");
  const mainPhone = C.phones[0];
  const addressLine = `${C.address.street}, ${C.address.zip} ${C.address.city}`;
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.mapQuery);

  /* ---------- Обща рамка ---------- */
  function header() {
    const nav = S.nav.map((n) =>
      `<li><a href="${n.href}"${n.page === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("");
    return `
    <a class="skip" href="#main">Към съдържанието</a>
    <div class="topbar">
      <div class="wrap topbar-in">
        <span>${C.address.street}, ${C.address.city}</span>
        <span>${C.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}</span>
        <a href="mailto:${C.email}">${C.email}</a>
      </div>
    </div>
    <header class="site-header">
      <div class="wrap nav">
        <a href="index.html" class="logo" aria-label="${C.name} — начало">
          <span class="logo-mark" aria-hidden="true">${C.mark}</span>
          <span class="logo-text">${C.name}<small>${C.descriptor}</small></span>
        </a>
        <nav id="nav" aria-label="Основна навигация"><ul>${nav}</ul></nav>
        <div class="nav-cta">
          <a class="phone" href="tel:${mainPhone.tel}">${mainPhone.display}</a>
          <a class="btn btn-primary btn-sm" href="#kontakti">${S.cta.book}</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav" aria-label="Меню">
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>`;
  }

  function contact() {
    const f = S.contact.form;
    const field = (id, label, type, req, auto) => `
      <div class="field">
        <label for="${id}">${label}${req ? ` <span class="req">(${f.required})</span>` : ""}</label>
        <input id="${id}" name="${id}" type="${type}"${req ? " required" : ""} autocomplete="${auto}">
      </div>`;
    return `
    <section class="contact" id="kontakti" aria-labelledby="kontakti-h">
      <div class="wrap contact-grid">
        <div class="contact-info">
          <h2 id="kontakti-h">${S.contact.heading}</h2>
          <p class="lead">${S.contact.text}</p>
          <ul class="phones">${C.phones.map((p) => `<li><a href="tel:${p.tel}">${p.intl}</a></li>`).join("")}</ul>
          <dl class="facts">
            <div><dt>Адрес</dt><dd>${C.address.street}<br>${C.address.zip} ${C.address.city}<br>
              <a class="text-link" href="${mapsUrl}" target="_blank" rel="noopener">${S.contact.mapLink}</a></dd></div>
            <div><dt>Имейл</dt><dd><a href="mailto:${C.email}">${C.email}</a></dd></div>
            <div><dt>Работно време</dt><dd>${C.hours.map((h) => `${h.days}<br>${h.time}`).join("<br>")}</dd></div>
          </dl>
        </div>
        <form class="form" novalidate>
          <div class="row2">
            ${field("first-name", f.firstName, "text", true, "given-name")}
            ${field("last-name", f.lastName, "text", true, "family-name")}
          </div>
          ${field("email", f.email, "email", true, "email")}
          ${field("tel", f.phone, "tel", false, "tel")}
          <div class="field">
            <label for="message">${f.message}</label>
            <textarea id="message" name="message" rows="4" aria-describedby="message-hint"></textarea>
            <span class="hint" id="message-hint">${f.messageHint}</span>
          </div>
          <div class="field check">
            <label for="consent"><input id="consent" name="consent" type="checkbox" required> <span>${f.consent} <span class="req">(${f.required})</span></span></label>
          </div>
          <button class="btn btn-primary" type="submit">${f.submit}</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
      <div class="wrap map">
        <iframe title="${S.contact.mapTitle}" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="map-offline" hidden><p>${C.mapQuery}</p><a class="btn btn-primary" href="${mapsUrl}" target="_blank" rel="noopener">Отвори в Google Maps</a></div>
      </div>
    </section>`;
  }

  function footer() {
    const L = C.legal;
    return `
    <footer class="site-footer">
      <div class="wrap foot">
        <div><b>${L.company}</b><br>${L.address}<br>БУЛСТАТ: ${L.bulstat}<br>МОЛ: ${L.mol}</div>
        <div><b>Документи за пациенти</b><ul>${li(C.documents)}</ul></div>
        <div><b>Навигация</b><ul>${S.nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
          <b class="foot-sub">Поверителност</b><ul>
            <li><a href="${S.legalLinks.privacy.href}">${S.legalLinks.privacy.label}</a></li>
            <li><a href="${S.legalLinks.cookies.href}">${S.legalLinks.cookies.label}</a></li>
            <li><button type="button" class="link-btn" data-cookie-settings>${S.cookieBanner.settings}</button></li>
          </ul></div>
        <p class="foot-disc">${S.disclaimer.footer}</p>
      </div>
    </footer>
    <aside class="demo-note" aria-label="Пояснение"><span class="note-full">${S.disclaimer.floating}</span><span class="note-short">${S.disclaimer.floatingShort}</span></aside>`;
  }

  /* ---------- Начална страница ---------- */
  function home() {
    const H = S.home, h = H.hero, I = S.images;
    return `
    <section class="hero">
      <img class="hero-bg" src="${I.hero.src}" alt="${I.hero.alt}" width="1536" height="1024" fetchpriority="high">
      <div class="wrap hero-copy">
        <p class="kicker reveal">${h.kicker}</p>
        <h1 class="reveal">${h.heading}</h1>
        <p class="hero-text reveal">${h.text}</p>
        <div class="actions reveal">
          <a class="btn btn-light" href="#kontakti">${S.cta.book}</a>
          <a class="hero-call" href="tel:${mainPhone.tel}"><small>${h.callLabel}</small>${mainPhone.intl}</a>
        </div>
      </div>
    </section>

    <div class="wrap trust-wrap">
      <dl class="trust">${H.trust.map((t) => `<div><dt>${t.big}</dt><dd>${t.label}</dd></div>`).join("")}</dl>
    </div>

    <section class="about" aria-labelledby="about-h">
      <div class="wrap about-grid">
        <div>
          <p class="kicker">${H.about.kicker}</p>
          <h2 id="about-h">${H.about.heading}</h2>
          ${paras(H.about.text)}
          <div class="founder">
            <img src="${I.founder.src}" alt="${I.founder.alt}" width="88" height="88" loading="lazy">
            <p><b>${H.about.founderName}</b>${H.about.founderNote}</p>
          </div>
        </div>
        <figure class="about-photo"><img src="${I.cabinet.src}" alt="${I.cabinet.alt}" width="1536" height="1024" loading="lazy"></figure>
      </div>
    </section>

    <section class="tech" id="tehnologii" aria-labelledby="tech-h">
      <div class="wrap">
        <div class="head">
          <h2 id="tech-h">${H.tech.heading}</h2>
          <p class="lead">${H.tech.text}</p>
        </div>
        <ul class="rows">${H.tech.items.map((t) => `
          <li class="row">
            <figure class="row-photo"><img src="${t.photo.src}" alt="${t.photo.alt}" width="1536" height="1024" loading="lazy"></figure>
            <div class="row-text">
              <p class="maker">${t.maker}</p>
              <h3>${t.title}</h3>
              <p>${t.text}</p>
            </div>
          </li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="services" id="uslugi" aria-labelledby="svc-h">
      <div class="wrap">
        <div class="head">
          <h2 id="svc-h">${H.services.heading}</h2>
          <p class="lead">${H.services.text}</p>
        </div>
        <div class="svc-cards">${H.services.items.map((s) => `
          <a class="svc-card" href="${s.href}">
            <img src="${s.photo}" alt="" loading="lazy">
            <span class="svc-card-text"><b>${s.title}</b><span>${s.desc}</span></span>
          </a>`).join("")}
        </div>
      </div>
    </section>

    ${steps(H.dsd.heading, H.dsd.text, H.dsd.steps, "dsd", H.dsd.photos)}

    <section class="history" aria-labelledby="hist-h">
      <div class="wrap">
        <div class="head">
          <h2 id="hist-h">${H.history.heading}</h2>
          <p class="lead">${H.history.text}</p>
        </div>
        <ol class="years">${H.history.items.map((y) => `
          <li class="reveal-on-scroll"><span class="year">${y.year}</span><h3>${y.title}</h3><p>${y.text}</p></li>`).join("")}
        </ol>
      </div>
    </section>

    <section class="team-section" id="ekip" aria-labelledby="team-h">
      <div class="wrap">
        <div class="head">
          <h2 id="team-h">${H.team.heading}</h2>
          <p class="lead">${H.team.text}</p>
        </div>
        <div class="team">${H.team.doctors.map((d) => `
          <article class="doc">
            <img src="${d.photo}" alt="Илюстративен портрет, генериран с ИИ — ${d.name}" width="1024" height="1536" loading="lazy">
            <p class="role">${d.role}</p>
            <h3>${d.name}</h3>
            <p>${d.bio}</p>
          </article>`).join("")}
        </div>
        <p class="disc">${S.disclaimer.team}</p>
      </div>
    </section>

    <section class="safety" aria-labelledby="safe-h">
      <div class="wrap safety-grid">
        <h2 id="safe-h">${H.safety.heading}</h2>
        <div>
          <ul class="ticks">${li(H.safety.list)}</ul>
          <p class="partners"><span>${H.safety.partnersLabel}</span> ${H.safety.partners.join(", ")}</p>
        </div>
      </div>
    </section>`;
  }

  function steps(heading, text, items, id, photos) {
    return `
    <section class="steps-section" id="${id}" aria-labelledby="${id}-h">
      <div class="wrap">
        <div class="head">
          <h2 id="${id}-h">${heading}</h2>
          ${text ? `<p class="lead">${text}</p>` : ""}
        </div>
        ${photos ? `<div class="dsd-photos">${photos.map((ph) => `
          <img src="${ph.src}" alt="${ph.alt}" loading="lazy">`).join("")}
        </div>` : ""}
        <ol class="steps">${items.map((s, i) => `
          <li style="--i:${i}"><span class="num" aria-hidden="true">${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join("")}
        </ol>
      </div>
    </section>`;
  }

  /* ---------- Вътрешни страници ---------- */
  function inner(P) {
    const toc = P.sections.map((s) => `<li><a href="#${s.id}">${s.title}</a></li>`).join("");
    const body = P.sections.map((s) => s.steps ? steps(s.title, "", s.steps, s.id, s.photo && [s.photo]) : `
      <section class="topic" id="${s.id}" aria-labelledby="${s.id}-h">
        <h2 id="${s.id}-h">${s.title}</h2>
        ${s.photo ? `<img class="topic-photo" src="${s.photo.src}" alt="${s.photo.alt}" loading="lazy">` : ""}
        <div class="prose">${s.blocks.map((b) => `
          ${b.h ? `<h3>${b.h}</h3>` : ""}${paras(b.p)}${b.list ? `<ul class="ticks">${li(b.list)}</ul>` : ""}`).join("")}
        </div>
      </section>`).join("");
    const faq = P.faq ? `
      <section class="faq" id="vaprosi" aria-labelledby="faq-h">
        <h2 id="faq-h">Често задавани въпроси</h2>
        ${P.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}
      </section>` : "";
    const side = `
      <aside class="side" aria-label="Запис на час">
        <div class="side-card">
          <h2>${S.contact.side.heading}</h2>
          <p>${S.contact.side.text}</p>
          <a class="btn btn-primary" href="#kontakti">${S.cta.book}</a>
          <a class="side-phone" href="tel:${mainPhone.tel}">${mainPhone.intl}</a>
          <p class="side-hours">${C.hours.map((h) => `${h.days}: ${h.time}`).join("<br>")}</p>
        </div>
      </aside>`;
    return `
    <section class="page-intro">
      <div class="wrap">
        <p class="crumbs"><a href="index.html">Начало</a> <span aria-hidden="true">/</span> ${P.heading}</p>
        <h1 class="reveal">${P.heading}</h1>
        <p class="hero-text reveal">${P.text}</p>
        <nav class="toc reveal" aria-label="На тази страница"><ul>${toc}${P.faq ? `<li><a href="#vaprosi">Въпроси</a></li>` : ""}</ul></nav>
      </div>
    </section>
    <div class="wrap inner-layout">
      <div class="inner-main">${body}${faq}</div>
      ${side}
    </div>`;
  }

  /* ---------- Сглобяване ---------- */
  const P = { services: S.servicesPage, digital: S.digitalPage, privacy: S.privacyPage, cookies: S.cookiesPage }[page] || null;
  document.title = P ? P.title : S.home.title;
  document.body.insertAdjacentHTML("afterbegin", header());
  $("#main").innerHTML = (P ? inner(P) : home()) + contact();
  document.body.insertAdjacentHTML("beforeend", footer());

  /* ---------- Поведение ---------- */
  const menuBtn = $(".menu-btn"), nav = $("#nav");
  const setMenu = (open) => { nav.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  const form = $(".form"), status = $(".form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("tried");
    const bad = form.querySelector(":invalid");
    if (bad) { bad.focus(); status.textContent = "Попълнете отбелязаните полета."; return; }
    status.textContent = S.contact.form.demoResult;
  });

  // Един сдържан момент при зареждане + стъпките и годините при скролиране.
  requestAnimationFrame(() => document.documentElement.classList.add("ready"));
  const io = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.25 });
  document.querySelectorAll(".steps, .reveal-on-scroll").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
})();


/* Без интернета карта не загрузится: показываем адрес и ссылку вместо пустой рамки.
   Проверяем настоящую связь с Google, потому что Wi-Fi без интернета тоже считается «онлайн». */
(function () {
  function show(online) {
    document.querySelectorAll(".map").forEach((m) => {
      const f = m.querySelector("iframe"), o = m.querySelector(".map-offline");
      if (!f || !o) return;
      f.hidden = !online;
      o.hidden = online;
    });
  }
  function probe() {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 3000);
    fetch("https://www.google.com/generate_204", { mode: "no-cors", cache: "no-store", signal: ctl.signal })
      .then(() => show(true), () => show(false))
      .finally(() => clearTimeout(t));
  }
  window.addEventListener("online", probe);
  window.addEventListener("offline", () => show(false));
  probe();
})();


/* Банер за бисквитки. Изборът се пази в браузъра. Аналитични и рекламни кодове
   на клиниката (Google Analytics, Tag Manager и др.) се зареждат само при window.MGDConsent.analytics === true.
   Слушайте събитието "mgd-consent" или проверете window.MGDConsent. */
(function () {
  const B = window.SITE.cookieBanner, L = window.SITE.legalLinks, KEY = "mgd-consent";
  let box = null;
  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(analytics) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics, ts: Date.now() })); } catch (e) {}
    window.MGDConsent = { analytics };
    document.dispatchEvent(new CustomEvent("mgd-consent", { detail: window.MGDConsent }));
  }
  function close() { if (box) { box.remove(); box = null; } }
  function open() {
    if (box) return;
    box = document.createElement("div");
    box.className = "cookie-banner";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Бисквитки");
    box.innerHTML = `<p>${B.text} <a href="${L.cookies.href}">${B.more}</a></p>
      <div class="cookie-actions">
        <button type="button" class="btn btn-primary btn-sm" data-c="yes">${B.accept}</button>
        <button type="button" class="btn btn-primary btn-sm" data-c="no">${B.reject}</button>
      </div>`;
    box.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]");
      if (!b) return;
      save(b.dataset.c === "yes");
      close();
    });
    document.body.appendChild(box);
  }
  const saved = read();
  window.MGDConsent = { analytics: !!(saved && saved.analytics) };
  if (!saved) open();
  document.addEventListener("click", (e) => { if (e.target.closest("[data-cookie-settings]")) open(); });
})();
