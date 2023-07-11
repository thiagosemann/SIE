const connection = require('../connection/connectionDocumentos');

const getAllDataDocumentos = async () => {
  const [dataDocumentos] = await connection.execute('SELECT * FROM data_documento');
  return dataDocumentos;
};

const createDataDocumento = async (documentoId, texto) => {
  const query = 'INSERT INTO data_documento (documento_id, texto) VALUES (?, ?)';
  const values = [documentoId, texto];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir data_documento:', error);
    throw error;
  }
};

const deleteDataDocumento = async (dataDocumentoId) => {
  const query = 'DELETE FROM data_documento WHERE id = ?';
  const values = [dataDocumentoId];

  try {
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir data_documento:', error);
    throw error;
  }
};

module.exports = {
  getAllDataDocumentos,
  createDataDocumento,
  deleteDataDocumento
};
