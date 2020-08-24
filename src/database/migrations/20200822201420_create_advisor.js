export function up(knex) {
  // eslint-disable-next-line func-names
  return knex.schema.createTable('advisors', function (table) {
    table.increments();
    table.string('name').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('advisors');
}
