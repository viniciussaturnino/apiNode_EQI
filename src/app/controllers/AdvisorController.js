import connection from '../../database/connection';

export default {
  async index(req, res) {
    const advisor_id = req.headers.authorization;

    const clients = await connection('clients')
      .where('advisor_id', advisor_id)
      .select('*')
      .first();

    if (!clients) {
      return res.status(400).json({ error: "You don't have any clients yet." });
    }

    return res.json(clients);
  },

  async store(req, res) {
    const { name } = req.body;

    const advisor = await connection('advisors')
      .where('name', name)
      .select('name')
      .first();

    if (advisor) {
      return res.status(400).json({ error: 'Advisor already exists.' });
    }

    await connection('advisors').insert({
      name,
    });

    return res.json({ name });
  },
};
