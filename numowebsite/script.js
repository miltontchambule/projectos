 'use strict';

    /* Efeito do Scroll do nav logo no inicio*/
    const nav = document.getElementById('nav');
    const scrollHandler = () => {
      nav.classList.toggle('scrolled', window.scrollY > 1);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();

    /* Menu Hamburguer */
    const hamburguer  = document.getElementById('hamburguer');
    const menuMobile  = document.getElementById('menuMobile');
    const fecharBtn   = document.getElementById('fecharMenu');

    hamburguer.addEventListener('click', () => {
      const aberto = menuMobile.classList.toggle('aberto');
      hamburguer.classList.toggle('ativo', aberto);
      hamburguer.setAttribute('aria-expanded', aberto);
      document.body.style.overflow = aberto ? 'hidden' : '';
    });

    fecharBtn.addEventListener('click', fecharMenuMobile);

    function fecharMenuMobile() {
      menuMobile.classList.remove('aberto');
      hamburguer.classList.remove('ativo');
      hamburguer.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    /* Fechar menu ao clicar fora */
    menuMobile.addEventListener('click', (e) => {
      if (e.target === menuMobile) fecharMenuMobile();
    });

    /* ─── REVEAL ON SCROLL (IntersectionObserver) ─── */
    const revelarElementos = () => {
      const elementos = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada, i) => {
          if (entrada.isIntersecting) {
            // escalonamento por índice dentro do mesmo grupo
            const delay = (i % 4) * 80;
            setTimeout(() => {
              entrada.target.classList.add('visivel');
            }, delay);
            observer.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      elementos.forEach(el => observer.observe(el));
    };

    document.addEventListener('DOMContentLoaded', revelarElementos);




    

    /* MAPA com consentimento tipo (privacy-first)  */
    function carregarMapa() {
      const consentimento = document.getElementById('mapaConsentimento');
      const contentor     = document.getElementById('mapaConteiner');

      // Guardar consentimento na sessionStorage (sem localStorage para respeitar privacidade)
      sessionStorage.setItem('numo_mapa_consentimento', 'aceite');

      consentimento.classList.add('escondido');

      const iframe = document.createElement('iframe');
      iframe.className    = 'mapa-iframe';
      iframe.src          = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119959.05870226867!2d32.5177628!3d-25.9652658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69e0c37ba0c6b%3A0x3fc2f3e7625a6ec9!2sMaputo%2C%20Mo%C3%A7ambique!5e0!3m2!1spt!2smz!4v1710000000000!5m2!1spt!2smz';
      iframe.title        = 'Localização da Numo Sorveteria no Google Maps';
      iframe.loading      = 'lazy';
      iframe.referrerpolicy = 'no-referrer-when-downgrade';
      // Sandbox restritivo — permite apenas o necessário para o mapa funcionar
      iframe.sandbox      = 'allow-scripts allow-same-origin allow-popups allow-forms';
      iframe.setAttribute('aria-label', 'Mapa da localização da Numo Sorveteria em Maputo');

      contentor.appendChild(iframe);
    }

    /* Restaurar mapa se já tiver consentimento */
    if (sessionStorage.getItem('numo_mapa_consentimento') === 'aceite') {
      document.addEventListener('DOMContentLoaded', carregarMapa);
    }






    /*  formulario de ENCOMENDA */
    const form       = document.getElementById('formEncomenda');
    const formSucesso = document.getElementById('formSucesso');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const btn = form.querySelector('.form-submit');
      btn.textContent = 'A enviar…';
      btn.disabled    = true;

      /* 
        PRONTO PARA BACKEND:
        Descomente e adapte o bloco abaixo quando o endpoint estiver disponível.
        
        const payload = Object.fromEntries(new FormData(form));
        try {
          const resposta = await fetch(form.dataset.apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!resposta.ok) throw new Error('Erro no servidor');
          mostrarSucesso();
        } catch (err) {
          btn.textContent = 'Erro — Tente via WhatsApp';
          btn.disabled    = false;
        }
      */

      // Simulação frontend (remover quando integrar backend)
      await new Promise(r => setTimeout(r, 1200));
      mostrarSucesso();
    });

    function mostrarSucesso() {
      form.style.display      = 'none';
      formSucesso.style.display = 'block';
    }

    /* ─── Foco acessível no menu mobile ─── */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuMobile.classList.contains('aberto')) {
        fecharMenuMobile();
        hamburguer.focus();
      }
    });