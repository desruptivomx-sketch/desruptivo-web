/* DESRUPTIVO — comportamiento compartido de las subpáginas */
(function () {
  'use strict';

  // Aparición al hacer scroll
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // El header se vuelve sólido al pasar el hero
  var head = document.querySelector('header');
  var hero = document.querySelector('.page-hero');
  if (head && hero) {
    var sync = function () {
      head.classList.toggle('is-solid', window.scrollY > hero.offsetHeight - 90);
    };
    sync();
    addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
  }

  // Menú móvil
  var burger = document.querySelector('.burger');
  if (burger) {
    var links = [
      ['nosotros.html', 'Nosotros'],
      ['esencia.html', 'Esencia'],
      ['index.html#servicios', 'Servicios'],
      ['index.html#diseno', 'Diseño'],
      ['index.html#trabajo', 'Trabajo'],
      ['trabajemos.html', 'Trabajemos']
    ];
    var here = location.pathname.split('/').pop() || 'index.html';

    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', function () {
      var open = document.querySelector('.mobile-menu');
      if (open) {
        open.remove();
        burger.setAttribute('aria-expanded', 'false');
        return;
      }
      var menu = document.createElement('div');
      menu.className = 'mobile-menu';
      links.forEach(function (l) {
        var a = document.createElement('a');
        a.href = l[0];
        a.textContent = l[1];
        if (l[0] === here) a.setAttribute('aria-current', 'page');
        a.addEventListener('click', function () {
          menu.remove();
          burger.setAttribute('aria-expanded', 'false');
        });
        menu.appendChild(a);
      });
      document.body.appendChild(menu);
      burger.setAttribute('aria-expanded', 'true');
    });
  }
})();
