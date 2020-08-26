/* eslint-disable no-restricted-properties */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
import { format } from 'date-fns';
import connection from '../../database/connection';

export default {
  async index(req, res) {
    // Busca todas as propostas dentro da tabela de propostas
    const proposal = await connection('proposal').select('*');

    // Se não houver proposta, retornar um erro
    if (!proposal) {
      return res.status(400).json({ error: 'Any proposal found.' });
    }

    // Listar todas as propostas
    return res.json(proposal);
  },

  async store(req, res) {
    // Recebe os dados para cadastro de proposta, assim como a autorização de assessor para cadastrar
    const { value, paymentMethod, fund_id, client_id } = req.body;
    const advisor_id = req.headers.authorization;

    // Busca o cliente informado para o cadastro
    const client = await connection('clients')
      .where('id', client_id)
      .select('id')
      .first();

    // Busca o fundo informado para o cadastro
    const fund = await connection('funds')
      .where('id', fund_id)
      .select('id')
      .first();

    // Retorna um erro caso não tenha a autorização de assessor
    if (!advisor_id) {
      return res.status(400).json({
        error: 'You need to be an advisor to register a new proposal',
      });
    }

    // Retorna um erro caso o cliente informado não exista
    if (!client) {
      return res.status(400).json({ error: 'Invalid client.' });
    }

    // Retorna um erro caso o fundo informado não exista
    if (!fund) {
      return res.status(400).json({ error: 'Invalid fund.' });
    }

    // Validação dos dados de entrada para valores
    if (value <= 0) {
      return res.status(400).json({ error: 'Value most be positive.' });
    }

    // Validação dos dados de entrada para o metodo de pagamento
    if (paymentMethod !== 'boleto' && paymentMethod !== 'debito') {
      return res.status(400).json({ error: 'Invalid payment method.' });
    }

    // Insere os dados na tabela de propostas
    const code = await connection('proposal').insert({
      value,
      paymentMethod,
      fund_id,
      client_id,
    });

    // Retorna os dados de cadastro
    return res.json({
      code,
      value,
      paymentMethod,
      fund_id,
      client_id,
    });
  },

  async getProfit(req, res) {
    // Recebe dados de entrada para efetuar a operação do calculo de rendimento
    const { dataInicial, proposta, meses } = req.body;
    const advisor_id = req.headers.authorization;
    // Separa a data
    let [ano, mes, dia] = dataInicial.split('-');

    // Erro caso não possua autorização de assesor
    if (!advisor_id) {
      return res.status(400).json({ error: 'You need to be an advisor.' });
    }

    // Busca a proposta informada na tabela de propostas
    const proposal = await connection('proposal')
      .where('code', proposta)
      .select(['code', 'value', 'fund_id'])
      .first();

    // Busca o rendimento anual na tabela de fundos
    let juros = await connection('funds')
      .where('id', proposal.fund_id)
      .select('rendimentoAnual')
      .first();

    // Converte rendimento anual em mensal
    juros = (juros.rendimentoAnual /= 12) / 100;

    // Erro caso a proposta não exista
    if (!proposal) {
      return res.status(400).json({ error: 'Proposal not found' });
    }

    // Calculo do rendimento baseado nos dados de entrada
    const arr = [];
    let data;
    mes = Number(mes);

    for (let i = 0; i < meses; i++) {
      let valor = proposal.value;
      valor *= Math.pow(1 + juros, i + 1);

      data = format(new Date(ano, String(mes), dia), 'yyyy-MM-dd');
      mes++;

      arr.push({
        data,
        proposta,
        valor,
      });
    }

    // Output do rendimento
    return res.json(arr);
  },
};
