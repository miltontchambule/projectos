
 
 ///////////////SOMBRA DO NAVBAR 40PX DO TOPO AO FAZER SCROLL////////////////////////////

 window.addEventListener('scroll', function() {
    var nav = document.getElementById('navbar');
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

 ///////////////MENU HAMBUERGUER MOBILE////////////////////////////
  
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



 ///////////////EFEITO DAS ROSAS A CAIREM DO TOPO////////////////////////////
  (function spawnPetals() {
    var container = document.getElementById('petals');
    var emojis    = ['🌸', '🌹', '🌷', '💮', '🪷'];
    for (var i = 0; i < 18; i++) {
      var p           = document.createElement('div');
      p.className     = 'petal';
      p.textContent   = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left    = Math.random() * 100 + '%';
      p.style.animationDuration  = (8 + Math.random() * 10) + 's';
      p.style.animationDelay     = (-Math.random() * 12) + 's';
      p.style.fontSize           = (0.9 + Math.random() * 1.2) + 'rem';
      container.appendChild(p);
    }
  })();

 ///////////////////////////////ANIMACAO DE RODAPE ////////////////////////////
  (function buildMarquee() {
    var items = [
      'Buquês Românticos', 'Bandejas Luxo', 'Decorações de Casamento',
      'Arranjos Personalizados', 'Entrega em Maputo', 'Flores Frescas Diárias',
      'Surpresas Especiais', 'Pétalas & Velas'
    ];
    var track = document.getElementById('marqueeTrack');
    var html  = '';
    for (var i = 0; i < 4; i++) {
      items.forEach(function(item) {
        html += '<span class="marquee-item">' + item + '</span>';
      });
    }
    track.innerHTML = html;
  })();

  /* ===== PRODUCT CAROUSEL ===== */
  (function initCarousel() {
    var track      = document.getElementById('carouselTrack');
    var dotsWrap   = document.getElementById('carouselDots');
    var prevBtn    = document.getElementById('prevBtn');
    var nextBtn    = document.getElementById('nextBtn');
    var cards      = track.querySelectorAll('.produto-card');
    var current    = 0;
    var perView    = 2;

    function getPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 960) return 3;
      return 1;
    }

    function total() {
      return Math.ceil(cards.length / getPerView());
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      for (var i = 0; i < total(); i++) {
        var d = document.createElement('div');
        d.className = 'dot' + (i === current ? ' active' : '');
        d.setAttribute('data-i', i);
        d.addEventListener('click', function() {
          goTo(parseInt(this.getAttribute('data-i')));
        });
        dotsWrap.appendChild(d);
      }
    }

    function updateDots() {
      var dots = dotsWrap.querySelectorAll('.dot');
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    function goTo(n) {
      perView        = getPerView();
      var maxIndex   = total() - 1;
      current        = Math.max(0, Math.min(n, maxIndex));
      var cardWidth  = cards[0].offsetWidth + 24;
      track.style.transform = 'translateX(-' + (current * perView * cardWidth) + 'px)';
      updateDots();
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });

    window.addEventListener('resize', function() {
      current = 0;
      buildDots();
      goTo(0);
    });

    buildDots();

    /* auto-play */
    // setInterval(function() {
    //   var next = (current + 1) >= total() ? 0 : current + 1;
    //   goTo(next);
    // }, 6000);
  })();

  /* ===== GALLERY STRIP ===== */
  (function buildGallery() {
    var track  = document.getElementById('galleryTrack');
    var emojis = ['🌹', '💐', '🌸', '🌷', '🪷', '💮', '🌺', '🌻'];
    var html   = '';
    for (var i = 0; i < 2; i++) {
      emojis.forEach(function(e, j) {
        html += '<div class="gallery-item gi-' + ((j % 6) + 1) + '">' + e + '</div>';
      });
    }
    track.innerHTML = html;
  })();

  /* ===== REVIEW SLIDER ===== */
  (function initReviews() {
    var track   = document.getElementById('reviewTrack');
    var navWrap = document.getElementById('reviewNav');
    var slides  = track.querySelectorAll('.review-slide');
    var current = 0;

    function buildNav() {
      navWrap.innerHTML = '';
      slides.forEach(function(_, i) {
        var d = document.createElement('div');
        d.className = 'review-dot' + (i === current ? ' active' : '');
        d.addEventListener('click', function() { goTo(i); });
        navWrap.appendChild(d);
      });
    }

    function goTo(n) {
      current = n;
      var slideWidth = track.parentElement.offsetWidth;
      track.style.transform = 'translateX(-' + (n * slideWidth) + 'px)';
      var dots = navWrap.querySelectorAll('.review-dot');
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === n);
      });
    }

    window.addEventListener('resize', function() {
      goTo(current);
    });

    buildNav();

    setInterval(function() {
      var next = (current + 1) >= slides.length ? 0 : current + 1;
      goTo(next);
    }, 5500);
  })();

  /* ===== SCROLL REVEAL ===== */
  (function initReveal() {
    var els = document.querySelectorAll('.reveal');
    var io  = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function(el) { io.observe(el); });
  })();

