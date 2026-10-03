/* BAGUS DEV STUDIO — Global Header v3 */
(function(){
  "use strict";
  function initHeader(header){
    if(!header || header.dataset.bdsReady==="3") return;
    var wrap=header.querySelector(".max-w-7xl");
    if(!wrap) return;
    header.dataset.bdsReady="3";
    header.classList.add("bds-header");

    /* Normalize the brand everywhere: Bagus Dev / Studio. */
    var brand=wrap.querySelector(":scope > .bds-mainbar > a:first-child");
    if(brand){
      brand.classList.add("bds-brand");
      var mark=brand.querySelector(":scope > div:first-child");
      if(mark){mark.classList.add("bds-brand-mark");}
      var name=brand.querySelector(":scope > div:last-child");
      if(name){
        name.classList.add("bds-brand-name");
        var spans=name.querySelectorAll("span");
        if(spans[0]){spans[0].textContent="Bagus Dev";spans[0].classList.add("bds-brand-main");}
        if(spans[1]){spans[1].textContent="Studio";spans[1].classList.add("bds-brand-sub");}
      }
    }

    /* Utility row: created once, never duplicated. */
    var utility=header.querySelector(".bds-utility");
    if(!utility){
      utility=document.createElement("div");
      utility.className="bds-utility";
      utility.innerHTML='<div class="bds-utility-inner">'+
        '<a href="index.html"><i class="fa-solid fa-globe"></i><span>Bahasa</span></a>'+
        '<a href="index.html"><i class="fa-solid fa-coins"></i><span>IDR</span></a>'+
        '<a href="index.html"><i class="fa-solid fa-mobile-screen-button"></i><span>App</span></a>'+
        '<a href="faq.html"><i class="fa-regular fa-circle-question"></i><span>Bantuan</span></a>'+
        '<a href="index.html#recent"><i class="fa-regular fa-clock"></i><span>Recently Viewed</span></a>'+
        '<a href="register.html"><span>Daftar</span></a>'+
        '<a href="login.html"><span>Masuk</span></a>'+
      '</div>';
      header.insertBefore(utility,header.firstChild);
    }

    var row=wrap.firstElementChild;
    if(!row) return;
    row.classList.add("bds-mainbar");

    var nav=row.querySelector("nav");
    var actions=row.querySelector(":scope > .flex:last-child");
    if(!actions) actions=row.lastElementChild;

    var toggle=row.querySelector(".bds-menu-toggle");
    if(!toggle){
      toggle=document.createElement("button");
      toggle.type="button";
      toggle.className="bds-menu-toggle";
      toggle.setAttribute("aria-label","Buka menu");
      toggle.setAttribute("aria-expanded","false");
      toggle.innerHTML='<i class="fa-solid fa-bars"></i>';
      if(actions) actions.appendChild(toggle); else row.appendChild(toggle);
    }

    var panel=wrap.querySelector(":scope > .bds-mobile-panel");
    if(!panel){
      panel=document.createElement("div");
      panel.className="bds-mobile-panel";
      var clone=nav ? nav.cloneNode(true) : document.createElement("nav");
      panel.appendChild(clone);
      var tools=document.createElement("div");
      tools.className="bds-mobile-tools";
      tools.innerHTML='<a href="index.html"><i class="fa-solid fa-globe"></i>&nbsp; Bahasa</a>'+
        '<a href="index.html"><i class="fa-solid fa-coins"></i>&nbsp; IDR</a>'+
        '<a href="index.html"><i class="fa-solid fa-mobile-screen-button"></i>&nbsp; App</a>'+
        '<a href="faq.html"><i class="fa-regular fa-circle-question"></i>&nbsp; Bantuan</a>'+
        '<a href="index.html#recent"><i class="fa-regular fa-clock"></i>&nbsp; Recently Viewed</a>'+
        '<a href="register.html"><i class="fa-regular fa-user"></i>&nbsp; Daftar</a>'+
        '<a href="login.html"><i class="fa-solid fa-right-to-bracket"></i>&nbsp; Masuk</a>';
      panel.appendChild(tools);
      wrap.appendChild(panel);
    }

    toggle.addEventListener("click",function(){
      var open=panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",open?"Tutup menu":"Buka menu");
      toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
    });
    panel.addEventListener("click",function(e){
      if(e.target.closest("a")){
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded","false");
        toggle.setAttribute("aria-label","Buka menu");
        toggle.innerHTML='<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  function init(){
    document.querySelectorAll("header").forEach(initHeader);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();

/* Premium page-to-page transition */
(function(){
  "use strict";
  document.documentElement.classList.add("bds-motion-ready");
  function enter(){
    document.body.classList.add("bds-page-enter");
    requestAnimationFrame(function(){requestAnimationFrame(function(){document.body.classList.remove("bds-page-enter");document.body.classList.add("bds-page-ready");});});
  }
  function links(){
    document.addEventListener("click",function(e){
      var a=e.target.closest("a[href]");
      if(!a||e.defaultPrevented||a.target==="_blank"||a.hasAttribute("download")) return;
      var href=a.getAttribute("href");
      if(!href||href.charAt(0)==="#"||/^(mailto:|tel:|javascript:)/i.test(href)) return;
      try{
        var u=new URL(href,location.href);
        if(u.origin!==location.origin||u.pathname===location.pathname&&u.search===location.search) return;
      }catch(err){return}
      e.preventDefault();
      document.body.classList.add("bds-page-enter");
      setTimeout(function(){location.href=href},240);
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){enter();links()});
  else{enter();links()}
})();
