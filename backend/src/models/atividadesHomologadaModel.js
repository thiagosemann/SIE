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

const getAllAtividadeHomologadaVersionsById = async (atividadeId) => {
  const query = 'SELECT * FROM atividadehomologada_version WHERE atividadehomologada_id = ?';
  const [versions] = await connection.execute(query, [atividadeId]);
  return versions;
};

const getAtividadeHomologadaBySigla = async (sigla) => {
  const query = 'SELECT * FROM atividadeHomologada WHERE sigla = ?';
  const [atividades] = await connection.execute(query, [sigla]);
  return atividades.length ? atividades[0] : null;
};

const createAtividadeHomologadaVersion = async (atividadeId, sgpe, linkSgpe) => {
  const query = 'INSERT INTO atividadehomologada_version (atividadehomologada_id, sgpe, linkSgpe) VALUES (?, ?, ?)';
  const values = [atividadeId, sgpe, linkSgpe];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir atividadehomologada_version:', error);
    throw error;
  }
};


const updateAtividadeHomologadaById = async (id, atividade) => {
  const {
    name,
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
    linkMaterial
  } = atividade;

  const query = `UPDATE atividadeHomologada SET name = ?, ha = ?, hai = ?, tipo = ?, areaConhecimento = ?, modalidade = ?, vagas = ?, finalidade = ?, reqEspecifico = ?, processoSeletivo = ?, atividadesPreliminares = ?, linkMaterial = ?  WHERE id = ?`;

  const values = [
    name,
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
    linkMaterial,
    id
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

  const query = `INSERT INTO atividadeHomologada (sigla, name, ha, hai, tipo, areaConhecimento, modalidade, vagas, finalidade, reqEspecifico, processoSeletivo, atividadesPreliminares) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    sigla,
    name,
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
  updateAtividadeHomologadaById,
  createAtividadeHomologada,
  getAtividadeHomologadaBySigla,
  createAtividadeHomologadaVersion,
  getAllAtividadeHomologadaVersionsById
};
