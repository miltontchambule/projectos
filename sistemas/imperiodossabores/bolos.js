

(function(){

  /* =========================================================
     CONFIG — edite aqui
  ========================================================== */
  const CONFIG = {
    // Número de WhatsApp da loja em formato internacional, sem "+", sem espaços.
    // Ex: para +258 86 149 3492 -> "258861493492"
    numeroWhatsApp: "258826972504"
  };

  // Catálogo de bolos — substitua "img" pelo caminho/URL da foto real de cada bolo.
  const produtos = [
    {
      id: "choc-classico",
      nome: "Bolo de Chocolate Clássico",
      preco: "1500MT",
      descricao: "Massa fofa de chocolate com recheio e cobertura de ganache. Ideal para aniversários simples.",
      img: "900px-1.jpg"
    },
    {
      id: "morango-amor",
      nome: "Morango do Amor",
      preco: "1800MT",
      descricao: "Camadas de bolo de baunilha, chantilly e morango fresco. O mais pedido nas nossas redes.",
      img: "900px-2.jpg"
    },
    {
      id: "aniversario-tema",
      nome: "Bolo de Aniversário Temático",
      preco: "2200MT",
      descricao: "Decoração personalizada ao tema da festa, com nome e idade incluídos.",
      img: "900px-6.jpg"
    },
    {
      id: "casamento-andares",
      nome: "Bolo de Chocolate",
      preco: "1500MT",
      descricao: "Estrutura simples ou de andares, acabamento fondant ou chantilly, para jantares em família ou presente.",
      img: "900px-4.jpg"
    },
    {
      id: "red-velvet",
      nome: "Bolo de Uvas",
      preco: "1900MT",
      descricao: "Creme num equilíbrio perfeito entre doce e suave.",
      img: "900px-5.jpg"
    },
    {
      id: "corporativo",
      nome: "Bolo de Bodas",
      preco: "1700MT",
      descricao: "Perfeito para celebrar a vossa união depois de tanto tempo a construir algo lindo.",
      img: "900px-3.jpg"
    }
  ];

  const grid = document.getElementById("productGrid");
  produtos.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-photo">
        <img src="${p.img}" alt="${p.nome}" loading="lazy">
        <div class="price-seal">${p.preco}</div>
      </div>
      <div class="card-body">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <button type="button" class="card-order-btn" data-produto="${p.id}">Encomendar este bolo</button>
      </div>
    `;
    grid.appendChild(card);
  });

  /* =========================================================
     Selecção de bolo a partir dos cartões
  ========================================================== */
  let bolosSelecionado = null;
  const banner = document.getElementById("selectedBanner");
  const bannerNome = document.getElementById("selectedCakeName");

  grid.addEventListener("click", (e)=>{
    const btn = e.target.closest(".card-order-btn");
    if(!btn) return;
    const produto = produtos.find(p => p.id === btn.dataset.produto);
    if(!produto) return;
    bolosSelecionado = produto;
    bannerNome.textContent = produto.nome + " - " + produto.preco;
    banner.classList.add("show");
    document.getElementById("encomendar").scrollIntoView({behavior:"smooth", block:"start"});
  });

  document.getElementById("clearSelection").addEventListener("click", ()=>{
    bolosSelecionado = null;
    banner.classList.remove("show");
  });

 /* =========================================================
     Validação e envio para o WhatsApp
  ========================================================== */
  const form = document.getElementById("orderForm");

  const deliveryNote = document.getElementById("deliveryNote");
  form.querySelectorAll('input[name="delivery"]').forEach(radio=>{
    radio.addEventListener("change", ()=>{
      deliveryNote.classList.toggle("show", radio.value === "Sim" && radio.checked);
    });
  });

  function showError(id, show){
    const el = document.getElementById("err-"+id);
    if(el) el.classList.toggle("show", show);
  }

  function validarTelefone(valor){
    const digitos = valor.replace(/\D/g,"");
    return digitos.length >= 8 && digitos.length <= 9;
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const dados = {
      nome: form.nome.value.trim(),
      apelido: form.apelido.value.trim(),
      bairro: form.bairro.value.trim(),
      telefone: form.telefone.value.trim(),
      quantidade: form.quantidade.value,
      ocasiao: form.ocasiao.value,
      formato: form.formato.value,
      tamanho: form.tamanho.value,
       delivery: (form.querySelector('input[name="delivery"]:checked') || {}).value || "",
      dataEntrega: form.dataEntrega.value,
      observacoes: form.observacoes.value.trim()
    };

    let valido = true;
    showError("nome", false); showError("apelido", false);
    showError("bairro", false); showError("telefone", false);
    showError("dataEntrega", false);

    if(!dados.nome){ showError("nome", true); valido = false; }
    if(!dados.apelido){ showError("apelido", true); valido = false; }
    if(!dados.bairro){ showError("bairro", true); valido = false; }
    if(!validarTelefone(dados.telefone)){ showError("telefone", true); valido = false; }
    if(!dados.ocasiao || !dados.formato || !dados.tamanho){
      valido = false;
      alert("Por favor preencha a ocasião, o formato e o tamanho do bolo.");
    }
    if(!dados.delivery){
      valido = false;
      alert("Por favor indique se quer delivery.");
    }
    if(!dados.dataEntrega){ showError("dataEntrega", true); valido = false; }

    if(!valido) return;

    enviarParaWhatsApp(dados);
  });

  function formatarData(valor){
    if(!valor) return "";
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function enviarParaWhatsApp(dados){
    const linhas = [];
    linhas.push("*NOVA ENCOMENDA — Império do Sabor*");
    linhas.push("");
    if(bolosSelecionado){
      linhas.push(`*Bolo escolhido:* ${bolosSelecionado.nome} (${bolosSelecionado.preco})`);
    } else {
      linhas.push("*Bolo escolhido:* a definir com a loja");
    }
    linhas.push(`*Nome:* ${dados.nome}`);
    linhas.push(`*Apelido:* ${dados.apelido}`);
    linhas.push(`*Bairro:* ${dados.bairro}`);
    linhas.push(`*Telemóvel:* ${dados.telefone}`);
    linhas.push(`*Quantidade de bolos:* ${dados.quantidade}`);
    linhas.push(`*Ocasião:* ${dados.ocasiao}`);
    linhas.push(`*Formato:* ${dados.formato}`);
    linhas.push(`*Tamanho:* ${dados.tamanho}`);
    linhas.push(`*Delivery:* ${dados.delivery}${dados.delivery === "Sim" ? " (taxa de 200MT, apenas cidade de Maputo)" : ""}`);
    linhas.push(`*Data de entrega:* ${formatarData(dados.dataEntrega)}`);
    if(dados.observacoes){
      linhas.push(`*Observações:* ${dados.observacoes}`);
    }
    linhas.push("");
    linhas.push("_Encomenda gerada automaticamente pelo site. Aguardo confirmação._");

    const mensagem = encodeURIComponent(linhas.join("\n"));
    const url = `https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagem}`;
    window.open(url, "_blank");
  }

  // link de contacto directo no rodapé
  document.getElementById("footerWhatsapp").addEventListener("click", function(e){
    e.preventDefault();
    window.open(`https://wa.me/${CONFIG.numeroWhatsApp}`, "_blank");
  });

})();
