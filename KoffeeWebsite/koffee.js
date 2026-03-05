 
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

const texto = `*Novo Pedido - Koffee Shop*\n\n*Nome: ${nome}\n*Telefone:* ${contacto || 'Nao informado'}\n*E-mail:* ${email || 'Nao informado'}\n*Pedido:* ${mensagem}`;
const url = `https://wa.me/258826972504?text=${encodeURIComponent(texto)}`;

/////////////////////////////////////ABRIR NUMA NOVA ABA O WHATSAPP. USER FICA NO SITE/////////////////////////////

window.open(url, '_blank');

///////////////////////////////// RESETA O FORMULARIO ////////////////////////////////

document.getElementById('pedidoForm').reset();

////////////////////////////////// MENSAGEM DE SUCESSO ///////////////////////////////////////

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
