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



const contas = []

class Conta {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.token = "";
    }
}


function IsLoginValid(login){
    if (login.length < 5 || login.length > 20){
        return "a senha deve ter entre 5 e 20 caracteres"
    }
    const temEspecial = /[^a-zA-Z0-9]/.test(login);
    if (temEspecial){
        return "o login não pode conter caracteres especiais"
    }
    return true
}

function IsPasswordValid(password){
    if (password.length < 5 || password.length > 20){
        return "a senha deve ter entre 5 e 20 caracteres"
    }
    return true
}

app.post('/login', (req, res) => {
    let body = req.body;
    let { login, password } = body;

    if (!login) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    let conta = contas.find(c => c.login === login);

    if (!conta) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (conta.password !== password) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    conta.token = genToken();

    res.json({
        conta: conta
    });
});

app.post('/cadastro', (req, res) => {
    let body = req.body;
    let { login, password } = body;

    if (!login) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (IsLoginValid(login) !== true) {
        return res.status(400).json({ error: IsLoginValid(login) });
    }

    if (IsPasswordValid(password) !== true) {
        return res.status(400).json({ error: IsPasswordValid(password) });
    }

    let conta = contas.find(c => c.login === login);

    if (conta) {
        return res.status(400).json({ error: 'Login já cadastrado' });
    }

    conta = new Conta(login, password);
    contas.push(conta);
    conta.token = genToken();

    res.json({
        token: conta.token,
        conta: conta
    });
});

app.post('/logout', (req, res) => {
    let body = req.body;
    let { token } = body;

    if (!token) {
        return res.status(400).json({ error: 'Token Invalido' });
    }

    let conta = contas.find(c => c.token === token);

    if (!conta) {
        return res.status(400).json({ error: 'Token Invalido' });
    }


    conta.token = "";


    res.json({
        "message": "Logout realizado com sucesso"
    });
});

app.post('/delete', (req, res) => {
    let body = req.body;
    let { login, password } = body;

    if (!login) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (!token) {
        return res.status(400).json({ error: 'Token Invalido' });
    }

    let conta = contas.find(c => c.login === login && c.password === password);

    if (!conta) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    if (conta.password !== password) {
        return res.status(400).json({ error: 'Login ou Senha Invalido' });
    }

    conta.token = genToken();

    res.json({
        conta: conta
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});