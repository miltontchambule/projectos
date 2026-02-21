let budget = 0;
  let entries = [];
  let editIdx = -1;

  const fmt = v => v.toLocaleString('pt-MZ', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' MZN';

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem('padaria') || '{}');
      budget = d.budget || 0;
      entries = Array.isArray(d.entries) ? d.entries : [];
      const dark = d.dark || false;
      if (dark) {
        document.body.classList.add('dark');
        document.getElementById('darkToggle').checked = true;
        document.getElementById('modeLabel').textContent = 'Escuro';
      }
      if (budget) document.getElementById('budgetInput').value = budget;
    } catch(e) { budget = 0; entries = []; }
    render();
  }

  function persist() {
    const dark = document.body.classList.contains('dark');
    localStorage.setItem('padaria', JSON.stringify({budget, entries, dark}));
  }




  function load() {
    const d = JSON.parse(localStorage.getItem('padaria') || '{}');
    budget = d.budget || 0;
    entries = d.entries || [];
    if (budget) document.getElementById('budgetInput').value = budget;
    render();
  }

  function save() {
    localStorage.setItem('padaria', JSON.stringify({budget, entries}));
  }

  function setBudget() {
    const v = parseFloat(document.getElementById('budgetInput').value);
    if (isNaN(v) || v <= 0) { alert('Insira um valor válido.'); return; }
    budget = v;
    save(); render();
  }


   // Adicionar ao orçamento existente
    // function addToBudget() {
    //     const additionalBudget = parseFloat(document.getElementById('budgetInput').value);
        
    //     if (isNaN(additionalBudget) || additionalBudget <= 0) {
    //         alert('Por favor, insira um valor válido para adicionar ao orçamento');
    //         return;
    //     }

    //     budgetData.totalBudget += additionalBudget;
    //     budgetData.remainingBudget += additionalBudget;
        
    //     saveData();
    //     updateDisplay();
    //     updateStats();
        
    //     document.getElementById('budgetInput').value = '';
    //     alert(`MT ${additionalBudget.toFixed(2)} adicionados ao orçamento com sucesso!`);
    // }


  function spent() { return entries.reduce((s, e) => s + e.qty * e.price, 0); }

  function render() {
    const s = spent();
    const rem = Math.max(0, budget - s);
    const pct = budget > 0 ? Math.min(100, (s / budget) * 100) : 0;
    document.getElementById('budgetTotal').textContent = fmt(budget);
    document.getElementById('budgetSpent').textContent = fmt(s);
    document.getElementById('budgetRemaining').textContent = fmt(rem);
    const fill = document.getElementById('progressFill');
    fill.style.width = pct + '%';
    fill.className = 'progress-fill' + (pct >= 90 ? ' danger' : '');
    renderTable();
  }

  function renderTable() {
    const tbody = document.getElementById('tableBody');
    const empty = document.getElementById('emptyMsg');
    if (!entries.length) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    tbody.innerHTML = entries.map((e, i) => `
      <tr>
        <td>${formatDate(e.date)}</td>
        <td>${e.desc || '<span style="color:var(--text2)">—</span>'}</td>
        <td><span class="tag">${e.qty}</span></td>
        <td>${fmt(e.price)}</td>
        <td><strong>${fmt(e.qty * e.price)}</strong></td>
        <td><div class="actions">
          <button class="btn btn-sm btn-edit" onclick="openEdit(${i})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="del(${i})">Apagar</button>
        </div></td>
      </tr>`).join('');
  }

  function formatDate(d) {
    if (!d) return '—';
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }

  function showAlert(msg) {
    const el = document.getElementById('formAlert');
    el.textContent = msg; el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }

  function addEntry() {
    const date = document.getElementById('fDate').value;
    const desc = document.getElementById('fDesc').value.trim();
    const qty = parseInt(document.getElementById('fQty').value);
    const price = parseFloat(document.getElementById('fPrice').value);
    if (!date) { showAlert('Por favor insira a data.'); return; }
    if (!qty || qty < 1) { showAlert('Insira uma quantidade válida.'); return; }
    if (isNaN(price) || price <= 0) { showAlert('Insira um preço válido.'); return; }
    const total = qty * price;
    if (budget > 0 && spent() + total > budget) {
      showAlert('Atenção: este registo ultrapassa o budget disponível!');
    }
    entries.unshift({date, desc, qty, price});
    save(); render(); clearForm();
  }

  function clearForm() {
    ['fDate','fDesc','fQty','fPrice'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fDate').value = new Date().toISOString().split('T')[0];
  }

  function del(i) {
    if (!confirm('Apagar este registo?')) return;
    entries.splice(i, 1);
    save(); render();
  }

  function openEdit(i) {
    editIdx = i;
    const e = entries[i];
    document.getElementById('eDate').value = e.date;
    document.getElementById('eDesc').value = e.desc || '';
    document.getElementById('eQty').value = e.qty;
    document.getElementById('ePrice').value = e.price;
    document.getElementById('editModal').classList.add('open');
  }

  function closeModal() {
    document.getElementById('editModal').classList.remove('open');
    editIdx = -1;
  }

  function saveEdit() {
    const date = document.getElementById('eDate').value;
    const desc = document.getElementById('eDesc').value.trim();
    const qty = parseInt(document.getElementById('eQty').value);
    const price = parseFloat(document.getElementById('ePrice').value);
    if (!date || !qty || isNaN(price)) { alert('Preencha todos os campos obrigatórios.'); return; }
    entries[editIdx] = {date, desc, qty, price};
    save(); render(); closeModal();
  }


  function toggleDark() {
    const on = document.getElementById('darkToggle').checked;
    document.body.classList.toggle('dark', on);
    document.getElementById('modeLabel').textContent = on ? 'Escuro' : 'Claro';
    persist();
  }


  function resetAll() {
    if (!confirm('Tens a certeza? Todos os dados (budget e registos) serão apagados permanentemente.')) return;
    budget = 0;
    entries = [];
    document.getElementById('budgetInput').value = '';
    persist(); render();
  }

  document.getElementById('editModal').addEventListener('click', e => {
    if (e.target === document.getElementById('editModal')) closeModal();
  });

  // Set today's date as default
  document.getElementById('fDate').value = new Date().toISOString().split('T')[0];
  load();