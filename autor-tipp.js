/* Kleiner Hörtipp des Autors zu ausgewählten Büchern (eigene Stimme), nur auf Knopfdruck. */
(function(){
  var TIPS=['hinter-der-leidenschaft','wenn-die-stille-brennt','der-raum-hinter-allem','du-bist-nicht-dein-zweifel','nichts-und-alles','heilung-als-erinnerung','sei-still-und-wisse-ich-bin-gott','in-der-tiefe-der-zeit','die-sprache-unserer-beziehungen','die-verborgene-dynamik-der-27-subtypen','wer-du-wirklich-bist-band-1','wer-du-wirklich-bist-band-2','wer-du-wirklich-bist-band-3','enneagramm-zoo','enneagramm-biochemie','enneagramm-bachblueten-therapie','meta-intelligenz','die-sprache-unserer-sexualitaet','der-code-deiner-persoenlichkeit','die-praxis-der-typbestimmung-taschenbuch','rathmer-s-grosses-enneagramm-lexikon-von-a-z-hardcover','gesichter-des-inneren-feuers-das-neue-enneagramm-buch','die-27-gesichter-der-seele-ein-psychologischer-subtypenroman','die-dynamik-der-9-enneagramm-heilmittel-gebundene-ausgabe','rathmer-s-repertorium-gebundene-ausgabe','repertorium-der-hervorstechenden-gemuetsrubriken-gebundene-a','homoeopathische-arzneimittellehre-der-single-rubriken-aus-de','enneagramm-homoeopathie-band-1','enneagramm-homoeopathie-band-2','lehrbuch-der-enneagramm-homoeopathie-band-1-taschenbuch','lehrbuch-der-enneagramm-homoeopathie-band-2-taschenbuch','lehrbuch-der-enneagramm-homoeopathie-band-3-taschenbuch','das-grosse-eh-repertorium-gebunden','das-grosse-eh-repertorium-ebook'],AL={'wer-du-wirklich-bist-band-2':'wer-du-wirklich-bist-band-1','wer-du-wirklich-bist-band-3':'wer-du-wirklich-bist-band-1','enneagramm-homoeopathie-band-2':'enneagramm-homoeopathie-band-1','lehrbuch-der-enneagramm-homoeopathie-band-2-taschenbuch':'lehrbuch-der-enneagramm-homoeopathie-band-1-taschenbuch','lehrbuch-der-enneagramm-homoeopathie-band-3-taschenbuch':'lehrbuch-der-enneagramm-homoeopathie-band-1-taschenbuch','das-grosse-eh-repertorium-ebook':'das-grosse-eh-repertorium-gebunden'};
  var m=location.pathname.match(/\/buch\/([^\/]+)\.html$/),q=new URLSearchParams(location.search).get('slug');
  var slug=m?m[1]:q;if(!slug||TIPS.indexOf(slug)<0)return;
  var audio=null,btn=null,L1='\u{1F508} Der Autor zum Buch',L2='■ Beenden';
  function stop(){if(audio){audio.pause();audio=null}if(btn)btn.textContent=L1}
  function make(){
    var b=document.createElement('button');b.type='button';b.id='autor-tipp';b.textContent=L1;
    b.style.cssText="font:inherit;font-size:1rem;font-weight:600;margin:.5rem 0 1.1rem;padding:.7rem 1.4rem;border-radius:999px;border:1px solid var(--gold-dark,#A8872D);background:var(--gold-dark,#A8872D);color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)";
    b.onclick=function(){if(audio){stop();return}audio=new Audio('/audio/buchtipps/'+(AL[slug]||slug)+'-de.mp3?v=1');b.textContent=L2;audio.onended=stop;audio.onerror=stop;audio.play().catch(stop)};
    btn=b;return b;
  }
  function place(){
    if(document.getElementById('autor-tipp'))return true;
    var p=document.querySelector('.buch-price');if(!p)return false;
    p.parentNode.insertBefore(make(),p);return true;
  }
  if(!place()){var mo=new MutationObserver(function(){if(place())mo.disconnect()});mo.observe(document.documentElement,{childList:true,subtree:true})}
})();
