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

  const getProfessoresByDocumentoId = async (id) => {
    const query = `
      SELECT 
          p.*,
          u.name,
          u.mtcl,
          e.nome AS escolaridade,
          g.nome AS graduacao
      FROM 
          professoresByDocumento AS p
      JOIN 
          users AS u 
      ON 
          p.usersId = u.id
      LEFT JOIN 
          escolaridade AS e 
      ON 
          u.escolaridade_id = e.id
      LEFT JOIN 
          graduacao AS g 
      ON 
          u.graduacao_id = g.id
      WHERE 
          p.documentosCriadosId = ?`;
    const values = [id];
  
    try {
      const [rows] = await connection.execute(query, values);
      if (rows.length === 0) {
        return null; // Retorna null se nenhum professor for encontrado
      }
      return rows; // Retorna todos os professores encontrados
    } catch (error) {
      console.error('Erro ao obter professores por ID:', error);
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
  getProfessoresByDocumentoId,
  updateProfessorByDocumentoId,
  deleteProfessorByDocumentoId,
  createProfessoresByDocumento
};
