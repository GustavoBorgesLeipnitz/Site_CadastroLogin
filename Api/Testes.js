
async function Cadastro(name, login, password){ // deve retornar o token de acesso
    const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            login: login,
            password: password
        })
    })
    const data = await response.json();
    //console.log("cadastro:", data);
    return data;
}

async function Login(login, password){ // deve retronar o token de acesso
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
    const data = await response.json();
    //console.log("login:", data);
    return data;
}

async function Logout(token){ // deve retornar se o logout foi bem sucedido ou não
    const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
        })
    })
    const data = await response.json();
    //console.log("logout:", data);
    return data;
}


async function Delete(token){ // deve retornar se a exclusão da conta foi bem sucedida ou não
    const response = await fetch('http://localhost:3000/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
        })
    })
    const data = await response.json();
    //console.log("delete:", data);
    return data;
}


async function getName(token){ // deve retornar o nome da conta associada ao token caso seja valido
    const response = await fetch('http://localhost:3000/getName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
        })
    })
    const data = await response.json();
    //console.log("getName:", data);
    return data;
}

async function getMoney(token) {
    const response = await fetch('http://localhost:3000/getMoney', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
        })
    });

    const data = await response.json();
    //console.log("getMoney:", data);
    return data;
}

async function sendMoney(Token, amount, receiver){ // deve enviar a quantia de dinheiro especificada para a conta do receiver caso o token seja valido e o dinheiro seja suficiente
    const response = await fetch('http://localhost:3000/sendMoney', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Token: Token,
            amount: amount,
            receiver: receiver
        })
    })
    const data = await response.json();
    //console.log("sendMoney:", data);
    return data;
}





async function Testes_Cadastro(){
    console.log("Iniciando Testes Cadastro");
    let erros = 0;

    conta1 = await Cadastro("NOME1", "LOGIN1", "PASSWORD");
    conta2 = await Cadastro("NOME2", "LOGIN2", "PASSWORD");

    if (conta1.name !== "NOME1"){
        console.error("Erro Cadastro 1");
        erros++;
    }
    if (conta1.login !== "LOGIN1"){
        console.error("Erro Cadastro 2");
        erros++;
    }
    if (conta1.password !== "PASSWORD"){
        console.error("Erro Cadastro 3");
        erros++;
    }


    if (conta2.name !== "NOME2"){
        console.error("Erro Cadastro 4");
        erros++;
    }
    if (conta2.login !== "LOGIN2"){
        console.error("Erro Cadastro 5");
        erros++;
    }
    if (conta2.password !== "PASSWORD"){
        console.error("Erro Cadastro 6");
        erros++;
    }


    console.log("Testes Cadastro Finalizados com " + erros + " erros");
    return erros;
}


async function Testes_Login(){
    console.log("Iniciando Testes Login");
    let erros = 0;
        
    let conta1 = await Login("LOGIN1", "PASSWORD");
    let conta2 = await Login("LOGIN2", "PASSWORD");

    if (conta1.name !== "NOME1"){
        console.error("Erro Login 1");
        erros++;
    }
    if (conta1.login !== "LOGIN1"){
        console.error("Erro Login 2");
        erros++;
    }
    if (conta1.password !== "PASSWORD"){
        console.error("Erro Login 3");
        erros++;
    }


    if (conta2.name !== "NOME2"){
        console.error("Erro Login 4");
        erros++;
    }
    if (conta2.login !== "LOGIN2"){
        console.error("Erro Login 5");
        erros++;
    }
    if (conta2.password !== "PASSWORD"){
        console.error("Erro Login 6");
        erros++;
    }

    console.log("Testes Login Finalizados com " + erros + " erros");
    return erros;
}


async function Testes_Delete(){
    console.log("Iniciando Testes Delete");
    let erros = 0;
        
    let conta1 = await Login("LOGIN1", "PASSWORD");
    let conta2 = await Login("LOGIN2", "PASSWORD");

    let result1 = await Delete(conta1.token);
    let result2 = await Delete(conta2.token);

    if (result1.msg !== "Conta deletada com sucesso"){
        console.error("Erro Delete 1");
        erros++;
    }

    if (result2.msg !== "Conta deletada com sucesso"){
        console.error("Erro Delete 2");
        erros++;
    }

    console.log("Testes Delete Finalizados com " + erros + " erros");
    return erros;
}


async function Testes(){
    let total_erros = 0;
    total_erros += await Testes_Cadastro();
    total_erros += await Testes_Login();
    total_erros += await Testes_Delete();
    console.log("Testes Finalizados com " + total_erros + " erros");
}


Testes();