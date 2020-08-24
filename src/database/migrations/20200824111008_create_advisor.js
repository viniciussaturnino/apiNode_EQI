// eslint-disable-next-line func-names
exports.up = function (knex) {
  // eslint-disable-next-line func-names
  return knex.schema.createTable('advisors', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTable('advisors');
};
