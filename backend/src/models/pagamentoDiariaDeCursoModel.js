const connection = require('./connection');

const getAllPagamentosDiariaDeCurso = async () => {
  try {
    const [pagamentosDiariaDeCurso] = await connection.execute('SELECT * FROM pagamentoDiariaDeCurso');
    return pagamentosDiariaDeCurso;
  } catch (error) {
    console.error('Erro ao obter todos os pagamentos de diária de curso:', error);
    throw error;
  }
};

const createPagamentoDiariaDeCurso = async (pagamentoDiariaDeCursoData) => {
  try {
    const results = [];
    for (const pagamento of pagamentoDiariaDeCursoData) {
      const {user_id, compilado_id, name, quantidade, valor, mes, procNum  } = pagamento;
      const query = 'INSERT INTO pagamentoDiariaDeCurso (user_id, compilado_id, name, quantidade, valor, mes, procNum) VALUES (?,?,?,?,?,?,?)';
      const values = [user_id, compilado_id, name, quantidade, valor, mes, procNum];

      const [result] = await connection.execute(query, values);
      results.push({ insertId: result.insertId });
    }

    return results;
  } catch (error) {
    console.error('Erro ao inserir professores:', error);
    throw error;
  }
};

const getPagamentoDiariaDeCursoById = async (id) => {
  const query = 'SELECT * FROM pagamentoDiariaDeCurso WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter pagamento de diária de curso por ID:', error);
    throw error;
  }
};

const updatePagamentoDiariaDeCursoById = async (id, updatedPagamentoDiariaDeCursoData) => {
  const keys = Object.keys(updatedPagamentoDiariaDeCursoData);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedPagamentoDiariaDeCursoData);
  values.push(id);

  const query = `UPDATE pagamentoDiariaDeCurso SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Pagamento de diária de curso com o ID ${id} não encontrado`);
      throw new Error(`Pagamento de diária de curso com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar pagamento de diária de curso:', error);
    throw error;
  }
};

const deletePagamentoDiariaDeCursoById = async (id) => {
  const query = 'DELETE FROM pagamentoDiariaDeCurso WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Pagamento de diária de curso com o ID ${id} não encontrado`);
      throw new Error(`Pagamento de diária de curso com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar pagamento de diária de curso:', error);
    throw error;
  }
};

const getPagamentoByCompiladoId = async (compiladoId) => {
  const query = 'SELECT * FROM pagamentoDiariaDeCurso WHERE compilado_id = ?';
  const values = [compiladoId];

  try {
    const [rows] = await connection.execute(query, values);
    return rows;
  } catch (error) {
    console.error('Erro ao obter pagamento de hora/aula por compilado_id:', error);
    throw error;
  }
};

  

module.exports = {
  getAllPagamentosDiariaDeCurso,
  createPagamentoDiariaDeCurso,
  getPagamentoDiariaDeCursoById,
  updatePagamentoDiariaDeCursoById,
  deletePagamentoDiariaDeCursoById,
  getPagamentoByCompiladoId
};
