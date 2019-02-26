require('dotenv').config();
const knexFn = require('knex');

const knex = knexFn({
  client: 'pg',
  connection: process.env.DB_URL,
});

const searchForTerm = (query) => {
  knex
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${query}%`)
    .then(res => {
      console.log('searchForTerm: ', res);
    });
};

const getAllPaginated = (pageNumber) => {
  const productsPerPage = 10;
  const offset = productsPerPage * (pageNumber - 1);

  knex
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(res => {
      console.log('getAllPaginated', res);
    });
};

const getAllAfterDate = (daysAgo) => {
  knex
    .select('name', 'date_added')
    .count('date_added')
    .where(
      'date_added',
      '<',
      knex.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .from('shopping_list')
    .groupBy('id', 'date_added')
    .orderBy([{column: 'date_added', order: 'DESC'}])
    .then(res => {
      console.log('getAllAfterDate: ', res);
    });
};

const getTotalForCategory = () => {
  knex
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(res => {
      console.log('getTotalForCategory: ', res);
    })
};


searchForTerm('Bacon');
getAllPaginated(3);
getAllAfterDate(21);
getTotalForCategory();