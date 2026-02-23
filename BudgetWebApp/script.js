   // Dados da aplicação
    let budgetData = {
        totalBudget: 0,
        expenses: [],
        remainingBudget: 0
    };

    let chart = null;

    // Mudar tema
    function toggleTheme() {
        const body = document.body;
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            themeToggle.textContent = 'Noite';
            document.cookie = 'darkMode=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
        } else {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Dia';
            document.cookie = 'darkMode=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
        }
    }

    // Carregar tema salvo
    function loadTheme() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'darkMode' && value === 'true') {
                document.body.classList.add('dark-mode');
                document.querySelector('.theme-toggle').textContent = 'Dia';
                return;
            }
        }
    }

    // Carregar dados ao iniciar
    window.onload = function() {
        loadTheme();
        loadData();
        updateDisplay();
        updateStats();
    };

    // Salvar dados no armazenamento local
    function saveData() {
        const dataStr = JSON.stringify(budgetData);
        document.cookie = `budgetData=${dataStr}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    // Carregar dados do armazenamento local
    function loadData() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'budgetData') {
                try {
                    budgetData = JSON.parse(decodeURIComponent(value));
                    return;
                } catch (e) {
                    console.error('Erro ao carregar dados:', e);
                }
            }
        }
    }

    // Definir orçamento
    function setBudget() {
        const totalBudget = parseFloat(document.getElementById('totalBudget').value);
        
        if (isNaN(totalBudget) || totalBudget <= 0) {
            alert('Por favor, insira um valor válido para o orçamento');
            return;
        }

        budgetData.totalBudget = totalBudget;
        budgetData.remainingBudget = totalBudget - getTotalSpent();
        
        // Mudar interface após definir orçamento
        document.getElementById('setBudgetBtn').style.display = 'none';
        document.getElementById('addBudgetBtn').style.display = 'block';
        document.getElementById('totalBudget').previousElementSibling.textContent = 'Adicionar ao Orçamento';
        document.getElementById('totalBudget').placeholder = 'Ex: 200 (valor adicional)';
        
        saveData();
        updateDisplay();
        updateStats();
        
        document.getElementById('totalBudget').value = '';
        alert('Orçamento definido com sucesso!');
    }

    // Adicionar ao orçamento existente
    function addToBudget() {
        const additionalBudget = parseFloat(document.getElementById('totalBudget').value);
        
        if (isNaN(additionalBudget) || additionalBudget <= 0) {
            alert('Por favor, insira um valor válido para adicionar ao orçamento');
            return;
        }

        budgetData.totalBudget += additionalBudget;
        budgetData.remainingBudget += additionalBudget;
        
        saveData();
        updateDisplay();
        updateStats();
        
        document.getElementById('totalBudget').value = '';
        alert(`MT ${additionalBudget.toFixed(2)} adicionados ao orçamento com sucesso!`);
    }

    // Adicionar gasto
    function addExpense() {
        const name = document.getElementById('expenseName').value.trim();
        const dateInput = document.getElementById('expenseDate').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);

        if (!name) {
            alert('Por favor, insira o nome do produto/serviço');
            return;
        }

        if (!dateInput) {
            alert('Por favor, selecione a data do gasto');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert('Por favor, insira um valor válido para o gasto');
            return;
        }

        // Converter data para formato dia/mês/ano
        const dateObj = new Date(dateInput);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

        const expense = {
            id: Date.now(),
            name: name,
            amount: amount,
            date: formattedDate
        };

        budgetData.expenses.push(expense);
        budgetData.remainingBudget = budgetData.totalBudget - getTotalSpent();

        saveData();
        updateDisplay();
        updateStats();

        document.getElementById('expenseName').value = '';
        document.getElementById('expenseDate').value = '';
        document.getElementById('expenseAmount').value = '';
    }

    // Calcular total gasto
    function getTotalSpent() {
        return budgetData.expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    // Atualizar exibição
    function updateDisplay() {
        document.getElementById('remainingBudget').textContent = `MT ${budgetData.remainingBudget.toFixed(2)}`;
        
        // Verificar se já existe orçamento definido
        if (budgetData.totalBudget > 0) {
            document.getElementById('setBudgetBtn').style.display = 'none';
            document.getElementById('addBudgetBtn').style.display = 'block';
            document.getElementById('totalBudget').previousElementSibling.textContent = 'Adicionar ao Orçamento';
            document.getElementById('totalBudget').placeholder = 'Ex: 200 (valor adicional)';
        }
        
        const expensesList = document.getElementById('expensesList');
        
        if (budgetData.expenses.length === 0) {
            expensesList.innerHTML = '<div class="no-data">Nenhum gasto registado ainda</div>';
            return;
        }

        expensesList.innerHTML = budgetData.expenses.map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-name">${expense.name}</div>
                    <div class="expense-date">${expense.date}</div>
                </div>
                <div class="expense-amount">MT ${expense.amount.toFixed(2)}</div>
            </div>
        `).reverse().join('');
    }

    // Atualizar estatísticas
    function updateStats() {
        const totalSpent = getTotalSpent();
        const averageSpend = budgetData.expenses.length > 0 ? totalSpent / budgetData.expenses.length : 0;
        
        document.getElementById('totalSpent').textContent = `MT ${totalSpent.toFixed(2)}`;
        document.getElementById('averageSpend').textContent = `MT ${averageSpend.toFixed(2)}`;
        document.getElementById('totalPurchases').textContent = budgetData.expenses.length;

        updateChart();
        updatePrediction();
    }

    // Atualizar gráfico
    function updateChart() {
        const ctx = document.getElementById('spendingChart').getContext('2d');
        
        if (chart) {
            chart.destroy();
        }

        if (budgetData.expenses.length === 0) {
            return;
        }

        // Agrupar gastos por categoria (primeiras 10 compras ou últimos 7 dias)
        const last7Days = budgetData.expenses.slice(-7);
        const labels = last7Days.map(expense => expense.name);
        const data = last7Days.map(expense => expense.amount);

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gastos (MT)',
                    data: data,
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c',
                        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                        '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
                    ],
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Atualizar previsão
    function updatePrediction() {
        const predictionDiv = document.getElementById('prediction');
        const predictionText = document.getElementById('predictionText');

        if (budgetData.expenses.length < 2 || budgetData.totalBudget === 0) {
            predictionDiv.style.display = 'none';
            return;
        }

        // Calcular média diária de gastos
        const daysSinceFirstExpense = getDaysSinceFirstExpense();
        const totalSpent = getTotalSpent();
        const dailyAverage = totalSpent / Math.max(daysSinceFirstExpense, 1);
        
        // Calcular quantos dias restam
        const remainingBudget = budgetData.remainingBudget;
        const daysRemaining = remainingBudget / dailyAverage;

        predictionDiv.style.display = 'block';

        if (daysRemaining < 0) {
            predictionText.innerHTML = `
                <strong>Orçamento esgotado!</strong><br>
                Já gastou MT ${Math.abs(remainingBudget).toFixed(2)} acima do orçamento.
            `;
        } else if (daysRemaining < 7) {
            predictionText.innerHTML = `
                <strong>Atenção!</strong> Ao ritmo atual de gastos (MT ${dailyAverage.toFixed(2)}/dia), 
                o seu orçamento irá esgotar em aproximadamente <strong>${Math.floor(daysRemaining)} dias</strong>.
            `;
        } else {
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + daysRemaining);
            predictionText.innerHTML = `
                Com base no seu padrão de gastos atual, o orçamento deverá durar até aproximadamente 
                <strong>${endDate.toLocaleDateString('pt-PT')}</strong> (${Math.floor(daysRemaining)} dias).
            `;
        }
    }

    // Calcular dias desde a primeira compra
    function getDaysSinceFirstExpense() {
        if (budgetData.expenses.length === 0) return 0;
        
        const firstExpenseDate = new Date(budgetData.expenses[0].date.split('/').reverse().join('/'));
        const today = new Date();
        const diffTime = Math.abs(today - firstExpenseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(diffDays, 1);
    }

    // Resetar app completamente
    function resetApp() {
        if (confirm('Tem certeza que deseja resetar completamente a app? Todos os dados serão perdidos definitivamente.')) {
            // Resetar dados completamente
            budgetData = {
                totalBudget: 0,
                expenses: [],
                remainingBudget: 0
            };
            
            // Limpar cookies
            document.cookie = 'budgetData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            // Resetar interface para estado inicial
            document.getElementById('setBudgetBtn').style.display = 'block';
            document.getElementById('addBudgetBtn').style.display = 'none';
            document.getElementById('totalBudget').previousElementSibling.textContent = 'Orçamento Mensal Total';
            document.getElementById('totalBudget').placeholder = 'Ex: 1000';
            
            // Limpar todos os campos
            document.getElementById('totalBudget').value = '';
            document.getElementById('expenseName').value = '';
            document.getElementById('expenseDate').value = '';
            document.getElementById('expenseAmount').value = '';
            
            // Atualizar displays
            updateDisplay();
            updateStats();
            
            // Destruir gráfico
            if (chart) {
                chart.destroy();
                chart = null;
            }
            
            alert('App restaurada com sucesso! Todos os dados foram limpos.');
        }
    }

    // Limpar todos os dados
    function clearAllData() {
        if (confirm('Tem certeza que quer apagar o histórico de gastos?')) {
            budgetData.expenses = [];
            budgetData.remainingBudget = budgetData.totalBudget;
            
            saveData();
            updateDisplay();
            updateStats();
            
            if (chart) {
                chart.destroy();
                chart = null;
            }
            
            // Forçar atualização da interface
            document.getElementById('totalSpent').textContent = 'MT 0,00';
            document.getElementById('averageSpend').textContent = 'MT 0,00';
            document.getElementById('totalPurchases').textContent = '0';
            
            alert('A lista de dados foi reposta com sucesso!');
        }
    }

    // Mudar abas
    function showTab(tabName) {
        // Remover classe ativa de todas as abas
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Ativar aba selecionada
        event.target.classList.add('active');
        document.getElementById(tabName + 'Tab').classList.add('active');
        
        // Atualizar gráfico se for a aba de estatísticas
        if (tabName === 'stats') {
            setTimeout(() => {
                updateChart();
            }, 100);
        }
    }