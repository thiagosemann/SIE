const connection = require('../connection/connectionDocumentos');

const getAllTabelaDados = async () => {
  const [tabelaDados] = await connection.execute('SELECT * FROM tabela_dados');
  return tabelaDados;
};

const createTabelaDados = async (itemId, content, hasHeader) => {
  const query = 'INSERT INTO tabela_dados (item_id, content, hasHeader) VALUES (?, ?, ?)';
  const values = [itemId, content, hasHeader];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir tabela_dados:', error);
    throw error;
  }
};

const deleteTabelaDados = async (tabelaDadosId) => {
  const query = 'DELETE FROM tabela_dados WHERE id = ?';
  const values = [tabelaDadosId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir tabela_dados:', error);
    throw error;
  }
};

module.exports = {
  getAllTabelaDados,
  createTabelaDados,
  deleteTabelaDados
};
