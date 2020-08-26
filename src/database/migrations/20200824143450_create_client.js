/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('clients', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('cpf', 11).notNullable();
    table.string('email').notNullable();

    table.integer('advisor_id').unsigned();
    table.foreign('advisor_id').references('id').inTable('advisors');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('clients');
};
