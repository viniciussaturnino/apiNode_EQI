/* eslint-disable func-names */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('funds')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('funds').insert([
        {
          id: 1,
          cnpj: '80884773000117',
          nome: 'SAO PAULO PREV RF PGBL',
          rendimentoAnual: 12,
        },
        {
          id: 2,
          cnpj: '82867342000178',
          nome: 'SAO PAULO PREV RF VGBL',
          rendimentoAnual: 8,
        },
      ]);
    });
};
