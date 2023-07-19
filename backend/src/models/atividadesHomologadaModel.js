const connection = require('./connection');

const getAllAtividadeHomologada = async () => {
  const [atividades] = await connection.execute('SELECT * FROM atividadeHomologada');
  return atividades;
};

const getAtividadeHomologadaById = async (id) => {
  const query = 'SELECT * FROM atividadeHomologada WHERE id = ?';
  const [atividades] = await connection.execute(query, [id]);
  return atividades.length ? atividades[0] : null;
};

const getAtividadeHomologadaBySigla = async (sigla) => {
  const query = 'SELECT * FROM atividadeHomologada WHERE sigla = ?';
  const [atividades] = await connection.execute(query, [sigla]);
  return atividades.length ? atividades[0] : null;
};


const updateAtividadeHomologadaBySigla = async (sigla, atividade) => {
  const {
    name,
    sgpe,
    ha,
    hai,
    tipo,
    areaConhecimento,
    modalidade,
    vagas,
    finalidade,
    reqEspecifico,
    processoSeletivo,
    atividadesPreliminares
  } = atividade;

  const query = `UPDATE atividadeHomologada SET name = ?, sgpe = ?, ha = ?, hai = ?, tipo = ?, areaConhecimento = ?, modalidade = ?, vagas = ?, finalidade = ?, reqEspecifico = ?, processoSeletivo = ?, atividadesPreliminares = ? WHERE sigla = ?`;

  const values = [
    name,
    sgpe,
    ha,
    hai,
    tipo,
    areaConhecimento,
    modalidade,
    vagas,
    finalidade,
    reqEspecifico,
    processoSeletivo,
    atividadesPreliminares,
    sigla
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Erro ao atualizar atividadeHomologada:', error);
    throw error;
  }
};

const createAtividadeHomologada = async (atividade) => {
  const {
    sigla,
    name,
    sgpe,
    ha,
    hai,
    tipo,
    areaConhecimento,
    modalidade,
    vagas,
    finalidade,
    reqEspecifico,
    processoSeletivo,
    atividadesPreliminares
  } = atividade;

  const query = `INSERT INTO atividadeHomologada (sigla, name, sgpe, ha, hai, tipo, areaConhecimento, modalidade, vagas, finalidade, reqEspecifico, processoSeletivo, atividadesPreliminares) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    sigla,
    name,
    sgpe,
    ha,
    hai,
    tipo,
    areaConhecimento,
    modalidade,
    vagas,
    finalidade,
    reqEspecifico,
    processoSeletivo,
    atividadesPreliminares
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir atividadeHomologada:', error);
    throw error;
  }
};


module.exports = {
  getAllAtividadeHomologada,
  getAtividadeHomologadaById,
  updateAtividadeHomologadaBySigla,
  createAtividadeHomologada,
  getAtividadeHomologadaBySigla
};
