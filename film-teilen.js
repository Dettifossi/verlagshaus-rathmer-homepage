/* Film teilen: setzt unter jedes Video einer Seite die Knöpfe "Film teilen" und "Link kopieren" (Teilen-Fenster des Telefons, sonst Link kopieren).
   Der Link führt auf die Seite selbst und springt zum Film (#film, #film2 ...), mit Kennung utm_source=teilen. */
(function(){
  var de=(document.documentElement.lang||'de').slice(0,2)!=='en';
  var L=de?{share:'Film teilen',copy:'Link kopieren',ok:'Link kopiert.',fail:'Bitte den Link selbst kopieren: ',text:'Ein Film von Verlagshaus Rathmer.'}
          :{share:'Share the film',copy:'Copy link',ok:'Link copied.',fail:'Please copy the link yourself: ',text:'A film from Verlagshaus Rathmer.'};
  function isDark(el){var c=el;while(c&&c.nodeType===1){var bg=getComputedStyle(c).backgroundColor,m=bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
      if(m&&(m[4]===undefined||+m[4]>0.5)){return (0.299*m[1]+0.587*m[2]+0.114*m[3])<110}c=c.parentElement}return false}
  function init(){
    if(document.getElementById('shareFilm'))return;                 // Seiten mit eigenen Knöpfen (Begegnung)
    var vids=[].slice.call(document.querySelectorAll('video'));
    vids.forEach(function(v,i){
      var box=v.parentElement; if(!box||box===document.body)return;
      var id=i?('film'+(i+1)):'film';
      if(document.getElementById(id)&&document.getElementById(id)!==box)id='film-'+(i+1);
      if(!box.id)box.id=id; else id=box.id;
      var url=location.origin+location.pathname+'?utm_source=teilen&utm_medium=film#'+id;
      var bar=document.createElement('div');bar.className='ft-bar';bar.style.cssText='display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;margin:.7rem 0 .2rem';
      var msg=document.createElement('p');msg.className='ft-msg';msg.setAttribute('aria-live','polite');msg.style.cssText='text-align:center;font-size:.9rem;min-height:1.2em;margin:.1rem 0 .6rem';
      var dark=isDark(box);
      function mk(t,fn,filled){var b=document.createElement('button');b.type='button';b.textContent=t;
        var bg=dark?'#f1e8d4':'#2b2b2b',fg=dark?'#1d1a16':'#fff';
        b.style.cssText='cursor:pointer;font:inherit;font-weight:600;font-size:.95rem;padding:.55rem 1.1rem;border-radius:8px;'+(filled?('border:1.5px solid '+bg+';background:'+bg+';color:'+fg):'border:1.5px solid currentColor;background:transparent;color:inherit');
        b.onclick=fn;return b}
      function copy(){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){msg.textContent=L.ok},function(){msg.textContent=L.fail+url})}else{msg.textContent=L.fail+url}}
      function share(){var T=document.title.replace(/\s*[–|-]\s*Verlagshaus Rathmer\s*$/,'');if(navigator.share){navigator.share({title:T,text:L.text,url:url}).catch(function(){})}else copy()}
      bar.appendChild(mk(L.share,share,true));bar.appendChild(mk(L.copy,copy,false));
      box.parentNode.insertBefore(bar,box.nextSibling);bar.parentNode.insertBefore(msg,bar.nextSibling);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
