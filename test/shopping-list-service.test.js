'use strict';
const ShoppingListService = require('../src/shopping-list-service');
require('dotenv').config();
const knexFn = require('knex');
const {expect} = require('chai');

const knex = knexFn({
  client: 'pg',
  connection: process.env.DB_URL_test,
});

describe( 'shopping_list testing' , () => {
  

  
  const sampleData = [
    { id: 1,
      name: 'Sleight of Ham',
      price: '3.10',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Lunch' },
    { id: 2,
      name: 'Antichovies',
      price: '1.00',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Breakfast' },
    { id: 3,
      name: 'Lettuce B. Frank',
      price: '0.86',
      date_added: knex.raw('now()'),
      checked: true,
      category: 'Lunch' },
    { id: 4,
      name: 'Pepperphony',
      price: '1.40',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Breakfast' },
    { id: 5,
      name: 'Shamburger',
      price: '3.50',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Main' },
    { id: 6,
      name: 'Facon',
      price: '1.90',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Breakfast' },
    { id: 7,
      name: 'Salami-get-this-straight',
      price: '3.00',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Snack' }
  ];
  
  before(() => {
    return knex('shopping_list').del();
  });

  beforeEach(() => {
    return knex('shopping_list').insert(sampleData);
  });

  afterEach(()=> knex('shopping_list').truncate());

  after(() => {
     
    knex.destroy();
  });

  it('getAllItems returns all items', ()=>{
    ShoppingListService.getAllItems(knex).then(res => {
      expect(res).to.be.lengthOf(sampleData.length);
    });
  });
  it('insertItems inserts an item', ()=>{
    ShoppingListService.insertItems(knex, {
      name: 'Salami-yo-mami',
      price: '3.00',
      date_added: knex.raw('now()'),
      checked: false,
      category: 'Snack' })
      .then(res => {
        expect(res.id).to.be.equal(sampleData.length +1);
      
      });
  });
  // it('updateItem updates an item', ()=>{
  //   ShoppingListService.updateItem(knex).then(res => {
  //     expect(res).to.be.lengthOf(sampleData.length);
  //   });
  // });
  // it('deleteItems removes one item', ()=>{
  //   ShoppingListService.deleteItem(knex).then(res => {
  //     expect(res).to.be.lengthOf(sampleData.length);
  //   });
  // });
    
});
