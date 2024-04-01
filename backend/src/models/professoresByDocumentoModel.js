const connection = require('./connection');

const getAllProfessoresByDocumento = async () => {
  const [professores] = await connection.execute('SELECT * FROM professoresByDocumento');
  return professores;
};

const createProfessorByDocumento = async (professorData) => {
  const { documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor,alimentacao } = professorData;
  const query = 'INSERT INTO professoresByDocumento (documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor,alimentacao) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor,alimentacao];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir professor:', error);
    throw error;
  }
};

const createProfessoresByDocumento = async (professoresDataArray,documentosCriadosId) => {
    try {
      const results = [];
  
      for (const professorData of professoresDataArray) {
        const {usersId, diariaMilitar, horaAulaQtd, horaAulaValor,alimentacao } = professorData;
        const query = 'INSERT INTO professoresByDocumento (documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor, alimentacao) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor, alimentacao];
  
        const [result] = await connection.execute(query, values);
        results.push({ insertId: result.insertId });
      }
  
      return results;
    } catch (error) {
      console.error('Erro ao inserir professores:', error);
      throw error;
    }
  };

const getProfessorByDocumentoId = async (id) => {
  const query = 'SELECT * FROM professoresByDocumento WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter professor por ID:', error);
    throw error;
  }
};

const updateProfessorByDocumentoId = async (updatedProfessorData) => {
  const { documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor, alimentacao, id } = updatedProfessorData;
  const query = 'UPDATE professoresByDocumento SET documentosCriadosId = ?, usersId = ?, diariaMilitar = ?, horaAulaQtd = ?, horaAulaValor = ?, alimentacao = ? WHERE id = ?';
  const values = [documentosCriadosId, usersId, diariaMilitar, horaAulaQtd, horaAulaValor, alimentacao, id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Professor com o ID ${id} não encontrado`);
      throw new Error(`Professor com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    throw error;
  }
};

const deleteProfessorByDocumentoId = async (id) => {
  const query = 'DELETE FROM professoresByDocumento WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Professor com o ID ${id} não encontrado`);
      throw new Error(`Professor com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar professor:', error);
    throw error;
  }
};

module.exports = {
  getAllProfessoresByDocumento,
  createProfessorByDocumento,
  getProfessorByDocumentoId,
  updateProfessorByDocumentoId,
  deleteProfessorByDocumentoId,
  createProfessoresByDocumento
};
