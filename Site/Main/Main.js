import { getName, getUserToken, validToken } from '../Api.js';

async function checkLogin() {
    if (await validToken()) {
        alert('Você já está logado.');
        window.location.href='../MainLogado/MainLogado.html'
    }
}


checkLogin()