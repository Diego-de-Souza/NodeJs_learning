var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'diego',
      password : 'Ogeid-880171',
      database : 'ApiUsers'
    }
  });

module.exports = knex