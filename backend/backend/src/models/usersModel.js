const connection = require('./connection');

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

const loginUser = async (email, password) => {
  //const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  //const [user] = await connection.execute(query, [email, password]);
  
  
  //return user[0];
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