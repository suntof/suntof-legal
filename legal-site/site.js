(function () {
  const languageOrder = ["tr", "en", "ar", "ur", "id", "fr", "de", "ru", "es", "az", "bs", "fa"];
  const languageLabels = {
    tr: "Türkçe",
    en: "English",
    ar: "العربية",
    ur: "اردو",
    id: "Bahasa Indonesia",
    fr: "Français",
    de: "Deutsch",
    ru: "Русский",
    es: "Español",
    az: "Azərbaycan dili",
    bs: "Bosanski",
    fa: "فارسی",
  };

  function normalizeLanguage(raw) {
    const cleaned = String(raw || "").trim().toLowerCase().replaceAll("_", "-");
    if (!cleaned) return "en";
    const dash = cleaned.indexOf("-");
    return dash === -1 ? cleaned : cleaned.slice(0, dash);
  }

  function resolveLanguage(locales) {
    const params = new URLSearchParams(window.location.search);
    const requested = normalizeLanguage(params.get("lang"));
    if (locales[requested]) return requested;
    const browser = normalizeLanguage(window.navigator.language || "en");
    if (locales[browser]) return browser;
    if (locales.en) return "en";
    return Object.keys(locales)[0];
  }

  function withLanguageParam(lang) {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", lang);
    return `${window.location.pathname}?${params.toString()}`;
  }

  function renderSummaryCards(cards) {
    const root = document.getElementById("summary");
    root.innerHTML = "";
    if (!Array.isArray(cards) || cards.length === 0) return;
    for (const card of cards) {
      const div = document.createElement("div");
      div.className = "summary-card";
      div.innerHTML = `<strong>${card.title}</strong><span>${card.body}</span>`;
      root.appendChild(div);
    }
  }

  function renderSection(section) {
    const article = document.createElement("article");
    article.className = "section";

    const title = document.createElement("h2");
    title.textContent = section.h;
    article.appendChild(title);

    if (section.notice) {
      const notice = document.createElement("div");
      notice.className = "notice";
      notice.innerHTML = section.notice;
      article.appendChild(notice);
    }

    if (Array.isArray(section.p)) {
      for (const raw of section.p) {
        const p = document.createElement("p");
        p.innerHTML = raw;
        article.appendChild(p);
      }
    }

    if (Array.isArray(section.list) && section.list.length > 0) {
      const ul = document.createElement("ul");
      for (const raw of section.list) {
        const li = document.createElement("li");
        li.innerHTML = raw;
        ul.appendChild(li);
      }
      article.appendChild(ul);
    }

    return article;
  }

  function renderSections(sections) {
    const root = document.getElementById("content");
    root.innerHTML = "";
    for (const section of sections) {
      root.appendChild(renderSection(section));
    }
  }

  function renderActions(actions) {
    const root = document.getElementById("footer-links");
    root.innerHTML = "";
    if (!Array.isArray(actions)) return;
    for (const action of actions) {
      const link = document.createElement("a");
      link.href = action.href;
      if (action.primary) link.className = "primary";
      if (action.external !== false) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      link.textContent = action.label;
      root.appendChild(link);
    }
  }

  function renderLanguageSwitcher(locales, activeLang) {
    const root = document.getElementById("lang-switch");
    root.innerHTML = "";
    for (const code of languageOrder) {
      if (!locales[code]) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = languageLabels[code] || code;
      button.classList.toggle("active", code === activeLang);
      button.addEventListener("click", () => {
        history.replaceState({}, "", withLanguageParam(code));
        render(code);
      });
      root.appendChild(button);
    }
  }

  let pageConfig = null;

  function render(lang) {
    const locale = pageConfig.locales[lang] || pageConfig.locales.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = locale.dir || "ltr";
    document.title = locale.metaTitle || locale.title;
    document.getElementById("eyebrow").textContent = locale.eyebrow || "";
    document.getElementById("title").textContent = locale.title;
    document.getElementById("updated").textContent = locale.updated;
    document.getElementById("intro").innerHTML = locale.intro;
    renderSummaryCards(locale.summaryCards || []);
    renderSections(locale.sections || []);
    renderActions(locale.actions || []);
    renderLanguageSwitcher(pageConfig.locales, lang);
  }

  function init(config) {
    pageConfig = config;
    render(resolveLanguage(config.locales));
  }

  window.AyahLegal = {
    init,
  };
})();
