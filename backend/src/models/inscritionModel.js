const connection = require('./connection');

const createInscricao = async (inscricao) => {
  console.log(inscricao)
  const { procNum, documentosCriadosId, userCivilId, situacao,mensagem } = inscricao;
  const query = 'INSERT INTO inscricoes (procNum, documentosCriadosId, userCivilId, situacao,mensagem) VALUES (?, ?, ?, ?, ?)';
  const values = [procNum, documentosCriadosId, userCivilId, situacao,mensagem];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir inscrição:', error);
    throw error;
  }
};
const getInscricaoByDocumentAndUser = async (documentosCriadosId, userCivilId) => {
    const query = 'SELECT * FROM inscricoes WHERE documentosCriadosId = ? AND userCivilId = ?';
    const values = [documentosCriadosId, userCivilId];
  
    try {
      const [rows] = await connection.execute(query, values);
      if (rows.length === 0) {
        return null;
      }
      const inscricao = rows[0];
      return inscricao;
    } catch (error) {
      console.error('Erro ao obter inscrição por documentosCriadosId e userCivilId:', error);
      throw error;
    }
  };

const deleteInscricaoById = async (id) => {
  const query = 'DELETE FROM inscricoes WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Inscrição com o ID ${id} não encontrada`);
      throw new Error(`Inscrição com o ID ${id} não encontrada`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir inscrição:', error);
    throw error;
  }
};

const updateInscricaoById = async (id, updatedData) => {
  const { procNum, documentosCriadosId, userCivilId, situacao,mensagem } = updatedData;
  const query = 'UPDATE inscricoes SET procNum = ?, documentosCriadosId = ?, userCivilId = ?, situacao = ?,mensagem = ? WHERE id = ?';
  const values = [procNum, documentosCriadosId, userCivilId, situacao,mensagem, id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Inscrição com o ID ${id} não encontrada`);
      throw new Error(`Inscrição com o ID ${id} não encontrada`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar inscrição:', error);
    throw error;
  }
};

const getInscricaoById = async (id) => {
  const query = 'SELECT * FROM inscricoes WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    const inscricao = rows[0];
    return inscricao;
  } catch (error) {
    console.error('Erro ao obter inscrição por ID:', error);
    throw error;
  }
};

const getInscricoesByDocument = async (documentosCriadosId) => {
  const query = 'SELECT * FROM inscricoes WHERE documentosCriadosId = ?';
  const values = [documentosCriadosId];

  try {
    const [rows] = await connection.execute(query, values);
    const inscricoes = rows;
    return inscricoes;
  } catch (error) {
    console.error('Erro ao obter inscrição por ID:', error);
    throw error;
  }
};

const getAllInscricoes = async () => {
  const [inscricoes] = await connection.execute('SELECT * FROM inscricoes');
  return inscricoes;
};

module.exports = {
  createInscricao,
  deleteInscricaoById,
  updateInscricaoById,
  getInscricaoById,
  getAllInscricoes,
  getInscricaoByDocumentAndUser,
  getInscricoesByDocument
};
