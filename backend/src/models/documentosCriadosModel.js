const connection = require('./connection');

const createCourse = async (course) => {
  const { auth, dados, tipo, id_pge } = course;
  const query = 'INSERT INTO documentosCriados (auth, dados, tipo, id_pge) VALUES (?, ?, ?, ?)';
  const values = [auth, JSON.stringify(dados), tipo, id_pge];
  console.log(values)
  console.log(dados)
  
  try {
    const [result] = await connection.execute(query, values);
    const documentosCriadosId = result.insertId;

    return { insertId: documentosCriadosId };
  } catch (error) {
    console.error('Erro ao inserir curso:', error);
    throw error;
  }
};

const deleteCourseById = async (id) => {
  const query = 'DELETE FROM documentosCriados WHERE id = ?';
  const values = [id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Curso com o ID ${id} não encontrado`);
      throw new Error(`Curso com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir curso:', error);
    throw error;
  }
};

const updateCourseById = async (id, updatedData) => {
  const { nome, dados, tipo } = updatedData;
  const query = 'UPDATE documentosCriados SET nome = ?, dados = ?, tipo = ? WHERE id = ?';
  const values = [nome, JSON.stringify(dados), tipo, id];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Curso com o ID ${id} não encontrado`);
      throw new Error(`Curso com o ID ${id} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    throw error;
  }
};

const getCourseById = async (id) => {
  const query = 'SELECT * FROM documentosCriados WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    const course = rows[0];
    return course;
  } catch (error) {
    console.error('Erro ao obter curso por ID:', error);
    throw error;
  }
};

const getCourseByAuth = async (auth) => {
  const query = 'SELECT * FROM documentosCriados WHERE auth = ?';
  const values = [auth];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null;
    }
    const course = rows[0];
    return course;
  } catch (error) {
    console.error('Erro ao obter curso por auth:', error);
    throw error;
  }
};

const getAllCourses = async () => {
  const [courses] = await connection.execute('SELECT * FROM documentosCriados');
  return courses;
};

module.exports = {
  createCourse,
  deleteCourseById,
  updateCourseById,
  getCourseById,
  getCourseByAuth,
  getAllCourses
};
