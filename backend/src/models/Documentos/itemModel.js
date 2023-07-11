const connection = require('../connection/connectionDocumentos');

const getAllItems = async () => {
  const [items] = await connection.execute('SELECT * FROM item');
  return items;
};

const createItem = async (capituloId, numero, texto) => {
  const query = 'INSERT INTO item (capitulo_id, numero, texto) VALUES (?, ?, ?)';
  const values = [capituloId, numero, texto];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir item:', error);
    throw error;
  }
};

const deleteItem = async (itemId) => {
  const query = 'DELETE FROM item WHERE id = ?';
  const values = [itemId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    throw error;
  }
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem
};
