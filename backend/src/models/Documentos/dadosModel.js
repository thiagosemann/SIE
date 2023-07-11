const connection = require('../connection/connectionDocumentos');

const getAllDados = async () => {
  const [dados] = await connection.execute('SELECT * FROM dados');
  return dados;
};

const createDados = async (tabelaDadosId, linha, coluna, valor) => {
  const query = 'INSERT INTO dados (tabela_dados_id, linha, coluna, valor) VALUES (?, ?, ?, ?)';
  const values = [tabelaDadosId, linha, coluna, valor];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    throw error;
  }
};

const deleteDados = async (dadosId) => {
  const query = 'DELETE FROM dados WHERE id = ?';
  const values = [dadosId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir dados:', error);
    throw error;
  }
};

module.exports = {
  getAllDados,
  createDados,
  deleteDados
};
