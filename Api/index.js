const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
app.use(express.json());


const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function genToken() {
    let Token = "";

    for (let i = 0; i < 50; i++) {
        Token += caracteres.charAt( Math.floor(Math.random() * caracteres.length) );
    }

    return Token;
}



let contas = []

class Conta {
    constructor(name, login, password) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.token = "";
        this.money = 0;
    }
}

function IsLoginValid(login){
    if (login.length < 5 || login.length > 15){
        return "o login deve ter entre 5 e 15 caracteres"
    }
    const temEspecial = /[^a-zA-Z0-9]/.test(login);
    if (temEspecial){
        return "o login não pode conter caracteres especiais"
    }
    return true
}

function IsPasswordValid(password){
    if (password.length < 5 || password.length > 15){
        return "a senha deve ter entre 5 e 15 caracteres"
    }
    return true
}

function isNameValid(name){
    if (name.length < 1 || name.length > 15){
        return "o nome deve ter entre 1 e 15 caracteres"
    }
    const temEspecial = /[^a-zA-Z0-9]/.test(name);
    if (temEspecial){
        return "o nome não pode conter caracteres especiais"
    }
    return true
}

app.post('/login', (req, res) => { // recebe login e password, deve retornar o token de acesso caso sejam validos
    let body = req.body;
    let { login, password } = body;

    if (typeof login !== "string") {
        return res.status(400).json({ error: 'Login ou Senha inválido' });
    }

    if (typeof password !== "string") {
        return res.status(400).json({ error: 'Login ou Senha inválido' });
    }

    let conta = contas.find(c => c.login === login);

    if (!conta) {
        return res.status(400).json({ error: 'Login ou Senha inválido' });
    }

    if (conta.password !== password) {
        return res.status(400).json({ error: 'Login ou Senha inválido' });
    }

    conta.token = genToken();

    res.json(conta);
});

app.post('/cadastro', (req, res) => { // recebe name, login e password, deve cadastrar uma nova conta se forem validos e retornar a conta
    let body = req.body;

    if (typeof body !== "object") {
        return res.status(400).json({ error: 'Dados de cadastro são obrigatórios' });
    }

    let { name, login, password } = body;

    if (typeof login !== "string") {
        return res.status(400).json({ error: 'Login é obrigatório' });
    }

    if (typeof password !== "string") {
        return res.status(400).json({ error: 'Senha é obrigatória' });
    }

    if (typeof name !== "string") {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    if (IsLoginValid(login) !== true) {
        return res.status(400).json({ error: IsLoginValid(login) });
    }

    if (IsPasswordValid(password) !== true) {
        return res.status(400).json({ error: IsPasswordValid(password) });
    }

    if (isNameValid(name) !== true) {
        return res.status(400).json({ error: isNameValid(name) });
    }

    let conta = contas.find(c => c.login === login);

    if (conta) {
        return res.status(400).json({ error: 'Login já cadastrado' });
    }

    conta = new Conta(name, login, password);
    contas.push(conta);
    conta.token = genToken();

    res.json(conta);
});

app.post('/logout', (req, res) => { // recebe o token e reseta o token da conta caso seja valido
    let body = req.body;

    if (typeof body !== "object") {
        return res.status(400).json({ error: 'Dados de cadastro são obrigatórios' });
    }

    let { token } = body;


    if (typeof token !== "string") {
        return res.status(400).json({ error: 'Token inválido' });
    }

    let conta = contas.find(c => c.token === token);

    if (!conta) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    conta.token = "";

    res.json({
        msg: "Logout realizado com sucesso"
    });
});

app.post('/delete', (req, res) => { // recebe o token e deleta a conta caso seja valido
    let body = req.body;

    if (typeof body !== "object") {
        return res.status(400).json({ error: 'Dados de cadastro são obrigatórios' });
    }

    let { token } = body;

    if (typeof token !== "string") {
        return res.status(400).json({ error: 'Token é obrigatório' });
    }

    let conta = contas.find(c => c.token === token);

    if (!conta) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    contas = contas.filter(c => c.token !== token);

    res.json({
        msg: "Conta deletada com sucesso"
    });
});

app.post('/getName', (req, res) => { // recebe o token e retorna o nome da conta caso seja valido
    let body = req.body;

    if (typeof body !== "object") {
        return res.status(400).json({ error: 'Dados de cadastro são obrigatórios' });
    }

    let { token } = body;

    if (typeof token !== "string") {
        return res.status(400).json({ error: 'Token inválido' });
    }

    let conta = contas.find(c => c.token === token);

    if (!conta) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    res.json({
        name: conta.name
    });
});

app.post('/getMoney', (req, res) => { // recebe o token e retorna o dinheiro da conta caso seja valido
    let body = req.body;

    if (typeof body !== "object") {
        return res.status(400).json({ error: 'Dados de cadastro são obrigatórios' });
    }

    let { token } = body;

    if (typeof token !== "string") {
        return res.status(400).json({ error: 'Token inválido' });
    }

    let conta = contas.find(c => c.token === token);

    if (!conta) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    res.json({
        money: conta.money
    });
});

app.post('/sendMoney', (req, res) => { // recebe o token e a quantia de dinheiro que vai ser enviada
    let body = req.body;

    if (typeof body !== "object") {
        return res.status(400).json({ error: 'Dados de cadastro são obrigatórios' });
    }

    let { token, amount, receiver } = body;


    if (typeof token !== "string") {
        return res.status(400).json({ error: 'Token inválido' });
    }

    if (typeof amount !== "number"){
        return res.status(400).json({ error: 'Saldo inválido' });
    }

    let conta = contas.find(c => c.token === token);

    if (!conta) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    let destinatario = contas.find(c => c.name === receiver);

    if (!destinatario) {
        return res.status(400).json({ error: 'Destinatário não encontrado' });
    }

    if (amount < 1) {
        return res.status(400).json({ error: 'Saldo inválido' });
    }

    amount = Math.trunc(amount * 100) / 100;

    if (amount > conta.money) {
        return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    conta.money -= amount;
    destinatario.money += amount;

    res.json({
        msg: "dinheiro enviado com sucesso"
    });
})



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});