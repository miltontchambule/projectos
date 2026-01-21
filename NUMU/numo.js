const elementos = document.querySelectorAll('.animar');

function animarAoScroll() {
    const limite = window.innerHeight * 0.85;

    elementos.forEach(el => {
        const topo = el.getBoundingClientRect().top;
        if (topo < limite) {
            el.classList.add('visivel');
        }
    });
}

window.addEventListener('scroll', animarAoScroll);
animarAoScroll();
