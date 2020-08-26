import connection from '../../database/connection';

export default {
  async index(req, res) {
    // Recebe o id do cliente a ser buscado e o id do assessor
    const { id } = req.params;
    const advisor_id = req.headers.authorization;

    // Erro se não ouver autorização de assessor
    if (!advisor_id) {
      return res
        .status(400)
        .json({ error: 'You need to be an advisor to search clients' });
    }

    // Busca o cliente dentro da tabela de clientes usando o id do cliente e do seu assessor
    const client = await connection('clients')
      .where('id', id)
      .andWhere('advisor_id', advisor_id)
      .select('*')
      .first();

    // Erro caso o cliente não exista
    if (!client) {
      return res.status(400).json({ error: 'Client not found.' });
    }

    // Retorna o cliente encontrado
    return res.json(client);
  },

  async store(req, res) {
    // Dados de entrada para cadastro de cliente e id de um assessor
    const { name, cpf, email } = req.body;
    const advisor_id = req.headers.authorization;

    // Validação dos dados de entrada
    // CPF com tamanho invalido
    if (cpf.length !== 11) {
      return res.status(400).json({ error: 'CPF must be size of 11 digits.' });
    }

    // Nome com tamanho invalido
    if (name.length < 2 || name.length > 200) {
      return res.status(400).json({
        error: 'Name must be min size of 2 caracters and max of 200.',
      });
    }

    // Antes de cadastrar um cliente, verifica se ele já existe
    const clientExists = await connection('clients')
      .where('email', email)
      .select('email')
      .first();

    // Erro caso o cliente já exista
    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists.' });
    }

    // Erro caso não tenha autorização de assessor
    if (!advisor_id) {
      return res
        .status(400)
        .json({ error: 'Operation not permited. You need to be an advisor!' });
    }

    // Insere os dados do cliente na tabela de clientes
    const [id] = await connection('clients').insert({
      name,
      cpf,
      email,
      advisor_id,
    });

    // Retorna alguns dados do cliente
    return res.json({
      id,
      name,
      email,
      advisor_id,
    });
  },
};
