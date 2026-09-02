(function () {
  "use strict";
  const supported = ["en", "tr", "es", "de", "fr", "pt-BR"];
  const match = value => {
    const primary = String(value || "").toLowerCase().replace(/_/g, "-").split("-")[0];
    return primary === "pt" ? "pt-BR" : supported.includes(primary) ? primary : null;
  };
  const url = new URL(window.location.href);
  const requested = url.searchParams.get("lang");
  const language = requested !== null
    ? match(requested) || "en"
    : [...(navigator.languages || []), navigator.language].map(match).find(Boolean) || "en";
  if (language === "en") return;
  const target = new URL(`${language}/`, url);
  target.hash = url.hash;
  window.location.replace(target.href);
}());
