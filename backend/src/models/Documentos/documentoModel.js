const connection = require('../connection/connectionDocumentos');

const getAllDocumentos = async () => {
  const [documentos] = await connection.execute('SELECT * FROM documento');
  return documentos;
};

const createDocumento = async (tipo) => {
  const query = 'INSERT INTO documento (tipo) VALUES (?)';
  const values = [tipo];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir documento:', error);
    throw error;
  }
};

const deleteDocumento = async (documentoId) => {
  const query = 'DELETE FROM documento WHERE id = ?';
  const values = [documentoId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    throw error;
  }
};

module.exports = {
  getAllDocumentos,
  createDocumento,
  deleteDocumento
};
