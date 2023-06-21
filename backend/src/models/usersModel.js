const connection = require('./connection');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'X8J6kZ8mD4G58N5M5x7GJ5v77h36Hk75c6n3Bz7R'; // Substitua pelo seu segredo JWT

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const createUser = async (user) => {
  const { mtcl, name, cpf, graduacao, escolaridade } = user;
  const query = 'INSERT INTO users (mtcl, name, cpf, graduacao, escolaridade) VALUES (?, ?, ?, ?, ?)';
  const values = [mtcl, name, cpf, graduacao, escolaridade];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};
const updateUserByMtcl = async (mtcl, updatedUserData) => {
  const { name, cpf, graduacao, escolaridade } = updatedUserData;
  const query = 'UPDATE users SET name = ?, cpf = ?, graduacao = ?, escolaridade = ? WHERE mtcl = ?';
  const values = [name, cpf, graduacao, escolaridade, mtcl];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      throw new Error('Usuário não encontrado');
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};


const loginUser = async (matricula) => {
  matricula = `0${matricula.slice(0, -1)}-${matricula.slice(-1)}`; // Adicionar um 0 antes da matricula e um - antes do último dígito
  console.log(matricula);
  
  const query = 'SELECT * FROM users WHERE mtcl LIKE ?';
  const [users] = await connection.execute(query, [`%${matricula}%`]);

  if (users.length > 0) {
    const user = users[0];
    // Gerar o token com o ID e a matrícula do usuário
    const token = jwt.sign(
      { id: user.id, matricula: user.mtcl },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    return { user, token };
  }

  throw new Error('Usuário não encontrado'); // Se não encontrarmos o usuário, lançamos um erro
};




const getUserbyId = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const values = [id];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null; // Retorna null se o usuário não for encontrado
    }
    return rows[0]; // Retorna o primeiro usuário encontrado
  } catch (error) {
    console.error('Erro ao obter usuário por id:', error);
    throw error;
  }
};

const getUserByMtcl = async (mtcl) => {
  const query = 'SELECT * FROM users WHERE mtcl = ?';
  const values = [mtcl];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null; // Retorna null se o usuário não for encontrado
    }
    return rows[0]; // Retorna o primeiro usuário encontrado
  } catch (error) {
    console.error('Erro ao obter usuário por mtcl:', error);
    throw error;
  }
};




module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserbyId,
  updateUserByMtcl,
  getUserByMtcl
};