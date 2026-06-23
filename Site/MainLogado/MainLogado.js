import { getName, getUserToken, validToken, setUserToken, Logout } from '../Api.js';



if (!await validToken()) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href='../Login/Login.html'
}

const LogoutButton = document.getElementById('LogoutButton');

LogoutButton.addEventListener('click', async () => {
    let response = await Logout(getUserToken());
    if (response.error !== undefined) {
        alert('Falha no logout: ' + response.error);
    } else {
        alert('Logout bem-sucedido');
    }
    setUserToken("");
    window.location.href='../Main/Main.html'
});