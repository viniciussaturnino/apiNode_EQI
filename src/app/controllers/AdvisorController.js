import connection from '../../database/connection';

export default {
  async index(req, res) {
    const advisors = await connection('advisors').select('*');

    return res.json(advisors);
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
