const connection = require('../connection/connectionDocumentos');

const getAllCapitulos = async () => {
  const [capitulos] = await connection.execute('SELECT * FROM capitulo');
  return capitulos;
};

const createCapitulo = async (documentoId, numero, texto) => {
  const query = 'INSERT INTO capitulo (documento_id, numero, texto) VALUES (?, ?, ?)';
  const values = [documentoId, numero, texto];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir capitulo:', error);
    throw error;
  }
};

const deleteCapitulo = async (capituloId) => {
  const query = 'DELETE FROM capitulo WHERE id = ?';
  const values = [capituloId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir capitulo:', error);
    throw error;
  }
};



module.exports = {
  getAllCapitulos,
  createCapitulo,
  deleteCapitulo
};
