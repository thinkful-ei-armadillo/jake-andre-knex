require('dotenv').config();
const knexFn = require('knex');

const knex = knexFn({
  client: 'pg',
  connection: process.env.DB_URL
});

//console.log('connection successful');

const searchForTerm = (query) => {
  knex
    .select('*')
    .from('shopping_list')
    .then(res => {
      console.log(res);
    });
};

searchForTerm('');