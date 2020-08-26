import connection from '../../database/connection';

export default {
  async index(req, res) {
    // Recebe o id de um assessor para busca de seus clientes
    const advisor_id = req.headers.authorization;

    // Erro caso não tenha autorização de assessor
    if (!advisor_id) {
      return res.status(400).json({ error: 'You need to be an advisor.' });
    }

    // Busca todos os clientes do assessor
    const clients = await connection('clients')
      .where('advisor_id', advisor_id)
      .select('*');

    // Mensagem caso o assessor ainda não possua nenhum cliente
    if (clients.length === 0) {
      return res.status(400).json({ error: "You don't have any clients yet." });
    }

    // Retorna os clientes do assessor
    return res.json(clients);
  },

  async store(req, res) {
    // Recebe o dado necessário para cadastro de um assessor
    const { name } = req.body;

    // Antes de cadastrar o assessor, verifica se ele já existe
    const advisor = await connection('advisors')
      .where('name', name)
      .select('name')
      .first();

    // Erro caso o assessor já exista
    if (advisor) {
      return res.status(400).json({ error: 'Advisor already exists.' });
    }

    // Insere os dados na tabela de assessores
    await connection('advisors').insert({
      name,
    });

    // Retorna o nome do assessor
    return res.json({ name });
  },
};
