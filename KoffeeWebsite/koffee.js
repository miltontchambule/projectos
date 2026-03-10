 
 //////////////////////////////MENU HAMBURGUER E BARRA SLIDE DA DIREITA

 function toggleMenu() {
    var menu    = document.getElementById('mobileMenu');
    var overlay = document.getElementById('menuOverlay');
    var burger  = document.getElementById('hamburger');
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    burger.classList.toggle('active');
  }

  function closeMenu() {
    var menu    = document.getElementById('mobileMenu');
    var overlay = document.getElementById('menuOverlay');
    var burger  = document.getElementById('hamburger');
    menu.classList.remove('open');
    overlay.classList.remove('active');
    burger.classList.remove('active');
  }


  /////////////////////////////////// RODAPE DE HORARIO ESPECIAL ///////////////////////////////////////////
 (function rodape() {
    let items = [ 'Alusivo ao Ramadan, de 18 de Fevereiro - 19 de Março, o Koffee do Alto Maé estará aberto, nas sextas: das 7h30 às 23h30 e nos sábados: das 8h30 às 23h00!'];
    let track = document.getElementById('horarioTrack');
    let html  = '';
    for (let i = 0; i < 30; i++) {

      items.forEach(function(item) {
        html += '<span class="horario-item">' + item + '</span>';
      });
    }
    track.innerHTML = html;
  })();



  ////////////////////// FORMULARIO DE ENCOMENDAS ////////////////////////////

function enviarPedido(){
  const nome = document.getElementById('nome').value.trim();
  const contacto =  document.getElementById('contacto').value.trim();
  const email =  document.getElementById('email').value.trim();
  const mensagem =  document.getElementById('mensagem').value.trim();
  const estado =  document.getElementById('estadoMessage');


////////////////////////////VERIFICACAO DOS CAMPOS OBRIGATORIOS//////////////////////////////////////
if (!nome || !mensagem) {
  alert('Por favor, preencha todos os campos obrigatorios!');
  return;
}

///////////////////////////////////////MENSAGEM QUE SERA ENVIADA PELO USER//////////////////////////////

const texto = `*Novo Pedido - Koffee Shop*\n\n*Nome:* ${nome}\n*Telefone:* ${contacto || 'Nao informado'}\n*E-mail:* ${email || 'Nao informado'}\n*Pedido:* ${mensagem}`;
const url = `https://wa.me/258826972504?text=${encodeURIComponent(texto)}`;


window.open(url, '_blank');

document.getElementById('pedidoForm').reset();

estado.classList.remove('hide');
estado.textContent = 'Pedido enviado com sucesso, entraremos em contacto em breve. Obrigado!';

///////////////////////////////// TIMER DA MENSAGEM NO ECRA//////////////

setTimeout(() => {
  estado.classList.add('hide');
  setTimeout(() => {
    estado.textContent = '';

    estado.classList.remove('hide');
  }, 500);
}, 8000);
}
