const connection = require('./connection');

const getAllPagamentosHoraAula = async () => {
  try {
    const [pagamentosHoraAula] = await connection.execute('SELECT * FROM pagamentoHoraAula');
    return pagamentosHoraAula;
  } catch (error) {
    console.error('Erro ao obter todos os pagamentos de hora/aula:', error);
    throw error;
  }
};

const createPagamentoHoraAula = async (pagamentosHoraAulaData) => {
  try {
    const results = [];
    for (const pagamento of pagamentosHoraAulaData) {
      const {user_id, compilado_id, name, escolaridade,hai,haiValor,mes,procNum  } = pagamento;
      const query = 'INSERT INTO pagamentoHoraAula (user_id, compilado_id, name, escolaridade, hai, haiValor, mes, procNum) VALUES (?,?,?,?,?,?,?,?)';
      const values = [user_id, compilado_id, name, escolaridade,hai,haiValor,mes,procNum];

      const [result] = await connection.execute(query, values);
      results.push({ insertId: result.insertId });
    }

    return results;
  } catch (error) {
    console.error('Erro ao inserir professores:', error);
    throw error;
  }

};

const getPagamentoHoraAulaById = async (id) => {
  const query = 'SELECT * FROM pagamentoHoraAula WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter pagamento de hora/aula por ID:', error);
    throw error;
  }
};

const updatePagamentoHoraAulaById = async (id, updatedPagamentoHoraAulaData) => {
  const keys = Object.keys(updatedPagamentoHoraAulaData);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedPagamentoHoraAulaData);
  values.push(id);

  const query = `UPDATE pagamentoHoraAula SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Pagamento de hora/aula com o ID ${id} não encontrado`);
      throw new Error(`Pagamento de hora/aula com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar pagamento de hora/aula:', error);
    throw error;
  }
};

const deletePagamentoHoraAulaById = async (id) => {
  const query = 'DELETE FROM pagamentoHoraAula WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Pagamento de hora/aula com o ID ${id} não encontrado`);
      throw new Error(`Pagamento de hora/aula com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar pagamento de hora/aula:', error);
    throw error;
  }
};

module.exports = {
  getAllPagamentosHoraAula,
  createPagamentoHoraAula,
  getPagamentoHoraAulaById,
  updatePagamentoHoraAulaById,
  deletePagamentoHoraAulaById
};
