 
 //////////////////////////////MENU HAMBURGUER E BARRA SLIDE DA DIREITA

 function toggleMenu() {
    var menu    = document.getElementById('mobileMenu');
    var overlay = document.getElementById('menuOverlay');
    var burger  = document.getElementById('hamburger');
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    burger.classList.toggle('active');
  }

  function closeMenu() {
    var menu    = document.getElementById('mobileMenu');
    var overlay = document.getElementById('menuOverlay');
    var burger  = document.getElementById('hamburger');
    menu.classList.remove('open');
    overlay.classList.remove('active');
    burger.classList.remove('active');
  }

