const connection = require('./connection');

const getAllrpcs = async () => {
  try {
    const [rpcs] = await connection.execute('SELECT * FROM rpc');
    return rpcs;
  } catch (error) {
    console.error('Erro ao obter todos os rpcs:', error);
    throw error;
  }
};

const createrpc = async (rpcData) => {
  const {
    documentosCriadosId,
    numeroProcesso,
    auth,
    dataEntrada,
    sigla,
    compiladoHoraAula,
    compiladoHoraAulaNr,
    observacoes
  } = rpcData;

  const query = `
    INSERT INTO rpc (
      documentosCriadosId, numeroProcesso, auth, dataEntrada, sigla, 
      compiladoHoraAula, compiladoHoraAulaNr, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    documentosCriadosId,
    numeroProcesso,
    auth,
    dataEntrada,
    sigla,
    compiladoHoraAula,
    compiladoHoraAulaNr,
    observacoes
  ];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir rpc:', error);
    throw error;
  }
};

const getrpcById = async (id) => {
  const query = 'SELECT * FROM rpc WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter rpc por ID:', error);
    throw error;
  }
};

const updaterpcById = async (id, updatedrpcData) => {
  const keys = Object.keys(updatedrpcData);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedrpcData);
  values.push(id);

  const query = `UPDATE rpc SET ${setClause} WHERE id = ?`;

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`rpc com o ID ${id} não encontrado`);
      throw new Error(`rpc com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar rpc:', error);
    throw error;
  }
};

const deleterpcById = async (id) => {
  const query = 'DELETE FROM rpc WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`rpc com o ID ${id} não encontrado`);
      throw new Error(`rpc com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar rpc:', error);
    throw error;
  }
};

module.exports = {
  getAllrpcs,
  createrpc,
  getrpcById,
  updaterpcById,
  deleterpcById
};
