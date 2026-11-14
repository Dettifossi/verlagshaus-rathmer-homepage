/* Kleiner Hörtipp des Autors zu ausgewählten Büchern (eigene Stimme), nur auf Knopfdruck. */
(function(){
  var TIPS=['hinter-der-leidenschaft','wenn-die-stille-brennt','der-raum-hinter-allem'];
  var m=location.pathname.match(/\/buch\/([^\/]+)\.html$/),q=new URLSearchParams(location.search).get('slug');
  var slug=m?m[1]:q;if(!slug||TIPS.indexOf(slug)<0)return;
  var audio=null,btn=null,L1='\u{1F508} Der Autor zum Buch',L2='■ Beenden';
  function stop(){if(audio){audio.pause();audio=null}if(btn)btn.textContent=L1}
  function make(){
    var b=document.createElement('button');b.type='button';b.id='autor-tipp';b.textContent=L1;
    b.style.cssText="font:inherit;font-size:1rem;font-weight:600;margin:.5rem 0 1.1rem;padding:.7rem 1.4rem;border-radius:999px;border:1px solid var(--gold-dark,#A8872D);background:var(--gold-dark,#A8872D);color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)";
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
