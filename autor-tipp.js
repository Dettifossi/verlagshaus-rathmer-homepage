/* Kleiner Hörtipp des Autors zu ausgewählten Büchern (eigene Stimme), nur auf Knopfdruck. */
(function(){
  var TIPS=['hinter-der-leidenschaft','wenn-die-stille-brennt','der-raum-hinter-allem'];
  var m=location.pathname.match(/\/buch\/([^\/]+)\.html$/),q=new URLSearchParams(location.search).get('slug');
  var slug=m?m[1]:q;if(!slug||TIPS.indexOf(slug)<0)return;
  var audio=null,btn=null,L1='\u{1F508} Der Autor zum Buch',L2='■ Beenden';
  function stop(){if(audio){audio.pause();audio=null}if(btn)btn.textContent=L1}
  function make(){
    var b=document.createElement('button');b.type='button';b.id='autor-tipp';b.textContent=L1;
    b.style.cssText="font:inherit;font-size:.9rem;margin:.4rem 0 1rem;padding:.55rem 1.1rem;border-radius:999px;border:1px solid var(--gold,#b8963e);background:transparent;color:var(--gold,#b8963e);cursor:pointer";
    b.onclick=function(){if(audio){stop();return}audio=new Audio('/audio/buchtipps/'+slug+'-de.mp3?v=1');b.textContent=L2;audio.onended=stop;audio.onerror=stop;audio.play().catch(stop)};
    btn=b;return b;
  }
  function place(){
    if(document.getElementById('autor-tipp'))return true;
    var p=document.querySelector('.buch-price');if(!p)return false;
    p.parentNode.insertBefore(make(),p);return true;
  }
  if(!place()){var mo=new MutationObserver(function(){if(place())mo.disconnect()});mo.observe(document.documentElement,{childList:true,subtree:true})}
})();
