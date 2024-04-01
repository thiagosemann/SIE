const connection = require('./connection');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'X8J6kZ8mD4G58N5M5x7GJ5v77h36Hk75c6n3Bz7R'; // Substitua pelo seu segredo JWT

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getUserByLdap = async (ldap) => {
  const query = 'SELECT * FROM users WHERE ldap = ?';
  const values = [ldap];

  try {
    const [rows] = await connection.execute(query, values);
    if (rows.length === 0) {
      return null; // Retorna null se o usuário não for encontrado
    }
    return rows[0]; // Retorna o primeiro usuário encontrado
  } catch (error) {
    console.error('Erro ao obter usuário por LDAP:', error);
    throw error;
  }
};


const createUser = async (user) => {
  const { ldap, mtcl, name, cpf, graduacao_id, escolaridade_id, role_id, dateFilter } = user;
  const query = 'INSERT INTO users (ldap, mtcl, name, cpf, graduacao_id, escolaridade_id, role_id, dateFilter) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [ldap, mtcl, name, cpf, graduacao_id, escolaridade_id, role_id, dateFilter];
  console.log(user)
  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};
const updateUserByMtcl = async ( updatedUserData) => {
  const {mtcl, name, cpf, graduacao, escolaridade_id } = updatedUserData;
  const query = 'UPDATE users SET name = ?, cpf = ?, graduacao = ?, escolaridade_id = ? WHERE mtcl = ?';
  const values = [name, cpf, graduacao, escolaridade_id, mtcl];

  try {
    const [result] = await connection.execute(query, values);
    if (result.affectedRows === 0) {
      console.error(`Usuário com a matrícula ${mtcl} não encontrado`);
      throw new Error(`Usuário com a matrícula ${mtcl} não encontrado`);
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

const updateUser = async (updatedUserData) => {
  console.log(updatedUserData)
  const { name, cpf, graduacao, escolaridade_id, role, dateFilter, id } = updatedUserData;
  const query = 'UPDATE users SET name = ?, cpf = ?, graduacao = ?, escolaridade_id = ?, role = ?, dateFilter = ? WHERE id = ?';
  const values = [name, cpf, graduacao, escolaridade_id, role, dateFilter, id];
  await connection.execute(query, values);

  return { success: true };
};




const loginUser = async (matricula) => {
  if(matricula.length<11){
    matricula = `0${matricula.slice(0, -1)}-${matricula.slice(-1)}`; // Adicionar um 0 antes da matricula e um - antes do último dígito
  }
  
  const query = 'SELECT * FROM users WHERE mtcl LIKE ?';
  const [users] = await connection.execute(query, [`%${matricula}%`]);

  if (users.length > 0) {
    const user = users[0];
    // Gerar o token com o ID e a matrícula do usuário
   
    const token = jwt.sign(
      { id: user.id, matricula: matricula },
      SECRET_KEY,
      { expiresIn: '24h' }
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
  
  const query = 'SELECT * FROM users WHERE mtcl LIKE ?';
  const [users] = await connection.execute(query, [`%${mtcl}%`]);

  if (users.length > 0) {
    return users[0]
    ;
  }

  return null; // Se não encontrarmos o usuário, lançamos um erro
};


module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserByLdap,
  getUserbyId,
  updateUserByMtcl,
  getUserByMtcl,
  updateUser
};