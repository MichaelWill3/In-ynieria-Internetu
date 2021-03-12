
exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
      table.increments().primary();
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books')
};
