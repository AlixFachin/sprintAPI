
exports.up = function(knex) {
  return knex.schema.createTable('users', 
    function (t) {
      t.increments('id').unsigned().primary();
      t.string('firstName').notNull();
      t.string('lastName').notNull();
      t.string('nickName').notNull();
    }
  );
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
