/* Bücherregal: läuft von allein, lässt sich mit Maus/Finger ziehen und läuft nach dem Loslassen weiter */
(function(){
  var row=document.querySelector('.hero-shelf-row'); if(!row) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var x=0,w=0,v=0,drag=false,sx=0,sxo=0,moved=0,last=0,lastX=0,vel=0,auto=reduce?0:-40; // px/s
  function init(){var s=parseFloat(row.style.getPropertyValue('--shelf-w'));if(!s){return setTimeout(init,300);}
    w=s;row.style.animation='none';row.style.touchAction='pan-y';row.style.cursor='grab';last=performance.now();requestAnimationFrame(tick);}
  function wrap(){if(w){while(x<=-w)x+=w;while(x>0)x-=w;}}
  function tick(t){var dt=Math.min(.05,(t-last)/1000);last=t;
    if(!drag){x+=(auto+vel)*dt;vel*=Math.pow(.04,dt);} wrap();
    row.style.transform='translate3d('+x+'px,0,0)';requestAnimationFrame(tick);}
  row.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'&&e.button!==0)return;drag=true;moved=0;sx=e.clientX;sxo=x;lastX=e.clientX;vel=0;row.style.cursor='grabbing';});
  window.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));
    if(moved>4&&!row.hasPointerCapture(e.pointerId)){try{row.setPointerCapture(e.pointerId)}catch(_){}}
    x=sxo+dx;var now=performance.now();vel=(e.clientX-lastX)/Math.max(.016,(now-(row._t||now-16))/1000)*.6;row._t=now;lastX=e.clientX;});
  function up(){if(!drag)return;drag=false;row.style.cursor='grab';vel=Math.max(-1500,Math.min(1500,vel));}
  window.addEventListener('pointerup',up);window.addEventListener('pointercancel',up);
  row.addEventListener('click',function(e){if(moved>6){e.preventDefault();e.stopPropagation();}},true);
  row.addEventListener('dragstart',function(e){e.preventDefault();});
  row.addEventListener('wheel',function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){x-=e.deltaX;e.preventDefault();}},{passive:false});
  window.addEventListener('load',function(){setTimeout(init,300)});if(document.readyState==='complete')setTimeout(init,300);
})();
/* Farbwahl im Kopfbereich (nur Optik, merkt sich die Wahl im Browser) */
(function(){var h=document.querySelector('.hero-home');if(!h)return;
 var f=[['papier','#f7f3ea','Papier'],['sand','#efe3d0','Sand'],['salbei','#e3eae0','Salbei'],['nacht','#14241f','Nacht']];
 var w=document.createElement('div');w.className='farbwahl';w.innerHTML='<span>Farbe</span>';
 function set(n){f.forEach(function(x,i){w.children[i+1].setAttribute('aria-pressed',x[0]===n)});if(n==='papier')h.removeAttribute('data-farbe');else h.setAttribute('data-farbe',n);try{localStorage.setItem('vr-farbe',n)}catch(e){}}
 f.forEach(function(x){var b=document.createElement('button');b.type='button';b.style.background=x[1];b.title=x[2];b.setAttribute('aria-label','Farbe '+x[2]);b.addEventListener('click',function(){set(x[0])});w.appendChild(b)});
 h.appendChild(w);var s='papier';try{s=localStorage.getItem('vr-farbe')||'papier'}catch(e){}set(s);})();
