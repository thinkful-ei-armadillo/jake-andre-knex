'use strict';


const ShoppingListService ={

  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list');
  },
  insertItems(knex, item) {
    return knex('shopping_list')
      .insert(item);
  },
  updateItem(knex, item, id) {
    return knex('shopping_list')
      .where({id})
      .update({ name: item.name });
  },

  deleteItem(knex, id) {
    return knex('shopping_list')
      .where({id})
      .del();
  }

};

module.exports=ShoppingListService;
