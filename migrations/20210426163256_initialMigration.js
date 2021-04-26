
exports.up = function(knex) {
  return knex.schema.createTable('books', 
    function (t) {
      t.increments('id').unsigned().primary();
      t.string('title').notNull();
      t.string('genre').notNull();
      t.string('author').notNull();
    }
  );
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
