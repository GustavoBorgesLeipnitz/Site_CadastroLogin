
let UserToken = ""


export async function Register(){
    const response = await fetch('http://localhost:3000/register', {
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
    console.log(data);
    return data;
}

export async function Login(login, password){
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
    console.log(data);
    return data;
}

export async function Logout(){
    const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserToken: UserToken,
        })
    })
    const data = await response.json();
    console.log(data);
    return data;
}



