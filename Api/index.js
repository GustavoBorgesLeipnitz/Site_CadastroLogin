const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use(express.json());

app.post('/login', (req, res) => {
    let body = req.body;
    console.log(body);

    let { login, password } = body;

    res.json({
        login, password
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});