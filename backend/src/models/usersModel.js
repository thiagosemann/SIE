const connection = require('./connection');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'X8J6kZ8mD4G58N5M5x7GJ5v77h36Hk75c6n3Bz7R'; // Substitua pelo seu segredo JWT

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const createUser = async (user) => {
  const { first_name, last_name, cpf, email, data_nasc, telefone, predio, credito } = user;
  const query = 'INSERT INTO users (first_name, last_name, cpf, email, data_nasc, telefone, predio, credito) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [first_name, last_name, cpf, email, data_nasc, telefone, predio, credito];

  try {
    const [result] = await connection.execute(query, values);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};

const loginUser = async (matricula) => {
  const query = 'SELECT * FROM users WHERE matricula = ?';
  const [users] = await connection.execute(query, [matricula]);

  if (users.length > 0) {
    const user = users[0];
    // Geramos o token com o ID e a matrícula do usuário
    const token = jwt.sign(
      { id: user.id, matricula: user.matricula },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    return { user, token };
  }

  throw new Error('Usuário não encontrado'); // Se não encontramos o usuário, lançamos um erro
};


const getUser = async (matricula, cpf) => {
  let query = 'SELECT * FROM users WHERE matricula = ?';
  let [user] = await connection.execute(query, [matricula]);

  if (user.length === 0) {
    query = 'SELECT * FROM users WHERE cpf = ?';
    [user] = await connection.execute(query, [cpf]);
  }

  if (user.length === 0) {
    throw new Error('Usuário não encontrado');
  }

  return user[0];
};



module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
};