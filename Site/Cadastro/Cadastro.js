import { Cadastro, setUserToken, validToken } from '../Api.js';


const Cadastro_Button = document.getElementById('cadastro_button');

Cadastro_Button.addEventListener('click', async () => {
    const nome = document.getElementById('cadastro_name').value;
    const usuario = document.getElementById('cadastro_login').value;
    const senha = document.getElementById('cadastro_password').value;

    try {
        if (await validToken()){
            alert('Você não pode cadastrar estando logado.');
            window.location.href='../MainLogado/MainLogado.html'
            return;
        }
        const resultado = await Cadastro(nome, usuario, senha);
        console.log(resultado);
        if (resultado.error !== undefined) {
            alert('Falha no cadastro: ' + resultado.error);
            return;
        }
        setUserToken(resultado.token);
        window.location.href='../MainLogado/MainLogado.html'
        alert('Cadastro bem-sucedido');
    } catch (error) {
        console.log(error)
        alert('Falha no cadastro');
    }
});