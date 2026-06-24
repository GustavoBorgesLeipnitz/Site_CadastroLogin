


export async function Cadastro(name, login, password){ // deve retornar a conta ou um erro
    try {
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
    } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}

export async function Login(login, password){ // deve retronar a conta ou um erro
    try {
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
    } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}

export async function Logout(token){ // deve retornar se o logout foi bem sucedido ou não
    try {
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
    } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}

export async function Delete(token){ // deve retornar se a exclusão da conta foi bem sucedida ou não
    try {
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
        } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}

export async function getName(token){ // deve retornar o nome da conta associada ao token caso seja valido
    try {
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
    } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}

export async function getMoney(token) {
    try {
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
    } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}

export async function sendMoney(token, amount, receiver){ // deve enviar a quantia de dinheiro especificada para a conta do receiver caso o token seja valido e o dinheiro seja suficiente
    try {
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
    } catch(error){
        console.log(error)
        alert("Erro ao realizar o Cadastro, verifique sua conexão com a internet.")
        return {error:"Erro ao se conectar com a API."}
    } 
}


export function setUserToken(token) {
    localStorage.setItem("UserToken", token);
}

export function getUserToken() {
    return localStorage.getItem("UserToken");
}

export async function validToken() {
    if (getUserToken() === null || getUserToken() === "") {
        return false;
    }
    let response = await getName(getUserToken());
    if (response.error === undefined) {
        return true;
    } else {
        localStorage.setItem("UserToken", "");
        return false;
    }
}