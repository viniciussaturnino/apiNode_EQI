import connection from '../../database/connection';

export default {
  async index(req, res) {
    const proposal = await connection('proposal').select('*');

    if (!proposal) {
      return res.status(400).json({ error: 'Any proposal found.' });
    }

    return res.json(proposal);
  },

  async store(req, res) {
    const { value, paymentMethod, fund_id, client_id } = req.body;
    const advisor_id = req.headers.authorization;

    const client = await connection('clients')
      .where('id', client_id)
      .select('id')
      .first();

    const fund = await connection('funds')
      .where('id', fund_id)
      .select('id')
      .first();

    if (!advisor_id) {
      return res.status(400).json({
        error: 'You need to be an advisor to register a new proposal',
      });
    }

    if (!client) {
      return res.status(400).json({ error: 'Invalid client.' });
    }

    if (!fund) {
      return res.status(400).json({ error: 'Invalid fund.' });
    }

    if (value <= 0) {
      return res.status(400).json({ error: 'Value most be positive.' });
    }

    if (paymentMethod !== 'boleto' && paymentMethod !== 'debito') {
      return res.status(400).json({ error: 'Invalid payment method.' });
    }

    const code = await connection('proposal').insert({
      value,
      paymentMethod,
      fund_id,
      client_id,
    });

    return res.json({
      code,
      value,
      paymentMethod,
      fund_id,
      client_id,
    });
  },
};
