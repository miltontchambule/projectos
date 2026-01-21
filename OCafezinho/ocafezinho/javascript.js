// menu hamburguer

const botaoMenu = document.getElementById('botao-menu');
const menu = document.querySelector('.menu');
botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    botaoMenu.classList.toggle('ativo');
});