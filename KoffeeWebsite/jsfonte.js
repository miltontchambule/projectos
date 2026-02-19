// menu hamburguer

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", () => {
    botaoMenu.classList.toggle("ativo");
    menu.classList.toggle("ativo");
});

//barra horizontal que tem "destaques, eventos e login "
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn=>{
btn.addEventListener("click",()=>{
tabs.forEach(b=>b.classList.remove("ativo"));
contents.forEach(c=>c.classList.remove("ativo"));
btn.classList.add("ativo");
document.getElementById(btn.dataset.tab).classList.add("ativo");
});
});


//efeito do navbar ao sair do topo do site ao fazer scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    if (window.scrollY > 20) {
        header.classList.add("scrolled"); //iniciar scroll quando estiver a 20px do topo
    } else {
        header.classList.remove("scrolled");
    }
});
