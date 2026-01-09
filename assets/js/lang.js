(function(){
  function currentLang(){
    const p = window.location.pathname;
    if (p.includes('/en/')) return 'en';
    if (p.includes('/zh/')) return 'zh';
    return localStorage.getItem('site_lang') || 'zh';
  }
  function setPressed(lang){
    document.querySelectorAll('[data-lang-btn]').forEach(btn=>{
      btn.setAttribute('aria-pressed', btn.dataset.langBtn === lang ? 'true' : 'false');
    });
  }
  function switchTo(lang){
    localStorage.setItem('site_lang', lang);
    const p = window.location.pathname;

    // root index.html
    if (p.endsWith('/index.html') && !(p.includes('/zh/') || p.includes('/en/'))){
      window.location.href = `./${lang}/index.html`;
      return;
    }
    // keep same filename
    if (p.includes('/zh/')) { window.location.href = p.replace('/zh/', `/${lang}/`); return; }
    if (p.includes('/en/')) { window.location.href = p.replace('/en/', `/${lang}/`); return; }

    window.location.href = `./${lang}/index.html`;
  }
  window.SiteLang = { init: function(){ setPressed(currentLang()); document.querySelectorAll('[data-lang-btn]').forEach(btn=>btn.addEventListener('click', ()=>switchTo(btn.dataset.langBtn))); }, switchTo };
})();