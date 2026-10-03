/* Bagus Dev Studio — Global Header Controller */
(function(){
  function init(){
    document.querySelectorAll('header').forEach(function(header){
      if(header.dataset.bdsReady) return;
      header.dataset.bdsReady='1';
      header.classList.add('bds-header');
      var wrap=header.querySelector('.max-w-7xl');
      if(!wrap) return;
      var utility=document.createElement('div');
      utility.className='bds-utility';
      utility.innerHTML='<div class="bds-utility-inner"><a href="index.html"><i class="fa-solid fa-globe"></i> Bahasa</a><a href="index.html"><i class="fa-solid fa-coins"></i> IDR</a><a href="index.html"><i class="fa-solid fa-mobile-screen-button"></i> App</a><a href="faq.html"><i class="fa-regular fa-circle-question"></i> Bantuan</a><a href="index.html#recent"><i class="fa-regular fa-clock"></i> Recently Viewed</a><a href="register.html">Daftar</a><a href="login.html">Masuk</a></div>';
      header.insertBefore(utility,header.firstChild);
      var row=wrap.firstElementChild;
      if(row) row.classList.add('bds-mainbar');
      var nav=header.querySelector('nav');
      var actions=row && row.querySelector('.flex.items-center.gap-4');
      var toggle=document.createElement('button');
      toggle.type='button'; toggle.className='bds-menu-toggle'; toggle.setAttribute('aria-label','Buka menu'); toggle.setAttribute('aria-expanded','false');
      toggle.innerHTML='<i class="fa-solid fa-bars"></i>';
      if(actions) actions.appendChild(toggle); else row && row.appendChild(toggle);
      var panel=document.createElement('div'); panel.className='bds-mobile-panel';
      var navClone=nav?nav.cloneNode(true):document.createElement('nav');
      panel.appendChild(navClone);
      var tools=document.createElement('div'); tools.className='bds-mobile-tools';
      tools.innerHTML='<a href="index.html"><i class="fa-solid fa-globe"></i>&nbsp; Bahasa</a><a href="index.html"><i class="fa-solid fa-coins"></i>&nbsp; IDR</a><a href="faq.html"><i class="fa-regular fa-circle-question"></i>&nbsp; Bantuan</a><a href="index.html#recent"><i class="fa-regular fa-clock"></i>&nbsp; Recently Viewed</a><a href="register.html"><i class="fa-regular fa-user"></i>&nbsp; Daftar</a><a href="login.html"><i class="fa-solid fa-right-to-bracket"></i>&nbsp; Masuk</a>';
      panel.appendChild(tools); wrap.appendChild(panel);
      toggle.addEventListener('click',function(){
        var open=panel.classList.toggle('is-open'); toggle.setAttribute('aria-expanded',String(open));
        toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
      });
      panel.addEventListener('click',function(e){if(e.target.closest('a')){panel.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<i class="fa-solid fa-bars"></i>'}});
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
