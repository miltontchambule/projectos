
'use strict';

/**
 * convite.js
 * ----------
 * IMPORTANTE: o WhatsApp não permite envio automático e silencioso de
 * mensagens a partir de uma página estática. O que este script faz é
 * montar a mensagem com os dados do convidado e abrir o WhatsApp (app
 * ou web.whatsapp.com) já com o texto pronto, através de um link
 * "wa.me" — o convidado ainda precisa de tocar em enviar dentro da
 * própria app do WhatsApp. Não há forma de contornar isto sem usar a
 * API oficial do WhatsApp Business (paga, exige backend e aprovação).
 */

// SUBSTITUI pelo número real do organizador.
// Formato exigido pelo wa.me: código do país + número, só dígitos,
// sem "+", sem espaços e sem zero inicial. Ex.: Moçambique = 258 + número.
const NUMERO_WHATSAPP_ORGANIZADOR = '258840000000';

// ---------- Referências aos elementos ----------
const secaoEscolhaInicial = document.getElementById('escolha-inicial');
const secaoAceitar = document.getElementById('secao-aceitar');
const secaoRejeitar = document.getElementById('secao-rejeitar');

const botaoAceitar = document.getElementById('aceitar');
const botaoRejeitar = document.getElementById('rejeitar');

const formAceite = document.getElementById('form-aceite');
const formRejeicao = document.getElementById('form-rejeicao');

const selectParentesco = document.getElementById('graus');
const campoOutro = document.getElementById('campo-outro');

// ---------- Alternância entre estados (escolha / aceitar / rejeitar) ----------

function mostrarSecao(secaoParaMostrar) {
    // Esconde todas as secções de resposta antes de mostrar a pedida,
    // para nunca haver dois formulários visíveis ao mesmo tempo.
    [secaoEscolhaInicial, secaoAceitar, secaoRejeitar].forEach((secao) => {
        const estaAMostrar = secao === secaoParaMostrar;
        secao.classList.toggle('oculto', !estaAMostrar);
        secao.setAttribute('aria-hidden', String(!estaAMostrar));
    });
}

botaoAceitar.addEventListener('click', () => mostrarSecao(secaoAceitar));
botaoRejeitar.addEventListener('click', () => mostrarSecao(secaoRejeitar));

// ---------- Campo "Outro" só aparece quando relevante ----------

selectParentesco.addEventListener('change', () => {
    const escolheuOutro = selectParentesco.value === 'Outro';
    campoOutro.classList.toggle('oculto', !escolheuOutro);

    // Só torna o campo obrigatório quando está visível, senão o
    // formulário fica impossível de submeter quando "Outro" não foi escolhido.
    document.getElementById('outro').required = escolheuOutro;
});

// ---------- Construção da mensagem e envio para o WhatsApp ----------

/**
 * Abre o WhatsApp do organizador com a mensagem já preenchida.
 * @param {string} mensagem - texto simples (sem HTML)
 */
function enviarParaWhatsApp(mensagem) {
    const url = `https://wa.me/${NUMERO_WHATSAPP_ORGANIZADOR}?text=${encodeURIComponent(mensagem)}`;
    window.location.href = url;
}

function construirMensagemAceite(dados) {
    return (
        '*Confirmação de presença — Casamento Gloria & Pedro*\n\n' +
        `Nome: ${dados.nome} ${dados.apelido}\n` +
        `Contacto: ${dados.contacto}\n` +
        `Sexo: ${dados.sexo}\n` +
        `Grau de parentesco: ${dados.parentesco === 'Outro' ? dados.outro : dados.parentesco}\n` +
        `Poderá estar na igreja: ${dados.igreja}\n` +
        `Poderá estar no salão: ${dados.salao}\n\n` +
        'Confirmou presença.'
        
    );
}

function construirMensagemRejeicao(motivo) {
    const linhaMotivo = motivo ? `Motivo: ${motivo}` : 'Motivo: não especificado';
    return (
        '*Resposta ao convite — Casamento Gloria & Pedro*\n\n' +
        'Infelizmente não poderá estar presente.\n' +
        `${linhaMotivo}`
    );
}

// ---------- Submissão do formulário de aceitação ----------

formAceite.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Validação nativa do HTML (required, pattern, etc.). Se falhar,
    // mostra a mensagem de erro do próprio navegador e não avança.
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

// ---------- Submissão do formulário de rejeição ----------

formRejeicao.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const motivo = document.getElementById('motivo').value.trim();
    enviarParaWhatsApp(construirMensagemRejeicao(motivo));
});
