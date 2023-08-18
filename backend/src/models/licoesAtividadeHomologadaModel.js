const connection = require('./connection');

const getAllLicoes = async () => {
  const [licoes] = await connection.execute('SELECT * FROM licoesAtividadeHomologada');
  return licoes;
};

const getLicoesBySigla = async (sigla) => {
  const query = 'SELECT * FROM licoesAtividadeHomologada WHERE sigla = ?';
  const [licoes] = await connection.execute(query, [sigla]);
  return licoes;
};

const getLicaoByIdentifier = async (identifier) => { // Change parameter name to 'name'
  const query = 'SELECT * FROM licoesAtividadeHomologada WHERE identifier = ?';
  const [licoes] = await connection.execute(query, [identifier]);
  return licoes;
};

const updateLicaoByIdentifier = async (identifier, licoes) => {
  const {
    sigla,
    name,
    ha,
    hai,
  } = licoes;

  if (sigla === undefined || name === undefined || ha === undefined || hai === undefined ) {
    throw new Error('One or more required properties are missing in the licoes object.');
  }

  const query = `UPDATE licoesAtividadeHomologada SET sigla = ?, nome = ?, ha = ?, hai = ? WHERE identifier = ?`;

  const values = [
    sigla,
    name,
    ha,
    hai,
    identifier
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Erro ao atualizar Lições:', error);
    throw error;
  }
};

const createLicao = async (licao) => {
  const {
    sigla,
    name,
    ha,
    hai,
    identifier // Add the new field
  } = licao;

  if (sigla === undefined || name === undefined || ha === undefined || hai === undefined || identifier === undefined) {
    throw new Error('One or more required properties are missing in the licoes object.');
  }
  const query = `INSERT INTO licoesAtividadeHomologada (sigla, nome, ha, hai, identifier) VALUES (?, ?, ?, ?, ?)`;

  const values = [
    sigla,
    name,
    ha,
    hai,
    identifier
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir Lições:', error);
    throw error;
  }
};

module.exports = {
  getAllLicoes,
  getLicoesBySigla,
  updateLicaoByIdentifier,
  createLicao,
  getLicaoByIdentifier
};
