# Knex.js Project

## Learning to Use the Knex.js Query Builder for Relational Databases
This project was created to explore and learn how to use Knex.js, a query builder for Node.js that simplifies interaction with relational databases. Here, you will find examples of basic and advanced operations to manipulate a MySQL database using Knex.js.

## Installation
1 - Clone the repository:
```bash
    git clone https://github.com/Diego-de-Souza/Projeto_aprendizado_Knexjs
```
2 - Navigate to the project folder:
```bash
    cd Projeto_aprendizado_Knexjs
```
3 - Install dependencies:
```bash
    npm install knex mysql
```
--- 

## Database Configuration
Ensure that you have a MySQL database configured. Update the credentials in the dataBase.js file to match your environment:
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
## Features and Examples
 - Insert data;;
 - Select data;
 - Select specific fields;
 - Conditional querie;
 - Using or with where;
 - Update data;
 - Delete data;
 - Joins;
 - Transactions;

## Notes
1 - Promises: Knex.js is promise-based, ensuring asynchronous responses for all operations.

2 - Raw SQL: You can execute raw SQL queries directly using the raw() method:
```javascript
database.raw("SELECT * FROM games").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```



## Objective
This project aims to learn and practice Knex.js features, covering basic operations like insert, select, and update, as well as advanced queries with joins and transactions.

## Contributions
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request or create an issue.

## License
This project is for educational purposes and has no usage restrictions. 😊