/* Unterseiten: Seitenmenü aus den Zwischenüberschriften */
(function(){
  if(document.querySelector('.hero-home'))return;var hero=document.querySelector('.page-hero');if(!hero)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=[].slice.call(document.querySelectorAll('.cat-subtitle'));
  if(els.length<3)els=[].slice.call(document.querySelectorAll('main h2, .container > h2')).filter(function(h){return h.textContent.trim().length>3&&h.textContent.trim().length<60});
  var seen={},items=[];
  els.forEach(function(h){var t=h.textContent.replace(/^✦\s*/,'').trim().replace(/\s+/g,' ');if(seen[t])return;seen[t]=1;if(!h.id)h.id='abschnitt-'+(items.length+1);items.push({id:h.id,label:t.length>34?t.slice(0,32).replace(/\s+\S*$/,'')+'…':t,el:h})});
  if(items.length<3)return;
  var nav=document.createElement('nav');nav.className='seitenmenue';var EN=document.documentElement.lang==='en'?'On this page':'Auf dieser Seite';nav.setAttribute('aria-label',EN);
  var inner=document.createElement('div');inner.className='seitenmenue__in';inner.innerHTML='<span class="seitenmenue__label">'+EN+'</span>';
  var hdr=document.querySelector('.site-nav');
  items.forEach(function(i){var a=document.createElement('a');a.href='#'+i.id;a.textContent=i.label;a.addEventListener('click',function(e){e.preventDefault();var h=(hdr?hdr.offsetHeight:60)+nav.offsetHeight;scrollTo({top:i.el.getBoundingClientRect().top+scrollY-h-12,behavior:reduce?'auto':'smooth'});history.replaceState(null,'','#'+i.id)});i.a=a;inner.appendChild(a)});
  nav.appendChild(inner);hero.parentNode.insertBefore(nav,hero.nextSibling);
  function pos(){nav.style.top=(hdr?hdr.offsetHeight:60)+'px'}pos();addEventListener('resize',pos);
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){items.forEach(function(i){i.a.classList.toggle('aktiv',i.el===e.target)})}})},{rootMargin:'-20% 0px -70% 0px'});items.forEach(function(i){io.observe(i.el)})}
})();
/* App-Regal: erst alle Apps in Fächern auf einen Blick, dann in ein Fach hinein. Alle Karten bleiben im Dokument. */
function regal(liste,gruppen,ids,P,EN,esc){
  var lis=[].slice.call(liste.children),pos=0,F=[];
  gruppen.forEach(function(g){var a=(g.apps||[]).filter(function(x){return ids.indexOf(x)>=0});if(!a.length)return;F.push({name:EN?(g.name_en||g.name):g.name,apps:a,lis:a.map(function(x){return lis[ids.indexOf(x)]})});pos+=a.length});
  if(pos!==ids.length)return;
  function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e}
  var kasten=el('div','regal'),uebersicht=el('div','regal__faecher'),innen=el('div','regal__innen');
  var zurueck=el('button','regal__zurueck',EN?'← All apps':'← Alle Apps'),reiter=el('div','regal__reiter');zurueck.type='button';
  innen.appendChild(zurueck);innen.appendChild(reiter);innen.hidden=true;
  var panels=[],tasten=[],faecher=[],offen=-1;
  function zeig(n){var alt=offen;offen=n;uebersicht.hidden=n>=0;innen.hidden=n<0;
    panels.forEach(function(p,i){p.hidden=i!==n;tasten[i].setAttribute('aria-pressed',i===n)});
    var ziel=n<0?faecher[alt]:tasten[n];if(ziel)ziel.focus({preventScroll:true});
    if(kasten.getBoundingClientRect().top<0)kasten.scrollIntoView()}
  F.forEach(function(f,i){
    var n=f.apps.length+' Apps';
    var b=el('button','regal__fach','<span class="regal__kopf">'+esc(f.name)+'<small>'+n+'</small></span><span class="regal__icons">'+f.apps.map(function(x){var p=P[x],t=esc(EN?p.name_en:p.name).replace(/"/g,'&quot;');return '<img src="'+p.icon+'" alt="'+t+'" title="'+t+'" width="96" height="96" loading="lazy">'}).join('')+'</span><span class="regal__mehr">'+(EN?'Open compartment →':'Fach öffnen →')+'</span>');
    b.type='button';if(f.apps.length>8)b.classList.add('regal__fach--gross');b.onclick=function(){zeig(i)};uebersicht.appendChild(b);faecher.push(b);
    var r=el('button','',esc(f.name));r.type='button';r.onclick=function(){zeig(i)};reiter.appendChild(r);tasten.push(r);
    var ul=el('ul',liste.className+' regal__karten');ul.setAttribute('aria-label',f.name);ul.hidden=true;f.lis.forEach(function(li){ul.appendChild(li)});innen.appendChild(ul);panels.push(ul)});
  zurueck.onclick=function(){zeig(-1)};
  kasten.addEventListener('keydown',function(e){if(e.key==='Escape'&&offen>=0)zeig(-1)});
  kasten.appendChild(uebersicht);kasten.appendChild(innen);liste.parentNode.insertBefore(kasten,liste);liste.hidden=true;liste.style.display='none';
}
/* App-Streifen aus verknuepfungen.json: neue Apps erscheinen automatisch (Eintrag mit icon und kurz) */
(function(){
  var liste=document.getElementById('vr-apps-liste');if(!liste||!window.fetch)return;
  var EN=document.documentElement.lang==='en';
  var Z=EN?['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen']:['Null','Eine','Zwei','Drei','Vier','Fünf','Sechs','Sieben','Acht','Neun','Zehn','Elf','Zwölf','Dreizehn','Vierzehn','Fünfzehn'];
  fetch('verknuepfungen.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(d){
    var P=d.produkte;function ok(i){var p=P[i];return p&&p.icon&&!p.extern&&(!EN||p.name_en)}
    var ids=(d.reihenfolge_apps||[]).filter(ok);
    Object.keys(P).forEach(function(i){if(ok(i)&&ids.indexOf(i)<0)ids.push(i)});
    if(!ids.length)return;
    function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    liste.innerHTML=ids.map(function(i){var p=P[i];var href=EN?p.href_en:p.href,name=EN?p.name_en:p.name,kurz=EN?(p.kurz_en||p.text_en):(p.kurz||p.text);if(p.bald&&!p.href)return '<li><div class="vr-app vr-app--bald"><img src="'+p.icon+'" alt="" width="64" height="64" loading="lazy"><span class="vr-app__name">'+esc(name).replace(/-/g,'-<wbr>')+'</span><span class="vr-app__kurz">'+esc(kurz)+'</span><span class="vr-app__schild"'+((EN?p.erkl_en:p.erkl)?' title="'+esc(EN?p.erkl_en:p.erkl)+'"':'')+'>'+(p.glyph==='anker'?'<svg class="vr-flagge" width="11" height="13" viewBox="0 0 14 16" aria-hidden="true"><circle cx="7" cy="3" r="1.7" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 4.7V14M4.4 7.2h5.2M1.8 10.2c.3 2.5 2.6 3.8 5.2 3.8s4.9-1.3 5.2-3.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>':'<svg class="vr-flagge" width="11" height="13" viewBox="0 0 14 16" aria-hidden="true"><path d="M2 1v14" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M2.8 1.5L13 4.8 2.8 8.5z" fill="currentColor"/></svg>')+''+esc(EN?p.schild_en:p.schild)+'</span><span class="vr-app__bald">'+(EN?'In preparation':'In Vorbereitung')+'</span></div></li>';
    return '<li><a class="vr-app" href="'+href+'"><img src="'+p.icon+'" alt="" width="64" height="64" loading="lazy"><span class="vr-app__name">'+esc(name).replace(/-/g,'-<wbr>')+'</span><span class="vr-app__kurz">'+esc(kurz)+'</span>'+((EN?p.schild_en:p.schild)?'<span class="vr-app__schild"'+((EN?p.erkl_en:p.erkl)?' title="'+esc(EN?p.erkl_en:p.erkl)+'"':'')+'>'+(p.glyph==='anker'?'<svg class="vr-flagge" width="11" height="13" viewBox="0 0 14 16" aria-hidden="true"><circle cx="7" cy="3" r="1.7" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 4.7V14M4.4 7.2h5.2M1.8 10.2c.3 2.5 2.6 3.8 5.2 3.8s4.9-1.3 5.2-3.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>':'<svg class="vr-flagge" width="11" height="13" viewBox="0 0 14 16" aria-hidden="true"><path d="M2 1v14" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M2.8 1.5L13 4.8 2.8 8.5z" fill="currentColor"/></svg>')+''+esc(EN?p.schild_en:p.schild)+'</span>':'')+'</a></li>'}).join('');
    var nLive=ids.filter(function(i){return !P[i].bald}).length;liste.style.setProperty('--cols',ids.length<=6?ids.length:Math.ceil(ids.length/2));
    var h=document.getElementById('vr-apps-titel');if(h)h.textContent=EN?'Rathmer’s App Shelf':'Rathmers App-Regal';
    if(d.gruppen&&d.gruppen.length)regal(liste,d.gruppen,ids,P,EN,esc);
  }).catch(function(){});
})();

/* Sprachumschalter immer sichtbar (ohne Menü aufzuklappen) */
(function(){
  var a=document.querySelector('.lang-switch a'),inner=document.querySelector('.nav-inner');
  if(!a||!inner||inner.querySelector('.lang-quick'))return;
  var q=document.createElement('a');q.className='lang-quick';q.href=a.getAttribute('href');
  var hl=a.getAttribute('hreflang')||'';if(hl){q.setAttribute('hreflang',hl);q.setAttribute('lang',hl)}
  q.textContent=(a.textContent.match(/[A-Za-z]{2}/)||['EN'])[0].toUpperCase();
  q.setAttribute('aria-label',hl==='en'?'English version':(hl==='de'?'Deutsche Version':'Language'));
  var sw=inner.querySelector('.site-switcher');
  if(sw)inner.insertBefore(q,sw);else inner.appendChild(q);
})();
