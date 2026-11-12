document.addEventListener("DOMContentLoaded", function () {
  const botaoMenu = document.getElementById("botao-menu");
  const navegacao = document.getElementById("navegacao");
  const linksMenu = navegacao.querySelectorAll("a");
  const botaoAcessibilidade = document.getElementById("botao-acessibilidade");

  const data = new Date();
  document.getElementById("ano-atual").textContent = data.getFullYear();
  document.getElementById("data-atual").textContent = new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit", month: "long", year: "numeric"
  }).format(data);

  botaoMenu.addEventListener("click", function () {
    const aberto = navegacao.classList.toggle("aberta");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      navegacao.classList.remove("aberta");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
      linksMenu.forEach(item => item.classList.remove("ativo"));
      link.classList.add("ativo");
    });
  });

    botaoAcessibilidade.addEventListener("click", function () {
    const activo = document.body.classList.toggle("texto-grande");
    botaoAcessibilidade.setAttribute("aria-pressed", String(activo));
    botaoAcessibilidade.textContent = activo ? "Texto normal" : "Aumentar texto";
  });

  // Gestão local de documentos (CRUD com localStorage).
  const chaveDocumentos = "portalGovernoDocumentos";
  const formularioDocumentos = document.getElementById("formulario-documentos");
  const tipoDocumento = document.getElementById("tipo-documento");
  const nomeDocumento = document.getElementById("nome-documento");
  const ficheiroDocumento = document.getElementById("ficheiro-documento");
  const listaDocumentos = document.getElementById("documentos-armazenados");
  const listaVazia = document.getElementById("lista-vazia");
  const contadorDocumentos = document.getElementById("contador-documentos");
  const mensagemDocumentos = document.getElementById("mensagem-documentos");
  const botaoGuardarDocumento = document.getElementById("botao-guardar-documento");
  const botaoCancelarEdicao = document.getElementById("botao-cancelar-edicao");
  let documentoEmEdicao = null;

  function obterDocumentos() {
    try {
      return JSON.parse(localStorage.getItem(chaveDocumentos)) || [];
    } catch (erro) {
      return [];
    }
  }

  function guardarDocumentos(documentos) {
    localStorage.setItem(chaveDocumentos, JSON.stringify(documentos));
  }

  function formatarTamanho(bytes) {
    return bytes < 1024 * 1024
      ? (bytes / 1024).toFixed(0) + " KB"
      : (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  function mostrarMensagem(mensagem, erro) {
    mensagemDocumentos.textContent = mensagem;
    mensagemDocumentos.classList.toggle("mensagem-erro", Boolean(erro));
  }

  function criarBotao(texto, accao, id, classe) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.dataset.acao = accao;
    botao.dataset.id = id;
    botao.className = classe;
    return botao;
  }

  function apresentarDocumentos() {
    const documentos = obterDocumentos();
    listaDocumentos.replaceChildren();
    listaVazia.hidden = documentos.length > 0;
    contadorDocumentos.textContent = documentos.length + (documentos.length === 1 ? " documento" : " documentos");

    documentos.forEach(function (documento) {
      const item = document.createElement("li");
      item.className = "item-documento";

      const informacao = document.createElement("div");
      informacao.className = "informacao-documento";

      const titulo = document.createElement("strong");
      titulo.className = "nome-documento-guardado";
      titulo.textContent = documento.nome;

      const detalhes = document.createElement("span");
      detalhes.className = "detalhes-documento";
      detalhes.textContent = documento.tipo + " · " + documento.nomeFicheiro + " · " + formatarTamanho(documento.tamanho);

      const estado = document.createElement("span");
      estado.className = documento.estado === "Submetido localmente" ? "estado-documento estado-submetido" : "estado-documento";
      estado.textContent = documento.estado;

      informacao.append(titulo, detalhes, estado);

      const accoes = document.createElement("div");
      accoes.className = "accoes-documento";
      const botaoSubmeter = criarBotao(
        documento.estado === "Submetido localmente" ? "Submetido" : "Submeter",
        "submeter",
        documento.id,
        "botao-accao botao-submeter"
      );
      botaoSubmeter.disabled = documento.estado === "Submetido localmente";

      accoes.append(
        criarBotao("Editar / renomear", "editar", documento.id, "botao-accao"),
        botaoSubmeter,
        criarBotao("Apagar", "apagar", documento.id, "botao-accao botao-apagar")
      );

      item.append(informacao, accoes);
      listaDocumentos.append(item);
    });
  }

  function limparFormulario() {
    formularioDocumentos.reset();
    documentoEmEdicao = null;
    ficheiroDocumento.required = true;
    botaoGuardarDocumento.textContent = "Guardar documento";
    botaoCancelarEdicao.hidden = true;
  }

  function lerFicheiroComoTexto(ficheiro) {
    return new Promise(function (resolver, rejeitar) {
      const leitor = new FileReader();
      leitor.onload = function () { resolver(leitor.result); };
      leitor.onerror = function () { rejeitar(new Error("Não foi possível ler o ficheiro.")); };
      leitor.readAsDataURL(ficheiro);
    });
  }

  formularioDocumentos.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const ficheiro = ficheiroDocumento.files[0];
    if (!documentoEmEdicao && !ficheiro) {
      mostrarMensagem("Seleccione um ficheiro para continuar.", true);
      return;
    }

    if (ficheiro && ficheiro.size > 2 * 1024 * 1024) {
      mostrarMensagem("O ficheiro excede o limite de 2 MB.", true);
      return;
    }

    const documentos = obterDocumentos();
    const indice = documentos.findIndex(item => item.id === documentoEmEdicao);
    const documentoAnterior = indice >= 0 ? documentos[indice] : null;

    try {
      const novoDocumento = {
        id: documentoAnterior ? documentoAnterior.id : String(Date.now()),
        tipo: tipoDocumento.value,
        nome: nomeDocumento.value.trim(),
        nomeFicheiro: ficheiro ? ficheiro.name : documentoAnterior.nomeFicheiro,
        tamanho: ficheiro ? ficheiro.size : documentoAnterior.tamanho,
        tipoMime: ficheiro ? ficheiro.type : documentoAnterior.tipoMime,
        conteudo: ficheiro ? await lerFicheiroComoTexto(ficheiro) : documentoAnterior.conteudo,
        estado: "Por submeter",
        atualizadoEm: new Date().toISOString()
      };

      if (indice >= 0) {
        documentos[indice] = novoDocumento;
      } else {
        documentos.push(novoDocumento);
      }

      guardarDocumentos(documentos);
      apresentarDocumentos();
      limparFormulario();
      mostrarMensagem(documentoAnterior ? "Documento actualizado localmente." : "Documento guardado neste dispositivo.", false);
    } catch (erro) {
      mostrarMensagem("Não foi possível guardar. O armazenamento do navegador pode estar cheio.", true);
    }
  });

  listaDocumentos.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const documentos = obterDocumentos();
    const indice = documentos.findIndex(item => item.id === botao.dataset.id);
    if (indice < 0) return;

    const documento = documentos[indice];

    if (botao.dataset.acao === "editar") {
      documentoEmEdicao = documento.id;
      tipoDocumento.value = documento.tipo;
      nomeDocumento.value = documento.nome;
      ficheiroDocumento.value = "";
      ficheiroDocumento.required = false;
      botaoGuardarDocumento.textContent = "Guardar alterações";
      botaoCancelarEdicao.hidden = false;
      mostrarMensagem("Edite o nome, o tipo ou seleccione um novo ficheiro.", false);
      formularioDocumentos.scrollIntoView({ behavior: "smooth", block: "center" });
      nomeDocumento.focus();
      return;
    }

    if (botao.dataset.acao === "apagar") {
      if (!window.confirm("Apagar o documento ‘" + documento.nome + "’ deste dispositivo?")) return;
      documentos.splice(indice, 1);
      try {
        guardarDocumentos(documentos);
        apresentarDocumentos();
        mostrarMensagem("Documento apagado do armazenamento local.", false);
      } catch (erro) {
        mostrarMensagem("Não foi possível actualizar o armazenamento local.", true);
      }
      return;
    }

    if (botao.dataset.acao === "submeter") {
      documento.estado = "Submetido localmente";
      documento.atualizadoEm = new Date().toISOString();
      try {
        guardarDocumentos(documentos);
        apresentarDocumentos();
        mostrarMensagem("Estado actualizado. O documento não foi enviado para um servidor.", false);
      } catch (erro) {
        mostrarMensagem("Não foi possível actualizar o estado do documento.", true);
      }
    }
  });

  botaoCancelarEdicao.addEventListener("click", function () {
    limparFormulario();
    mostrarMensagem("Edição cancelada.", false);
  });

  apresentarDocumentos();
});
