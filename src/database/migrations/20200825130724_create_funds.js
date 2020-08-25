/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('funds', function (table) {
    table.increments('id').primary();
    table.string('cnpj', 14).notNullable();
    table.string('nome').notNullable();
    table.integer('rendimentoAnual').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('funds');
};
