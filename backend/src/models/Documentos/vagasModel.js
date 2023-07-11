const connection = require('../connection/connectionDocumentos');

const getAllVagas = async () => {
  const [vagas] = await connection.execute('SELECT * FROM vagas');
  return vagas;
};

const createVaga = async (itemId, bbm, quantidade) => {
  const query = 'INSERT INTO vagas (item_id, bbm, quantidade) VALUES (?, ?, ?)';
  const values = [itemId, bbm, quantidade];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir vaga:', error);
    throw error;
  }
};

const deleteVaga = async (vagaId) => {
  const query = 'DELETE FROM vagas WHERE id = ?';
  const values = [vagaId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir vaga:', error);
    throw error;
  }
};

module.exports = {
  getAllVagas,
  createVaga,
  deleteVaga
};
