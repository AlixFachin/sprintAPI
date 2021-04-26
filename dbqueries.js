const { Model } = require('objection');
const { knex } = require('./knex');


// DATABASE QUERIES
// give the knell instance to objection
Model.knex(knex);

// first Model
class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = {
  
  getAllBooks: function() {
    return Book.query();
  },
  
  getOneBook: function(bookId) {
    return Book.query().findById(bookId);
  },

  deleteOneBook: function(bookId) {
    return Book.query().deleteById(bookId);
  }

}