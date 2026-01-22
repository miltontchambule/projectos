
    // variaveis principais

    const inputFicheiro = document.getElementById('inputFicheiro');
    const listaFicheiros = document.getElementById('listaFicheiros');
    const btnAdicionar = document.getElementById('btnAdicionar');
    const mensagem = document.getElementById('mensagem');

    // salva os ficheiros adicionados em memória
    let ficheiros = [];

    // funcao para adicionar ficheiros
    btnAdicionar.addEventListener('click', () => {
      const novosFicheiros = Array.from(inputFicheiro.files);

      if (novosFicheiros.length === 0) {
        mostrarMensagem('Nenhum ficheiro selecionado.');
        return;
      }

      novosFicheiros.forEach(f => {
        ficheiros.push({
          nome: f.name,
          tipo: f.type,
          url: URL.createObjectURL(f) // Cria link temporário para abrir e ver o ficheiro adicionado
        });
      });

      inputFicheiro.value = ''; // Limpa o campo
      atualizarLista();
      mostrarMensagem('Ficheiro(s) adicionado(s) com sucesso!');
    });

    //  funcao para actualizar a lista de ficheiros
    function atualizarLista() {
      listaFicheiros.innerHTML = '';

      ficheiros.forEach((ficheiro, index) => {
        const li = document.createElement('li');

        
        let visual = '';
        if (ficheiro.tipo.includes('image')) {
          visual = `<img src="${ficheiro.url}" alt="${ficheiro.nome}">`;
        } else {
          visual = `<span></span>`;
        }

        li.innerHTML = `
          <div>
            ${visual}
            <span>${ficheiro.nome}</span>
          </div>
          <div class="botoes">
            <button class="ver" onclick="verFicheiro(${index})">Ver</button>
            <button class="renomear" onclick="renomearFicheiro(${index})">Renomear</button>
            <button class="apagar" onclick="apagarFicheiro(${index})">Apagar</button>
          </div>
        `;

        listaFicheiros.appendChild(li);
      });

      if (ficheiros.length === 0) {
        listaFicheiros.innerHTML = '<p style="text-align:center;color:#777;">Nenhum ficheiro adicionado.</p>';
      }
    }

    // funcao de ver ficheiro (READ)
    function verFicheiro(index) {
      const ficheiro = ficheiros[index];
      window.open(ficheiro.url, '_blank'); // Abre o ficheiro numa nova aba
    }

    // funcao de renomear o ficheiro (RENAME)
    function renomearFicheiro(index) {
      const novoNome = prompt('Digite o novo nome do ficheiro:', ficheiros[index].nome);
      if (novoNome && novoNome.trim() !== '') {
        ficheiros[index].nome = novoNome.trim();
        atualizarLista();
        mostrarMensagem('Ficheiro renomeado com sucesso!');
      }
    }

    // funcao de apagar o ficheiro (DELETE)
    function apagarFicheiro(index) {
      if (confirm('Tem certeza que deseja apagar este ficheiro?')) {
        ficheiros.splice(index, 1);
        atualizarLista();
        mostrarMensagem('Ficheiro apagado com sucesso!');
      }
    }

    // funcao da notificacao temporaria
    function mostrarMensagem(texto) {
      mensagem.textContent = texto;
      setTimeout(() => mensagem.textContent = '', 3000);
    }

    // Atualiza a lista inicial
    atualizarLista();