import connection from '../../database/connection';

export default {
  async index(req, res) {
    const { id } = req.params;
    const advisor_id = req.headers.authorization;

    if (!advisor_id) {
      return res
        .status(400)
        .json({ error: 'You need to be an advisor to search clients' });
    }

    const client = await connection('clients')
      .where('id', id)
      .andWhere('advisor_id', advisor_id)
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

    if (cpf.length !== 11) {
      return res.status(400).json({ error: 'CPF must be size of 11 digits.' });
    }

    if (name.length < 2 || name.length > 200) {
      return res.status(400).json({
        error: 'Name must be min size of 2 caracters and max of 200.',
      });
    }

    const clientExists = await connection('clients')
      .where('email', email)
      .select('email')
      .first();

    if (!advisor_id) {
      return res
        .status(400)
        .json({ error: 'Operation not permited. You need to be an advisor!' });
    }

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
