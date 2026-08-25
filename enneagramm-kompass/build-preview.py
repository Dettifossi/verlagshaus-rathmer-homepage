#!/usr/bin/env python3
"""Regeneriert preview.html (Standalone-Vorschau mit eingebettetem CSS/JS) aus den Quelldateien.

Spiegelt exakt die Script-Reihenfolge des echten index.html: bundle.js ist seit der
Modularisierung bereits vollstaendig selbstenthaltend (keine import/export-Statements
mehr, subtypeDetails/knowledgeSubtypes/registerEntries sind direkt inline enthalten).
Die separaten data/subtypes/*.js und data/knowledge/*.js NICHT mehr zusaetzlich
einbinden - das wuerde subtypeDetails/knowledgeSubtypes doppelt deklarieren
(SyntaxError: Identifier 'subtypeDetails' has already been declared).
"""
import re, os

base = os.path.dirname(os.path.abspath(__file__))

def strip_exports(content):
    content = re.sub(r'^export\s+(const|let|var|function|async function|class)\s+', r'\1 ', content, flags=re.MULTILINE)
    content = re.sub(r'^export\s+\{[^}]+\}\s+from\s+[^\n]+;\n?', '', content, flags=re.MULTILINE)
    content = re.sub(r'^export\s+\{[^}]+\};\n?', '', content, flags=re.MULTILINE)
    content = re.sub(r'^import[^\n]+;\n?', '', content, flags=re.MULTILINE)
    return content

parts = []

# bundle.js laeuft live als <script type="module"> mit eigenem Top-Level-Scope und
# enthaelt bereits eigene inline Kopien von quizData/zitateData/subtypeDetails/
# knowledgeSubtypes/registerEntries - quiz.js/zitate.js NICHT zusaetzlich einbinden
# (sonst doppelte Deklaration im flachen <script>-Kontext von preview.html).
# Nur changelog.js wird von bundle.js per "typeof CHANGELOG" erwartet, nicht inline.
parts.append(strip_exports(open(f"{base}/data/changelog.js").read()))

app_js = open(f"{base}/app.js").read()
app_js = re.sub(r'^import[^\n]+;\n?', '', app_js, flags=re.MULTILINE)
parts.append("// === app.js ===\n" + app_js)

script_body = "\n\n".join(parts)
css = open(f"{base}/styles.css").read()

html = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Enneagramm-Heilungskompass</title>
<style>
{css}
</style>
</head>
<body>
<div id="app"></div>
<script type="module">
{script_body}
</script>
</body>
</html>
"""

out = f"{base}/preview.html"
open(out, "w", encoding="utf-8").write(html)
print(f"✓ preview.html: {len(html)//1024} KB")
