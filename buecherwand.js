/* Bücherwand aus buecher-daten.js (Startseite) */
(function () {
  var wand = document.getElementById('ewWand');
  if (!wand || typeof BUECHER_DATEN === 'undefined') return;
  var REIHEN = 3;
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ein Cover je Bild; Bundles zeigen dasselbe Bild wie das Einzelbuch und entfallen.
  var gesehen = {}, liste = [], titel = 0;
  Object.keys(BUECHER_DATEN).forEach(function (slug) {
    var b = BUECHER_DATEN[slug];
    if (slug.indexOf('bundle-') === 0) return;
    titel++;
    if (!b.cover || gesehen[b.cover]) return;
    gesehen[b.cover] = 1;
    liste.push({ slug: slug, t: b.title, c: b.cover, f: b.coverFallback });
  });

  // feste, gemischte Reihenfolge (sonst stehen z. B. die 27 Porträts alle beieinander)
  function streu(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  liste.sort(function (a, b) { return streu(a.slug) - streu(b.slug); });

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function cover(b, klon) {
    return '<a class="ew-cover" href="buch/' + b.slug + '.html" title="' + esc(b.t) + '"' +
      (klon ? ' aria-hidden="true" tabindex="-1"' : '') + '><img src="' + esc((window.WAND_BILDER || {})[b.c] || b.c) + '" alt="' + (klon ? '' : esc(b.t)) +
      '" loading="lazy" decoding="async"' +
      (b.f ? ' onerror="this.onerror=null;this.src=\'' + esc(b.f) + '\'"' : '') + '></a>';
  }

  var html = '';
  for (var r = 0; r < REIHEN; r++) {
    var teil = liste.filter(function (_, i) { return i % REIHEN === r; });
    var inhalt = teil.map(function (b) { return cover(b, false); }).join('');
    if (!ruhig) inhalt += teil.map(function (b) { return cover(b, true); }).join('');
    // unterschiedliche Geschwindigkeit je Reihe (Sekunden je Cover)
    var dauer = Math.round(teil.length * [3.4, 4.3, 3.8][r]);
    html += '<div class="ew-reihe"><div class="ew-reihe__band" style="--ew-dauer:' + dauer + 's">' + inhalt + '</div></div>';
  }
  wand.querySelector('.ew-wand__reihen').innerHTML = html;
  wand.setAttribute('data-cover', liste.length);

  // Berühren hält die Wand an, kurz nach dem Loslassen läuft sie weiter
  var t;
  wand.addEventListener('touchstart', function () { clearTimeout(t); wand.classList.add('ew-halt'); }, { passive: true });
  wand.addEventListener('touchend', function () { clearTimeout(t); t = setTimeout(function () { wand.classList.remove('ew-halt'); }, 2500); }, { passive: true });

  // Zahlen in der Kopfzeile aus den Daten
  var zt = document.getElementById('ewTitel');
  if (zt) zt.textContent = titel;
  var za = document.getElementById('ewApps');
  if (za && window.fetch) {
    fetch('verknuepfungen.json').then(function (r) { return r.json(); }).then(function (d) {
      var n = (d.reihenfolge_apps || []).filter(function (k) { var p = d.produkte[k]; return !!p; }).length;
      if (n) za.textContent = n;
    }).catch(function () {});
  }
})();
