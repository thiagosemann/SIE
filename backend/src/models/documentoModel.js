const connection = require('./connection');

const createDocument = async (document) => {
  const { nome, dados } = document;
  const query = 'INSERT INTO documentos (nome, dados) VALUES (?, ?)';
  const values = [nome, JSON.stringify(dados)];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir documento:', error);
    throw error;
  }
};

const deleteDocumentById = async (id) => {
  const query = 'DELETE FROM documentos WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Documento com o ID ${id} não encontrado`);
      throw new Error(`Documento com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    throw error;
  }
};

const updateDocumentById = async (id, updatedData) => {
  const { nome, dados } = updatedData;
  const query = 'UPDATE documentos SET nome = ?, dados = ? WHERE id = ?';
  const values = [nome, JSON.stringify(dados), id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Documento com o ID ${id} não encontrado`);
      throw new Error(`Documento com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    throw error;
  }
};

const getDocumentById = async (id) => {
  const query = 'SELECT * FROM documentos WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    const document = rows[0];
    document.dados = JSON.parse(document.dados);
    return document;
  } catch (error) {
    console.error('Erro ao obter documento por ID:', error);
    throw error;
  }
};

const getDocumentByName = async (name) => {
  const query = 'SELECT * FROM documentos WHERE nome = ?';
  const values = [name];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    const document = rows[0];
    if (typeof document.dados === 'string') {
      document.dados = JSON.parse(document.dados);
    }
    return document;
  } catch (error) {
    console.error('Erro ao obter documento por nome:', error);
    throw error;
  }
};



const getAllDocuments = async () => {
  const [documents] = await connection.execute('SELECT * FROM documentos');
  return documents;
};

module.exports = {
  createDocument,
  deleteDocumentById,
  updateDocumentById,
  getDocumentById,
  getDocumentByName,
  getAllDocuments
};
