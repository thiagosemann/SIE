const connection = require('../connection/connectionDocumentos');

const getAllSubsubitens = async () => {
  const [subsubitens] = await connection.execute('SELECT * FROM subsubitem');
  return subsubitens;
};

const createSubsubitem = async (subitemId, letra, texto) => {
  const query = 'INSERT INTO subsubitem (subitem_id, letra, texto) VALUES (?, ?, ?)';
  const values = [subitemId, letra, texto];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir subsubitem:', error);
    throw error;
  }
};

const deleteSubsubitem = async (subsubitemId) => {
  const query = 'DELETE FROM subsubitem WHERE id = ?';
  const values = [subsubitemId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir subsubitem:', error);
    throw error;
  }
};

module.exports = {
  getAllSubsubitens,
  createSubsubitem,
  deleteSubsubitem
};
