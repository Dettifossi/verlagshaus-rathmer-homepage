# CLAUDE.md — Verlagshaus Rathmer Homepage

## Ziel des Projekts
Website des Verlagshaus Rathmer (Domain: **verlagshausrathmer.com**). Stellt Bücher zu
Enneagramm, Homöopathie und persönlicher Entwicklung vor und verkauft sie online.
Querverlinkt mit der Naturheilpraxis-Website (Site-Switcher).

## Technik
- Statische Website: **reines HTML/CSS/JS, kein Framework, kein Build-Prozess**.
- Design über CSS-Variablen in `styles.css` (`--cream`, `--anthracite`, `--gold`, `--gold-dark`, `--gray-mid`).
- Schrift **EB Garamond** (geladen per `@import` aus Google Fonts in `styles.css`).
- Cache-Busting über `?v=N` an CSS/JS-Links (CSS aktuell `v=11`, `animations.js v=3`). Bei CSS-Änderung Version erhöhen.
- Buchdaten zentral in **`buecher-daten.js`** (Felder u. a. `cover`, `coverFallback`, `gallery`, `stripeKey`).
- Bilder liegen lokal unter **`images/`** (aus altem WordPress migriert). **Keine externen `wp-content`-URLs** verwenden.
- Lokal starten: `python3 -m http.server 8000`.

## Verkauf / Stripe
- Checkout über **`stripe-checkout.html`**; Zuordnung Produkt → Stripe Payment Link in `STRIPE_LINKS`.
- Zahlung läuft über Stripe **Payment Links** (`buy.stripe.com/...`) — diese öffentlichen Links dürfen im Code stehen.
- **NIEMALS Stripe-API-Keys (`rk_live...`, `sk_live...`) in Chat oder Code posten — ausschließlich in `.env` (ist in `.gitignore`).**
- Bezahl-Button heißt rechtlich korrekt **„Zahlungspflichtig bestellen"** (§ 312j BGB).
- Bei **digitalen Produkten** (Liste `DIGITAL` in `stripe-checkout.html`) muss die **Widerrufs-Zustimmungs-Checkbox** erhalten bleiben — Button erst nach Ankreuzen aktiv.

## Rechtliches (vorhanden, Pflichtangaben abgedeckt)
- `impressum.html` (§ 5 TMG, § 18 Abs. 2 MStV, Verbraucherstreitbeilegung)
- `datenschutz.html` (Art. 13 DSGVO: Netlify-Hosting, Stripe, Google Fonts)
- `agb.html` (inkl. Versand/Lieferung) und `widerruf.html` (mit Muster-Formular)
- Footer-Rechtslinks: Impressum · AGB · Widerruf · Datenschutz · Kontakt
- Hinweis: solide Standardtexte, **kein Ersatz für eine anwaltliche Prüfung**.

## Deploy (GitHub Pages)
- Gehostet auf **GitHub Pages** (Repo `Dettifossi/verlagshaus-rathmer-homepage`), Domain über die `CNAME`-Datei (`www.verlagshausrathmer.com`). Deployt automatisch bei `git push` auf `main`. **Kein Build-Befehl** (reine Datei-Auslieferung).
- GitHub Pages ist kostenlos und hat **keine monatliche Build-Minuten-Grenze** (anders als Netlify). Eine frühere, parallele Netlify-Anbindung wurde abgeklemmt — DNS zeigt auf GitHub Pages.
- Trotzdem sinnvoll: **Änderungen bündeln** und das Repo **schlank halten** (Historie squash-bereinigt; keine großen Bild-Archive oder Dubletten committen).
- `robots.txt` + `sitemap.xml` vorhanden — bei neuen Inhaltsseiten die Sitemap ergänzen.
