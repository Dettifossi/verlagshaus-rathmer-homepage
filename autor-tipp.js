/* Kleiner Hörtipp des Autors zu ausgewählten Büchern (eigene Stimme), nur auf Knopfdruck. */
(function(){
  var TIPS=['hinter-der-leidenschaft','wenn-die-stille-brennt','der-raum-hinter-allem','du-bist-nicht-dein-zweifel','nichts-und-alles','heilung-als-erinnerung','sei-still-und-wisse-ich-bin-gott','in-der-tiefe-der-zeit','die-sprache-unserer-beziehungen','die-verborgene-dynamik-der-27-subtypen','wer-du-wirklich-bist-band-1','wer-du-wirklich-bist-band-2','wer-du-wirklich-bist-band-3','enneagramm-zoo','enneagramm-biochemie','enneagramm-bachblueten-therapie','meta-intelligenz','die-sprache-unserer-sexualitaet','der-code-deiner-persoenlichkeit','die-praxis-der-typbestimmung-taschenbuch','rathmer-s-grosses-enneagramm-lexikon-von-a-z-hardcover','gesichter-des-inneren-feuers-das-neue-enneagramm-buch','die-27-gesichter-der-seele-ein-psychologischer-subtypenroman','die-dynamik-der-9-enneagramm-heilmittel-gebundene-ausgabe','rathmer-s-repertorium-gebundene-ausgabe','repertorium-der-hervorstechenden-gemuetsrubriken-gebundene-a','homoeopathische-arzneimittellehre-der-single-rubriken-aus-de','enneagramm-homoeopathie-band-1','enneagramm-homoeopathie-band-2','lehrbuch-der-enneagramm-homoeopathie-band-1-taschenbuch','lehrbuch-der-enneagramm-homoeopathie-band-2-taschenbuch','lehrbuch-der-enneagramm-homoeopathie-band-3-taschenbuch','das-grosse-eh-repertorium-gebunden','das-grosse-eh-repertorium-ebook','der-kern-der-heilmittel-the-core-of-the-remedies-gebunden','der-kern-der-heilmittel-the-core-of-the-remedies-ebook'],AL={'wer-du-wirklich-bist-band-2':'wer-du-wirklich-bist-band-1','wer-du-wirklich-bist-band-3':'wer-du-wirklich-bist-band-1','enneagramm-homoeopathie-band-2':'enneagramm-homoeopathie-band-1','lehrbuch-der-enneagramm-homoeopathie-band-2-taschenbuch':'lehrbuch-der-enneagramm-homoeopathie-band-1-taschenbuch','lehrbuch-der-enneagramm-homoeopathie-band-3-taschenbuch':'lehrbuch-der-enneagramm-homoeopathie-band-1-taschenbuch','das-grosse-eh-repertorium-ebook':'das-grosse-eh-repertorium-gebunden','der-kern-der-heilmittel-the-core-of-the-remedies-ebook':'der-kern-der-heilmittel-the-core-of-the-remedies-gebunden'};
  var TE={'der-kern-der-heilmittel-the-core-of-the-remedies-gebunden':'der-kern-der-heilmittel-the-core-of-the-remedies-gebunden','der-kern-der-heilmittel-the-core-of-the-remedies-ebook':'der-kern-der-heilmittel-the-core-of-the-remedies-gebunden','motivational-enneagram-type-test-english':'motivational-enneagram-type-test-english'};
  var m=location.pathname.match(/\/buch\/([^\/]+)\.html$/),q=new URLSearchParams(location.search).get('slug');
  var slug=m?m[1]:q;if(!slug)return;
  var hasDe=TIPS.indexOf(slug)>=0,hasEn=!!TE[slug];if(!hasDe&&!hasEn)return;
  var audio=null,cur=null;
  var CSS="font:inherit;font-size:1rem;font-weight:600;margin:.5rem .6rem 1.1rem 0;padding:.7rem 1.4rem;border-radius:999px;border:1px solid var(--gold-dark,#A8872D);background:var(--gold-dark,#A8872D);color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)";
  function stop(){if(audio){audio.pause();audio=null}if(cur){cur.b.textContent=cur.l1;cur=null}}
  function make(id,l1,l2,url){
    var b=document.createElement('button');b.type='button';b.id=id;b.textContent=l1;b.style.cssText=CSS;
    b.onclick=function(){var same=cur&&cur.b===b;stop();if(same)return;audio=new Audio(url);cur={b:b,l1:l1};b.textContent=l2;audio.onended=stop;audio.onerror=stop;audio.play().catch(stop)};
    return b;
  }
  function build(){
    var w=document.createElement('div');
    if(hasDe)w.appendChild(make('autor-tipp','\u{1F508} Der Autor zum Buch','\u25A0 Beenden','/audio/buchtipps/'+(AL[slug]||slug)+'-de.mp3?v=1'));
    if(hasEn)w.appendChild(make('autor-tipp-en','\u{1F508} The author on the book','\u25A0 Stop','/audio/buchtipps/'+TE[slug]+'-en.mp3?v=1'));
    return w;
  }
  function place(){
    if(document.getElementById('autor-tipp')||document.getElementById('autor-tipp-en'))return true;
    var p=document.querySelector('.buch-price');if(!p)return false;
    p.parentNode.insertBefore(build(),p);return true;
  }
  if(!place()){var mo=new MutationObserver(function(){if(place())mo.disconnect()});mo.observe(document.documentElement,{childList:true,subtree:true})}
})();
