/* //////////////////////////Scroll Reveal ///////////////////////// */


  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.revelar').forEach(el => observador.observe(el));
  
  