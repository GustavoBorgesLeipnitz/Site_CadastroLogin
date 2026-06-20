import { Login } from '../Api.js';

const LoginButton = document.getElementById('LoginButton');

LoginButton.addEventListener('click', async () => {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
        const resultado = await Login(usuario, senha);
        console.log(resultado);
        alert('Login bem-sucedido');
    } catch (error) {
        alert('Falha no login');
    }
});