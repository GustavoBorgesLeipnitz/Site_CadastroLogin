import { Login, getUserToken, setUserToken, validToken } from '../Api.js';

const LoginButton = document.getElementById('LoginButton');

LoginButton.addEventListener('click', async () => {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
        if (await validToken()){
            alert('Você já está logado.');
            window.location.href='../MainLogado/MainLogado.html'
            return;
        }
        const resultado = await Login(usuario, senha);
        if (resultado.error !== undefined) {
            alert('Falha no login: ' + resultado.error);
            return;
        }
        setUserToken(resultado.token);
        console.log(resultado);
        window.location.href='../MainLogado/MainLogado.html'
        alert('Login bem-sucedido');
    } catch (error) {
        console.log(error)
        alert('Falha no login');
    }
});