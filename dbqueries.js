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

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

}

module.exports = {
  
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= BOOKS -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  getAllBooks: function() {
    return Book.query();
  },
  
  getOneBook: function(bookId) {
    return Book.query().findById(bookId);
  },

  deleteOneBook: function(bookId) {
    return Book.query().deleteById(bookId);
  },

  createOneBook: function(newBookData) {
    // input: will take a newBookData
    return Book.query().insert(newBookData).returning('*');
  },

  updateOneBook: function(bookId, newBookData) {
    return Book.query().patchAndFetchById(bookId, newBookData);
  },

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= USERS -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  getAllUsers: function() {
    return User.query();
  },
  
  getOneUser: function(userId) {
    return User.query().findById(userId);
  },

  deleteOneUser: function(userId) {
    return User.query().deleteById(userId);
  },

  createOneUser: function(newUserData) {
    // input: will take a newUserData
    return User.query().insert(newUserData).returning('*');
  },

  updateOneUser: function(userId, newUserData) {
    return User.query().patchAndFetchById(userId, newUserData);
  }

}