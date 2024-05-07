const connection = require('./connection');

const getAllRFCs = async () => {
  try {
    const [rfcs] = await connection.execute('SELECT * FROM rfc');
    return rfcs;
  } catch (error) {
    console.error('Erro ao obter todos os RFCs:', error);
    throw error;
  }
};

const createRFC = async (rfcData) => {
  const {
    documentosCriadosId,
    numeroProcesso,
    auth,
    dataEntrada,
    matriculados,
    excluidos,
    desistentes,
    reprovados,
    aprovados,
    statusCertificado,
    statusDrive,
    statusNb,
    statusFinalizacao,
    sigla,
    compiladoHoraAula,
    compiladoHoraAulaNr,
    compiladoDiariaCurso,
    compiladoDiariaCursoNr,
    observacoes
  } = rfcData;

  const query = `
    INSERT INTO rfc (
      documentosCriadosId, numeroProcesso, auth, dataEntrada, matriculados, 
      excluidos, desistentes, reprovados, aprovados, statusCertificado, statusDrive, 
      statusNb, statusFinalizacao, sigla, compiladoHoraAula, compiladoHoraAulaNr, 
      compiladoDiariaCurso, compiladoDiariaCursoNr, observacoes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    documentosCriadosId,
    numeroProcesso,
    auth,
    dataEntrada,
    matriculados,
    excluidos,
    desistentes,
    reprovados,
    aprovados,
    statusCertificado,
    statusDrive,
    statusNb,
    statusFinalizacao,
    sigla,
    compiladoHoraAula,
    compiladoHoraAulaNr,
    compiladoDiariaCurso,
    compiladoDiariaCursoNr,
    observacoes
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir RFC:', error);
    throw error;
  }
};

const getRFCById = async (id) => {
  const query = 'SELECT * FROM rfc WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter RFC por ID:', error);
    throw error;
  }
};

const updateRFCById = async (id, updatedRFCData) => {
  const keys = Object.keys(updatedRFCData);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedRFCData);
  values.push(id);

  const query = `UPDATE rfc SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`RFC com o ID ${id} não encontrado`);
      throw new Error(`RFC com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar RFC:', error);
    throw error;
  }
};

const deleteRFCById = async (id) => {
  const query = 'DELETE FROM rfc WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`RFC com o ID ${id} não encontrado`);
      throw new Error(`RFC com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar RFC:', error);
    throw error;
  }
};

module.exports = {
  getAllRFCs,
  createRFC,
  getRFCById,
  updateRFCById,
  deleteRFCById
};
