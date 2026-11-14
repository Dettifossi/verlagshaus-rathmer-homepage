#!/bin/bash
cd "$(dirname "$0")" && git push && echo "Veröffentlicht. Die Seite ist in etwa einer Minute aktuell."
echo "Beliebige Taste zum Schließen."; read -n 1
