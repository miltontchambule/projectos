

    const carros = document.querySelectorAll('.carro');
//DOM
    carros.forEach(carro => {
      const carrossel = carro.querySelector('.carrossel');
      const imagens = carro.querySelectorAll('.imagem-carro');
      const anterior = carro.querySelector('.botao-anterior');
      const seguinte = carro.querySelector('.botao-seguinte');

      let indice = 0;
//funcao para mostrar a imagem no carrossel especifico
      function mostrarImagem(i) {
        carrossel.style.transform = `translateX(-${i * 100}%)`;
      }

      //mostrar a imagem anterior no carrossel pelo botao de anterior
      anterior.addEventListener('click', () => {
        indice = (indice - 1 + imagens.length) % imagens.length;
        mostrarImagem(indice);
      });

    //mostrar a imagem seguinte pelo botao seguinte
      seguinte.addEventListener('click', () => {
        indice = (indice + 1) % imagens.length;
        mostrarImagem(indice);
      });
    });
