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

## Deploy (Netlify) — WICHTIG für Build-Minuten
- Gehostet auf **Netlify**, deployt automatisch bei `git push` auf `main`. **Kein Build-Befehl** (reine Datei-Auslieferung).
- Netlify-Gratistarif: **300 Build-Minuten/Monat** (Reset monatlich). Jeder Push = ein Deploy = Repo-Klon.
- **Änderungen bündeln und nur EINMAL pro Arbeitsblock pushen** — nicht nach jeder Kleinigkeit.
- Das Repo wurde bewusst **squash-bereinigt** (Historie zu 1 Commit), um die Klon-Größe zu senken.
  **Keine großen Bild-Archive oder Dubletten committen.**
