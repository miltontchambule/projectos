// menu hamburguer

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", () => {
    botaoMenu.classList.toggle("ativo");
    menu.classList.toggle("ativo");
});

/* CAROUSEL */
const slides = document.querySelectorAll(".slide");
let atual=0;

/* TABS */
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


document.getElementById("carousel").addEventListener("click",(e)=>{
if(e.clientX > window.innerWidth/2){
slides[atual].classList.remove("ativo");
atual=(atual+1)%slides.length;
slides[atual].classList.add("ativo");
}
});

window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});



