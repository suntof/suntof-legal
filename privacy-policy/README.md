# Legal Pages

This repo now carries the full hosted legal surface for Ayah AI:

- `docs/privacy-policy/index.html`
- `docs/terms-of-use/index.html`
- `docs/support/index.html`
- shared assets under `docs/legal-site/`

## 1) Edit required placeholders

Open the relevant legal page and update shared values if needed:

- `COMPANY_NAME`
- `APP_NAME`
- `SUPPORT_EMAIL`
- canonical hosted URLs (`privacy-policy`, `terms-of-use`, `support`)

## 2) Supported languages

Current languages across all hosted legal pages:

- `tr` (Turkce)
- `en` (English)
- `ar` (Arabic)
- `ur` (Urdu)
- `id` (Indonesian)
- `fr` (French)
- `de` (German)
- `ru` (Russian)
- `es` (Spanish)
- `az` (Azerbaijani)
- `bs` (Bosnian)
- `fa` (Persian)

Language can be selected by query parameter:

- `?lang=tr`
- `?lang=en`
- `?lang=ar`
- `?lang=ur`
- `?lang=id`
- `?lang=fr`
- `?lang=de`
- `?lang=ru`
- `?lang=es`
- `?lang=az`
- `?lang=bs`
- `?lang=fa`

Browser language is used as fallback.

## 3) Add a new language later

Add the new locale entry in each legal page that should support it and wire the label in `docs/legal-site/site.js`.

```js
locales.de = {
  title: "...",
  updated: "...",
  intro: "...",
  sections: [...]
};
```

If the language should appear in the switcher, add its label and order entry in `site.js`.

## 4) Hosting

Primary host:

- `https://suntof.github.io/suntof-legal/`

Canonical URLs:

- `https://suntof.github.io/suntof-legal/privacy-policy/`
- `https://suntof.github.io/suntof-legal/terms-of-use/`
- `https://suntof.github.io/suntof-legal/support/index.html`

To refresh the deploy bundle from this repo:

```powershell
.\scripts\export_legal_site.ps1
```

## 5) Play Console field

In Google Play / App Store metadata, use the final public URLs for:

- Privacy Policy
- Terms of Use
- Support
