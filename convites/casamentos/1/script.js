

'use strict';


const whatsapporg = '258876972509';
const casamentodata = new Date('2026-12-19T17:00:00');

const secaoEscolhaInicial = document.getElementById('escolha-inicial');
const secaoAceitar = document.getElementById('secao-aceitar');
const secaoRejeitar = document.getElementById('secao-rejeitar');
const formAceite = document.getElementById('form-aceite');
const formRejeicao = document.getElementById('form-rejeicao');
const selectParentesco = document.getElementById('graus');
const campoOutro = document.getElementById('campo-outro');

function mostrarSecao(secaoParaMostrar) {
  [secaoEscolhaInicial, secaoAceitar, secaoRejeitar].forEach((secao) => {
    const visivel = secao === secaoParaMostrar;
    secao.classList.toggle('oculto', !visivel);
    secao.setAttribute('aria-hidden', String(!visivel));
  });
}

document.getElementById('aceitar').addEventListener('click', () => mostrarSecao(secaoAceitar));
document.getElementById('rejeitar').addEventListener('click', () => mostrarSecao(secaoRejeitar));

selectParentesco.addEventListener('change', () => {
  const escolheuOutro = selectParentesco.value === 'Outro';
  campoOutro.classList.toggle('oculto', !escolheuOutro);
  document.getElementById('outro').required = escolheuOutro;
});

function enviarParaWhatsApp(mensagem) {
  const url = `https://wa.me/258876972509${ whatsapporg }?text=${encodeURIComponent(mensagem)}`;
  window.location.href = url;
}

function construirMensagemAceite(d) {
  return ' *Confirmação de presença no Casamento: Gloria & Pedro*\n\n' +
    `Nome: ${d.nome} ${d.apelido}\n` +
    `Contacto: ${d.contacto}\n` +
    `Sexo: ${d.sexo}\n` +
    `Grau de parentesco: ${d.parentesco === 'Outro' ? d.outro : d.parentesco}\n` +
    `Poderá estar na igreja: ${d.igreja}\n` +
    `Poderá estar no salão: ${d.salao}\n\n Confirmou presença.`;
}

function construirMensagemRejeicao(motivo) {
  return ' *Resposta ao convite — Casamento Gloria & Pedro*\n\n' +
    'Infelizmente não poderá estar presente.\n' +
    `Motivo: ${motivo || 'não especificado'}`;
}

formAceite.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (!formAceite.checkValidity()) {
    formAceite.reportValidity();
    return;
  }
  const dados = {
    nome: document.getElementById('nome').value.trim(),
    apelido: document.getElementById('apelido').value.trim(),
    contacto: document.getElementById('contacto').value.trim(),
    sexo: formAceite.querySelector('input[name="sexo"]:checked').value,
    parentesco: selectParentesco.value,
    outro: document.getElementById('outro').value.trim(),
    igreja: document.getElementById('igreja').value,
    salao: document.getElementById('salao').value,
  };
  enviarParaWhatsApp(construirMensagemAceite(dados));
});

formRejeicao.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const motivo = document.getElementById('motivo').value.trim();
  enviarParaWhatsApp(construirMensagemRejeicao(motivo));
});


//relogio decrescente
function actualizarContagem() {
  const diferenca = casamentodata - new Date();
  const dois = (n) => String(Math.max(n, 0)).padStart(2, '0');
  
  document.getElementById('dias').textContent = dois(Math.floor(diferenca / 86400000));
  document.getElementById('horas').textContent = dois(Math.floor((diferenca / 3600000) % 24));
  document.getElementById('minutos').textContent = dois(Math.floor((diferenca / 60000) % 60));
  document.getElementById('segundos').textContent = dois(Math.floor((diferenca / 1000) % 60));
 
 if (diferenca <= 0) {
    ['dias', 'horas', 'minutos', 'segundos'].forEach((id) => (document.getElementById(id).textContent = '00'));
    return;
  }

}

actualizarContagem();
setInterval(actualizarContagem, 1000);


//slides de imagens do local
const slides = document.querySelector(".slides")
const imagens = document.querySelectorAll(".slides img")

const proxbtn = document.getElementById("prox")
const antbtn = document.getElementById("ant")

let currentIndex = 0

proxbtn.addEventListener("click", () => {
  currentIndex++;
  if(currentIndex >= imagens.length){
    currentIndex = 0
  }
  updateSlider()
})

antbtn.addEventListener("click", () => {
  currentIndex--
  if(currentIndex < 0){
    currentIndex = imagens.length -1
  }

  updateSlider()
})

function updateSlider(){
  const width = document.querySelector(".slider").clientWidth
  slides.style.transform = 
  `translateX(-${currentIndex * width}px)`
}

let startX = 0
slides.addEventListener("touchstart", e =>{
  startX = e.touches[0].clientX;

})

slides.addEventListener("touchend", e =>{
  let endX = e.changedTouches[0].clientX;

  if(startX - endX > 50){
    proxbtn.click();
  }

  if(endX-startX > 50 ){
    antbtn.click();
  }
})