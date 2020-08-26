/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('proposal', function (table) {
    table.increments('code').primary();
    table.decimal('value').notNullable();
    table.string('paymentMethod').notNullable();

    table.integer('fund_id').unsigned();
    table.foreign('fund_id').references('id').inTable('funds');

    table.integer('client_id').unsigned();
    table.foreign('client_id').references('id').inTable('clients');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('proposal');
};
