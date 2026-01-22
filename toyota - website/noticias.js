
    (function () {
      const lista = document.getElementById('lista-imagens');
      const itensOriginais = Array.from(lista.querySelectorAll('.item'));
      const btnPrev = document.getElementById('btn-anterior');
      const btnNext = document.getElementById('btn-proximo');
      const indicadores = document.getElementById('indicadores');

      let tempoAuto = 5000; // ms - tempo para mudar imagem
      let animando = false;
      let intervaloAuto = null;

      // clones para loop suave
      const primeiroClone = itensOriginais[0].cloneNode(true);
      const ultimoClone = itensOriginais[itensOriginais.length - 1].cloneNode(true);
      primeiroClone.setAttribute('data-clone', 'primeiro');
      ultimoClone.setAttribute('data-clone', 'ultimo');
      lista.appendChild(primeiroClone);
      lista.insertBefore(ultimoClone, lista.firstChild);

      // Atualiza referência a todos os items, os com clones
      const itens = Array.from(lista.querySelectorAll('.item'));
      const totalSlides = itensOriginais.length;

      // define largura automática e controla posição com CSS
      let indice = 1; // começar no primeiro item real 
      function atualizarTransform(semTransicao = false) {
        if (semTransicao) {
          lista.style.transition = 'none';
        } else {
          lista.style.transition = '';
        }
        lista.style.transform = `translateX(-${indice * 100}%)`;
      }

      //  indicadores
      for (let i = 0; i < totalSlides; i++) {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
        btn.dataset.slide = i;
        if (i === 0) btn.setAttribute('aria-current', 'true');
        indicadores.appendChild(btn);
      }

      function atualizarIndicadores() {
        const btns = Array.from(indicadores.children);
        btns.forEach(b => b.removeAttribute('aria-current'));


        // calcular slide real 
        let real = indice - 1;
        if (real < 0) real = totalSlides - 1;
        if (real >= totalSlides) real = 0;
        btns[real].setAttribute('aria-current', 'true');
      }

      // Ao carregar, posicionar no indice 1 
      window.addEventListener('load', () => {
        atualizarTransform(true);


        // forçar repaint para aplicar transition off then on
        requestAnimationFrame(() => requestAnimationFrame(() => lista.style.transition = ''));
      });


      // Funções de navegação
      function irParaProximo() {
        if (animando) return;
        animando = true;
        indice++;
        atualizarTransform(false);
      }

      function irParaAnterior() {
        if (animando) return;
        animando = true;
        indice--;
        atualizarTransform(false);
      }

      // Evento quando transição termina 
      lista.addEventListener('transitionend', () => {
        animando = false;
        const itemAtual = itens[indice];
        if (itemAtual && itemAtual.dataset.clone === 'primeiro') {
          
          // saltar para primeiro real
          indice = 1;
          atualizarTransform(true);


          
          requestAnimationFrame(() => requestAnimationFrame(() => lista.style.transition = ''));
        } else if (itemAtual && itemAtual.dataset.clone === 'ultimo') {
          // saltar para último real
          indice = totalSlides;
          atualizarTransform(true);
          requestAnimationFrame(() => requestAnimationFrame(() => lista.style.transition = ''));
        }
        atualizarIndicadores();
      });

      // indicadores clicaveis
      indicadores.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' || animando) return;
        const alvo = Number(e.target.dataset.slide);
        
        // Slide real alvo: indices 1..totalSlides
        indice = alvo + 1;
        animando = true;
        atualizarTransform(false);
      });

      // Botões
      btnNext.addEventListener('click', () => {
        irParaProximo();
        reiniciarAuto();
      });
      btnPrev.addEventListener('click', () => {
        irParaAnterior();
        reiniciarAuto();
      });

      // Autoplay
      function iniciarAuto() {
        intervaloAuto = setInterval(() => {
          irParaProximo();
        }, tempoAuto);
      }
      function pararAuto() {
        clearInterval(intervaloAuto);
        intervaloAuto = null;
      }
      function reiniciarAuto() {
        pararAuto();
        iniciarAuto();
      }

      // pausar ao passar o mouse e focar
      const carrosselEl = document.querySelector('.carrossel');
      carrosselEl.addEventListener('mouseenter', pararAuto);
      carrosselEl.addEventListener('mouseleave', iniciarAuto);
      carrosselEl.addEventListener('focusin', pararAuto);
      carrosselEl.addEventListener('focusout', iniciarAuto);

      // Teclas de teclado, as setas
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          irParaProximo();
          reiniciarAuto();
        } else if (e.key === 'ArrowLeft') {
          irParaAnterior();
          reiniciarAuto();
        }
      });

      // Iniciar autoplay
      iniciarAuto();

      // Ajustar tamanho se janela mudar e manter transform correto
      window.addEventListener('resize', () => atualizarTransform(true));

    })();
