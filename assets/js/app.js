const btn=document.querySelector('#theme-toggle, .theme-toggle, [data-theme-toggle], [id*="theme"]');

/* UI interactions: burger menu and smooth scroll */
document.addEventListener('DOMContentLoaded', function(){
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(a=>{
    a.addEventListener('click', function(e){
      // smooth scroll to anchors
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav
        if(mobileNav) mobileNav.classList.remove('active');
      }
    });
  });
});

  // fade in all sections
  document.querySelectorAll('section, .card').forEach(el=>el.classList.add('fade-in'));
});
(function(){
  const KEY = 'site-theme'; // 'light' | 'dark'
  const html = document.documentElement;

  // Поддержать несколько вариантов селектора
   

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    // Обновим состояние кнопки (при наличии aria-pressed)
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function getSystemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Инициализация: localStorage > системная > light
  const saved = localStorage.getItem(KEY);
  const initial = (saved === 'dark' || saved === 'light') ? saved : getSystemPref();
  applyTheme(initial);

  // Если кнопки нет — ничего не делаем дальше
  if (!btn) return;

  // Клик: переключаем и сохраняем
  btn.addEventListener('click', function(e){
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(KEY, next);
  });

  // Следить за системной сменой, но только если пользователь не задавал тему явно.
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!localStorage.getItem(KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange); 
  }
})();
