// menu hamburguer

const botaoMenu = document.getElementById('botao-menu');
const menu = document.querySelector('.menu');
botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    botaoMenu.classList.toggle('ativo');
});

// const MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.1259890966217!2d32.5617991742074!3d-25.963908077225327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69b7d6166b651%3A0xe324aea2cffbd8b5!2sKoffee%20Shop.%20EI!5e0!3m2!1spt-PT!2smz!4v1770216729289!5m2!1spt-PT!2smz";

// if (userAcceptedCookies) {
//    document.getElementById('map').src = MAP_URL;
// };

