const connection = require('../connection/connectionDocumentos');

const getAllSubitens = async () => {
  const [subitens] = await connection.execute('SELECT * FROM subitem');
  return subitens;
};

const createSubitem = async (itemId, letra, texto) => {
  const query = 'INSERT INTO subitem (item_id, letra, texto) VALUES (?, ?, ?)';
  const values = [itemId, letra, texto];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir subitem:', error);
    throw error;
  }
};

const deleteSubitem = async (subitemId) => {
  const query = 'DELETE FROM subitem WHERE id = ?';
  const values = [subitemId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir subitem:', error);
    throw error;
  }
};

module.exports = {
  getAllSubitens,
  createSubitem,
  deleteSubitem
};
