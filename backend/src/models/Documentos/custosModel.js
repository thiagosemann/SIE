const connection = require('../connection/connectionDocumentos');

const getAllCustos = async () => {
  const [custos] = await connection.execute('SELECT * FROM custos');
  return custos;
};

const createCusto = async (itemId, descricao, valor) => {
  const query = 'INSERT INTO custos (item_id, descricao, valor) VALUES (?, ?, ?)';
  const values = [itemId, descricao, valor];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir custo:', error);
    throw error;
  }
};

const deleteCusto = async (custoId) => {
  const query = 'DELETE FROM custos WHERE id = ?';
  const values = [custoId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir custo:', error);
    throw error;
  }
};

module.exports = {
  getAllCustos,
  createCusto,
  deleteCusto
};
