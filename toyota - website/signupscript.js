//botoes da tela de login

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

//botao para criar conta e faz o painel mudar para a direita
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

//botao para entrar na conta e faz a tela passar para a esquerda
signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});