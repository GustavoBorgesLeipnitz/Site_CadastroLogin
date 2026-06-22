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

async function sendMoney(token, amount, receiver){ // deve enviar a quantia de dinheiro especificada para a conta do receiver caso o token seja valido e o dinheiro seja suficiente
    const response = await fetch('http://localhost:3000/sendMoney', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
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

async function Testes_Logout(){
    console.log("Iniciando Testes Logout");
    let erros = 0;

    let conta1 = await Login("LOGIN1", "PASSWORD");
    let conta2 = await Login("LOGIN2", "PASSWORD");

    let result1 = await Logout(conta1.token);
    let result2 = await Logout(conta2.token);

    if (result1.msg !== "Logout realizado com sucesso"){
        console.error("Erro Logout 1");
        erros++;
    }
    if (result2.msg !== "Logout realizado com sucesso"){
        console.error("Erro Logout 2");
        erros++;
    }

    if ((await getName(conta1.token)).error !== "Token inválido"){
        console.error("Erro Logout 3");
        erros++;
    }

    console.log("Testes Logout Finalizados com " + erros + " erros");
    return erros;
}

async function Testes_GetName(){
    console.log("Iniciando Testes GetName");
    let erros = 0;

    let conta1 = await Login("LOGIN1", "PASSWORD");
    let conta2 = await Login("LOGIN2", "PASSWORD");

    let result1 = await getName(conta1.token);
    let result2 = await getName(conta2.token);

    if (result1.name !== "NOME1"){
        console.error("Erro GetName 1");
        erros++;
    }
    if (result2.name !== "NOME2"){
        console.error("Erro GetName 2");
        erros++;
    }

    console.log("Testes GetName Finalizados com " + erros + " erros");
    return erros;
}

async function Testes_GetMoney(){
    console.log("Iniciando Testes GetMoney");
    let erros = 0;

    let conta1 = await Login("LOGIN1", "PASSWORD");
    let conta2 = await Login("LOGIN2", "PASSWORD");


    if ((await getMoney(conta1.token)).money !== 0){
        console.error("Erro GetMoney 1");
        erros++;
    }
    if ((await getMoney(conta2.token)).money !== 0){
        console.error("Erro GetMoney 2");
        erros++;
    }

    console.log("Testes GetMoney Finalizados com " + erros + " erros");
    return erros;
}

async function Testes_SendMoney(){
    console.log("Iniciando Testes SendMoney");
    let erros = 0;

    let conta1 = await Login("LOGIN1", "PASSWORD");
    let conta2 = await Login("LOGIN2", "PASSWORD");

    let result1 = await sendMoney(conta1.token, 100, "NOME2");
    let result2 = await sendMoney(conta1.token, 100, "TESTE");
    let result3 = await sendMoney(conta1.token, 0, "NOME2");

    if (result1.error !== "Saldo insuficiente"){
        console.error("Erro SendMoney 1");
        erros++;
    }
    if (result2.error !== "Destinatário não encontrado"){
        console.error("Erro SendMoney 2");
        erros++;
    }
    if (result3.error !== "Saldo inválido"){
        console.error("Erro SendMoney 3");
        erros++;
    }

    console.log("Testes SendMoney Finalizados com " + erros + " erros");
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

    conta1 = await Login("LOGIN1", "PASSWORD");
    conta2 = await Login("LOGIN2", "PASSWORD");

    if (conta1.error !== "Login ou Senha inválido"){
        console.error("Erro Delete 3");
        erros++;
    }

    if (conta2.error !== "Login ou Senha inválido"){
        console.error("Erro Delete 4");
        erros++;
    }

    console.log("Testes Delete Finalizados com " + erros + " erros");
    return erros;
}


async function Testes(){
    let total_erros = 0;
    total_erros += await Testes_Cadastro();
    total_erros += await Testes_Login();
    total_erros += await Testes_Logout();
    total_erros += await Testes_GetMoney();
    total_erros += await Testes_GetName();
    total_erros += await Testes_SendMoney();
    total_erros += await Testes_Delete();
    console.log("Testes Finalizados com " + total_erros + " erros");
}


Testes();