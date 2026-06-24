import { getName, getUserToken, validToken, setUserToken, Logout, getMoney, sendMoney } from '../Api.js';

const MoneyText = document.getElementById('MoneyText');


async function UpdateMoney(){
    let response = await getMoney(getUserToken());
    if (response.error !== undefined){
        alert('Erro ao pegar o dinheiro:' + response.error);
        window.location.href='../Login/Login.html'
    } else {
        MoneyText.innerHTML = "Your Money: " + response.money;
    }
}


async function updateToken() {
    if (!await validToken()) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href='../Login/Login.html'
    }
}



if (!await validToken()) {
    await updateToken()
} else {
    await UpdateMoney()
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

const SendButton = document.getElementById('SendButton');
const AmountInput = document.getElementById('AmountInput');
const RecieverInput = document.getElementById('RecieverInput');

SendButton.addEventListener('click', async () => {
    console.log(AmountInput.value)
    let response = await sendMoney(getUserToken(), AmountInput.value, RecieverInput.value);
    if (response.error !== undefined) {
        alert('Falha ao enviar: ' + response.error);
        await updateToken()
    } else {
        alert('Enviado com sucesso!');
        await UpdateMoney()
    }
});