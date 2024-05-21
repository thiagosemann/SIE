const connection = require('./connection');

const getAllCompiladoPagamento = async () => {
  try {
    const [compiladoPagamento] = await connection.execute('SELECT * FROM compiladoPagamento');
    return compiladoPagamento;
  } catch (error) {
    console.error('Erro ao obter todos os compilados de pagamento:', error);
    throw error;
  }
};

const createCompiladoPagamento = async (compiladoPagamentoData) => {
  const { name, date } = compiladoPagamentoData;

  const query = `
    INSERT INTO compiladoPagamento (name, date)
    VALUES (?, ?)`;

  const values = [name, date];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir compilado de pagamento:', error);
    throw error;
  }
};

const getCompiladoPagamentoById = async (id) => {
  const query = 'SELECT * FROM compiladoPagamento WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter compilado de pagamento por ID:', error);
    throw error;
  }
};

const updateCompiladoPagamentoById = async (id, updatedCompiladoPagamentoData) => {
  const keys = Object.keys(updatedCompiladoPagamentoData);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedCompiladoPagamentoData);
  values.push(id);

  const query = `UPDATE compiladoPagamento SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Compilado de pagamento com o ID ${id} não encontrado`);
      throw new Error(`Compilado de pagamento com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar compilado de pagamento:', error);
    throw error;
  }
};

const deleteCompiladoPagamentoById = async (id) => {
  const query = 'DELETE FROM compiladoPagamento WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Compilado de pagamento com o ID ${id} não encontrado`);
      throw new Error(`Compilado de pagamento com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar compilado de pagamento:', error);
    throw error;
  }
};

module.exports = {
  getAllCompiladoPagamento,
  createCompiladoPagamento,
  getCompiladoPagamentoById,
  updateCompiladoPagamentoById,
  deleteCompiladoPagamentoById
};
