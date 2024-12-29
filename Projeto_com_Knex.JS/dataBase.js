var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'your_data_base',
        password: 'your_database_password',
        database: 'myapp_test'
    }
});

module.exports = knex;