/* Meta Pixel erst nach Zustimmung laden (englische Kompass-Seiten) */
(function(){
  var KEY='vr-meta-consent', ID='1986981181534868';
  var script=document.currentScript, buy=script.getAttribute('data-purchase')==='1';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function put(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function load(){
    if(window.fbq)return;
    var n=window.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    window._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];
    var t=document.createElement('script');t.async=true;t.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(t);
    n('init',ID);n('track','PageView');
    if(buy)n('track','Purchase',{value:89,currency:'USD'});
  }
  function dropCookies(){
    var h=location.hostname.split('.').slice(-2).join('.');
    ['_fbp','_fbc'].forEach(function(c){['','; domain=.'+h].forEach(function(d){document.cookie=c+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'+d})});
  }
  function banner(){
    if(document.getElementById('vr-consent'))return;
    var b=document.createElement('div');b.id='vr-consent';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie consent');
    b.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:3000;max-width:620px;margin:0 auto;background:#fbf9f3;color:#2c2a27;border:1px solid #a8872d;border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,.35);padding:14px 16px;font-size:15px;line-height:1.5;text-align:left';
    b.innerHTML='<p style="margin:0 0 10px;color:#2c2a27">May we use the Meta Pixel (Facebook/Instagram) to measure our advertising? It sends data to Meta and sets cookies, and it only loads if you accept. <a href="privacy-en.html" style="color:#7a5f1c;text-decoration:underline">Privacy policy</a></p><div style="display:flex;gap:10px"></div>';
    [['Decline','denied'],['Accept','granted']].forEach(function(x){
      var k=document.createElement('button');k.type='button';k.textContent=x[0];
      k.style.cssText='flex:1;padding:10px;border-radius:8px;border:1.5px solid #2c2a27;background:#2c2a27;color:#fbf9f3;font:inherit;font-weight:700;cursor:pointer';
      k.addEventListener('click',function(){
        var had=!!window.fbq;put(x[1]);b.remove();
        if(x[1]==='granted')load();else{dropCookies();if(had){window.fbq('consent','revoke');location.reload()}}
      });
      b.lastChild.appendChild(k);
    });
    document.body.appendChild(b);
  }
  function start(){
    document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-consent-open]');if(a){e.preventDefault();banner()}});
    var l=document.createElement('p');l.style.cssText='text-align:center;margin:0;padding:10px;font-size:14px';
    l.innerHTML='<a href="#" data-consent-open style="color:#7a5f1c;text-decoration:underline">Cookie settings</a>';
    document.body.appendChild(l);
    if(get()==='granted')load();else if(get()!=='denied')banner();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
