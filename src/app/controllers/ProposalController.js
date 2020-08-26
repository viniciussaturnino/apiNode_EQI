/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { format } from 'date-fns';
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

  async getProfit(req, res) {
    const { dataInicial, proposta, meses } = req.body;
    let [ano, mes, dia] = dataInicial.split('-');

    const proposal = await connection('proposal')
      .where('code', proposta)
      .select(['code', 'value'])
      .first();

    if (!proposal) {
      return res.status(400).json({ error: 'Proposal not found' });
    }

    const arr = [];
    let valor = 0;
    let data;
    mes = Number(mes);

    for (let i = 0; i < meses; i++) {
      data = format(new Date(ano, String(mes), dia), 'yyyy-MM-dd');
      mes++;

      valor++;

      arr.push({
        data,
        proposta,
        valor,
      });
    }

    return res.json(arr);
  },
};
