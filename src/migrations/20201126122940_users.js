
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments().primary();
      table.string('nickname').notNullable();
      table.string('password').notNullable();
      table.specificType('books', 'INT[]');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
