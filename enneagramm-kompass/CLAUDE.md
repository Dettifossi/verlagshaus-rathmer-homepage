# CLAUDE.md — Enneagramm-Heilungskompass

> ⚠️ **VERALTETE SPIEGELKOPIE — NICHT DIE LIVE-APP.**
> Dieser Ordner ist keine deploy-relevante Quelle. Die tatsächlich unter
> **kompass.verlagshausrathmer.com** laufende App liegt in einem **eigenen,
> separaten GitHub-Repo: `Dettifossi/enneagramm-heilungskompass`**
> (GitHub Pages, eigenes CNAME, eigener Firebase-Auth-Bereich).
> Die englische Version liegt ebenfalls dort unter `en/` (eigenes `bundle.js`,
> kein separates Repo mehr — `Dettifossi/enneagram-healing-compass` ist veraltet).
>
> Änderungen an Inhalten (Porträts, Schaubilder, Subtypen etc.) **immer im
> Repo `Dettifossi/enneagramm-heilungskompass` vornehmen**, niemals hier.
> `bundle.js` ist dort die eigentliche Quelle (nicht `app.js` — `app.js` wird
> nur per `cp bundle.js app.js` synchron gehalten, rein für Lesbarkeit/Diffs).
>
> **`preview.html`/`build-preview.py` wurden am 25.08.2026 gelöscht (nicht neu
> anlegen).** Sie erzeugten eine eigenständige HTML-Standalone-Kopie der App,
> war aber auf der Live-Seite (`kompass.html`/`kompass-en.html`) nirgends
> verlinkt — die „App-Leseprobe"-Buttons zeigen direkt auf die echte Live-App
> (`kompass.verlagshausrathmer.com/#leseprobe` bzw. `/en/#leseprobe`), die
> ohnehin immer aktuell und zweisprachig ist. Dieser ganze `enneagramm-kompass/`-
> Ordner bleibt als Spiegelkopie bestehen, ist aber ebenfalls nirgends verlinkt.
> Dieser Ordner hier wurde am 2026-07-29 versehentlich für ein Porträt-Update
> bearbeitet, bevor das echte Repo gefunden wurde — die Änderung ist harmlos,
> aber ignorierbar. Vor jeder inhaltlichen Änderung erst prüfen, ob man im
> richtigen Repo arbeitet (`git remote -v` sollte `enneagramm-heilungskompass`
> zeigen, nicht `verlagshaus-rathmer-homepage`).

## 1. Sparsamer Umgang mit Dateizugriffen

- Lies niemals eine komplette Datei vollständig ein, wenn nur ein kleiner Abschnitt relevant ist. Nutze gezielte Suche (grep, Zeilenbereiche) statt vollständiger Dateilektüre.
- Die Projektstruktur ist modularisiert:
  - `data/subtypes/` – ein File pro Subtyp (27 Dateien, z. B. `se1.js`, `so4.js`, `sx9.js`), zusammengeführt über `data/subtypes/index.js`
  - `data/knowledge/` – ein File pro Subtyp mit ausführlichem Wissensinhalt (27 Dateien), zusammengeführt über `data/knowledge/index.js`
- Bei Anfragen zu einem bestimmten Subtyp (z. B. „SE1"): **ausschließlich** die jeweilige Einzeldatei in `data/subtypes/` bzw. `data/knowledge/` öffnen und bearbeiten. `index.js`-Dateien und andere Subtyp-Dateien nicht anfassen, außer ausdrücklich verlangt.
- Neue Inhalte zu einem Subtyp gehören in die jeweilige Einzeldatei — **niemals** zurück in eine zentrale Sammeldatei wie `de.js`.

## 2. Antwortverhalten

- Knapp und konkret. Keine Wiederholungen, keine ausführlichen Zusammenfassungen, außer ausdrücklich gewünscht.
- Bei Code-Änderungen niemals den vollständigen Dateiinhalt zurückgeben — nur den geänderten Ausschnitt (Diff-Stil).
- Bei mehrdeutigen Anfragen (z. B. unklarer Dateipfad): kurz nachfragen, statt das gesamte Verzeichnis zu durchsuchen.

## 3. Großdatei-Regel

- Wächst eine Datei über ~50.000 Token: aktiv darauf hinweisen und Aufteilung nach demselben Muster vorschlagen (Einzeldateien + Index), bevor weitergearbeitet wird.

## 4. Tests

- Nach strukturellen Änderungen (neue Dateien, Importe): kurzer lokaler Funktionstest (`python3 -m http.server 4174`), um sicherzustellen, dass die App weiterhin lädt.
- Bei reinen Textänderungen: kein Test nötig.

## Technik

- Statische SPA: HTML/CSS/JS, kein Framework, kein Build.
- Routen u. a.: `#start`, `#knowledge`, `#subtype/<code>` (z. B. `#subtype/SE1`).
- Lokal starten: `python3 -m http.server 4174`.
- CSS-Variablen: `--copper`, `--paper`, `--ink`, `--muted`, `--line`.
- Neue Inhalte in `data/subtypes/` oder `data/knowledge/`, NIE zurück in `de.js`.

## Inhaltsregeln

- **Keine erfundenen Zuordnungen.** Fachliche Inhalte nur aus belegten Quellen übernehmen.
- Anhänge / Originalquellen haben Vorrang.
- Unsichere Inhalte als `needs_review` markieren — nicht erfinden, nicht raten.
- Zwei getrennte Ebenen sauber halten: **Leidenschaft** und **Wunde** (`woundBehindPassion`). Nicht vermischen.

## Sprache & Stil

- App-Texte auf Deutsch, mit korrekten Umlauten und deutscher Typografie.
- Bei JS-Strings: keine deutschen Anführungszeichen `„"` wenn das schließende `"` U+0022 ist — Syntaxfehler. Stattdessen `›...‹` für Zitate innerhalb von Strings verwenden.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
