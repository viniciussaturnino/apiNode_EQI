export function up(knex) {
  // eslint-disable-next-line func-names
  return knex.schema.createTable('clients', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('cpf', 11).notNullable();
    table.string('email').notNullable();

    table.integer('advisor_id').notNullable();

    table.foreign('advisor_id').references('id').inTable('advisors');
  });
}

export function down(knex) {
  return knex.schema.dropTable('clients');
}
