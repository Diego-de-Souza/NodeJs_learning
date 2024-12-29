var express = require('express');
var app = express();
var router = require('./routes/routes');
var cors = require('cors');

app.use(cors());

// Para processar JSON
app.use(express.json());

// Para processar dados de formulário (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use("/",router);

app.listen(9292,() => {
    console.log("Servidor rodando na porta 9292");
    console.log("url de acesso: http://localhost:9292");
});
