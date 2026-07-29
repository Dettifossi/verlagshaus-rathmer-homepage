#!/usr/bin/env python3
"""Regeneriert preview.html (Standalone-Vorschau mit eingebettetem CSS/JS) aus den Quelldateien."""
import re, os, glob

base = os.path.dirname(os.path.abspath(__file__))

def strip_exports(content):
    content = re.sub(r'^export\s+(const|let|var|function|async function|class)\s+', r'\1 ', content, flags=re.MULTILINE)
    content = re.sub(r'^export\s+\{[^}]+\}\s+from\s+[^\n]+;\n?', '', content, flags=re.MULTILINE)
    content = re.sub(r'^export\s+\{[^}]+\};\n?', '', content, flags=re.MULTILINE)
    content = re.sub(r'^import[^\n]+;\n?', '', content, flags=re.MULTILINE)
    return content

parts = []

subtype_parts = []
for path in sorted(glob.glob(f"{base}/data/subtypes/s*.js")):
    subtype_parts.append(f"// === data/subtypes/{os.path.basename(path)} ===\n" + strip_exports(open(path).read()))
subtype_parts.append(strip_exports(open(f"{base}/data/subtypes/index.js").read()))
parts.append("(function(){\n" + "\n\n".join(subtype_parts) + "\nwindow._subtypeDetails = subtypeDetails;\n})();")
parts.append("const subtypeDetails = window._subtypeDetails;")

know_parts = [strip_exports(open(f"{base}/data/knowledge/helpers.js").read())]
for path in sorted(glob.glob(f"{base}/data/knowledge/s*.js")):
    know_parts.append(strip_exports(open(path).read()))
know_parts.append(strip_exports(open(f"{base}/data/knowledge/index.js").read()))
parts.append("(function(){\n" + "\n\n".join(know_parts) + "\nwindow._knowledgeSubtypes = knowledgeSubtypes;\n})();")
parts.append("const knowledgeSubtypes = window._knowledgeSubtypes;")

for fname in [
    "data/de.js", "data/impulse.js", "data/tagesimpulse.js",
    "data/typentest.js", "data/motivtest.js", "data/diagnosetest.js",
    "data/beziehungspaarungen.js", "data/differenzierungen.js",
    "data/register.js", "data/tierentsprechungen.js", "data/verhalten.js",
    "data/quiz.js",
    "data/zitate.js",
]:
    parts.append(strip_exports(open(f"{base}/{fname}").read()))

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
<script>
{script_body}
</script>
</body>
</html>
"""

out = f"{base}/preview.html"
open(out, "w", encoding="utf-8").write(html)
print(f"✓ preview.html: {len(html)//1024} KB")
