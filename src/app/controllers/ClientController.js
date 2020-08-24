import connection from '../../database/connection';

export default {
  async index(req, res) {
    const { id } = req.params;

    const client = await connection('clients')
      .where('id', id)
      .select('*')
      .first();

    if (!client) {
      return res.status(400).json({ error: 'Client not found.' });
    }

    return res.json(client);
  },

  async store(req, res) {
    const { name, cpf, email } = req.body;
    const advisor_id = req.headers.authorization;

    const clientExists = await connection('clients')
      .where('email', email)
      .select('email')
      .first();

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists.' });
    }

    const [id] = await connection('clients').insert({
      name,
      cpf,
      email,
      advisor_id,
    });

    return res.json({ id });
  },
};