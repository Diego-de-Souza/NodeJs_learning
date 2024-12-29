# Projeto Knex Js

## Desenvolvimento do aprendizado da utilização da lib knex.Js para query builder para bancos relacionais
Este projeto foi criado para explorar e aprender a utilização do Knex.js, um query builder para Node.js que facilita a interação com bancos de dados relacionais. Aqui você encontrará exemplos de operações básicas e avançadas para manipular um banco de dados MySQL utilizando o Knex.js.

## Instalação
1 - Clone o repositório:
```bash
    git clone https://github.com/Diego-de-Souza/Projeto_aprendizado_Knexjs
```
2 - Navegue até a pasta do projeto:
```bash
    cd Projeto_aprendizado_Knexjs
```
3 - Instale as dependências:
```bash
    npm install knex mysql
```
--- 

## Configuração do Banco de dados
Certifique-se de que você tenha um banco de dados MySQL configurado. Atualize as credenciais no arquivo dataBase.js para que correspondam ao seu ambiente:
```javascript
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'myapp_test'
    }
});

module.exports = knex;
```
---
## Funcionalidade e Exemplos
 - Inserir dados;
 - Selecionar dados;
 - Selecionar campos especificos;
 - Consultas condicionais;
 - utilizando or com where;
 - Atualizar dados;
 - Deletar dados;
 - Joins;
 - Transações;

## Observações
1 - Promises: O Knex.js é baseado em promises, garantindo respostas assíncronas para todas as operações.
 
2 - SQL Puro: Você pode executar consultas SQL diretamente utilizando o método raw():
```javascript
database.raw("SELECT * FROM games").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```



## Objetivo
Este projeto tem como objetivo aprender e praticar as funcionalidades do Knex.js, cobrindo desde operações básicas como insert, select, e update, até transações e consultas mais avançadas com joins.

## Contribuições
Contribuições são bem-vindas! Caso encontre erros ou queira adicionar novas funcionalidades, sinta-se à vontade para abrir um pull request ou criar uma issue.

## Licença
Este projeto é apenas para aprendizado e não possui restrições de uso. 😊
