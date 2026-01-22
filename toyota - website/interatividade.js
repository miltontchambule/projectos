
//imagens nos slides

const pontos = document.querySelectorAll('.ponto');
const imagemPrincipal = document.querySelector('.imagem-principal img');
const imagens = ['16.JPG', '11.jpg', '15.JPG']; //array de imagens


let indiceAtual = 0;


pontos.forEach((ponto, indice) => {
    ponto.addEventListener('click', () => {
        pontos.forEach(p => p.classList.remove('ativo'));
        ponto.classList.add('ativo');
        imagemPrincipal.style.opacity = '0';
        setTimeout(() => {
            imagemPrincipal.src = imagens[indice];
            imagemPrincipal.style.opacity = '1';
        }, 300);
        indiceAtual = indice;
    });
});

//auto carrossel

setInterval(() => {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    pontos.forEach(p => p.classList.remove('ativo'));
    pontos[indiceAtual].classList.add('ativo');
    imagemPrincipal.style.opacity = '0';
    setTimeout(() => {
        imagemPrincipal.src = imagens[indiceAtual];
        imagemPrincipal.style.opacity = '1';
    }, 300);
}, 5000); //cada imagem muda 5 segundos depois

//para que a transicao seja suave
imagemPrincipal.style.transition = 'opacity 0.3s ease-in-out';


//animacao de clique nos cartoes
document.querySelectorAll('.cartao-destaque').forEach(cartao => {
    cartao.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)'; //cartao desloca-se um pouco para cima
        }, 100);
    });
});

//menu hamburguer
const botaoMenu = document.getElementById('botao-menu');
const menu = document.querySelector('.menu');
botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    botaoMenu.classList.toggle('ativo');
});