const elementos = document.querySelectorAll('.animar');

function animarAoScroll() {
    const limite = window.innerHeight * 0.85; //os elementos aparecem dentro de 85% de viewport.

    elementos.forEach(el => {
        const topo = el.getBoundingClientRect().top; //medicao do topo da tela ate ao elemento com animacao.
        if (topo < limite) {
            el.classList.add('visivel');
        }
    });
}

window.addEventListener('scroll', animarAoScroll);
animarAoScroll();
