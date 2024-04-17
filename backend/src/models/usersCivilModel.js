const connection = require('./connection');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SeuSegredoJWTAqui'; // Substitua pelo seu segredo JWT

const getAllUsersCivil = async () => {
  const [usersCivis] = await connection.execute('SELECT * FROM usersCivis');
  return usersCivis;
};

const createUserCivil = async (userCivil) => {
  try {
    const { fullName,cpf, birthdate, gender, email, telefone, fatherName, motherName, nationality, birthState, birthCity, maritalStatus, raca, cep, estado, municipio, numero, complemento, logradouro, bairro, problemaSaudeBool, problemaSaude, conclusaoCBAEBool, conclusaoCBAEAno,BC,GVC } = userCivil;
    // Verificar se o CPF já existe na tabela usersCivis
    const existingUser = await getUserCivilByCPF(cpf);

    if (existingUser) {
      // Se o CPF já existe, verifica se há alterações antes de atualizar
      if (isUserCivilChanged(existingUser, userCivil)) {
        return await updateUserCivil(existingUser.id, userCivil);
      } else {
        console.log('Usuário civil não alterado. Nenhuma atualização necessária.');
        return { message: 'Nenhuma alteração detectada.' };
      }
    } else {
      // Se o CPF não existe, continua com a inserção
      const query = 'INSERT INTO usersCivis (fullName, cpf, birthdate, gender, email, telefone, fatherName, motherName, nationality, birthState, birthCity, maritalStatus, raca, cep, estado, municipio, numero, complemento, logradouro, bairro, problemaSaudeBool, problemaSaude, conclusaoCBAEBool, conclusaoCBAEAno,BC,GVC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [fullName, cpf, birthdate, gender, email, telefone, fatherName, motherName, nationality, birthState, birthCity, maritalStatus, raca, cep, estado, municipio, numero, complemento, logradouro, bairro, problemaSaudeBool, problemaSaude, conclusaoCBAEBool, conclusaoCBAEAno,BC,GVC];

      // Executar a consulta dentro de uma transação (se necessário)
      const [result] = await connection.execute(query, values);

      return { userId: result.insertId };
    }
  } catch (error) {
    console.error('Erro ao processar usuário civil:', error);
    throw error;
  }
};

// Função para verificar se há alterações nos dados do usuário
const isUserCivilChanged = (existingUser, newUser) => {
  const keys = Object.keys(newUser);

  for (const key of keys) {
    if (existingUser[key] !== newUser[key]) {
      return true;
    }
  }

  return false;
};



// Função para obter usuário civil por CPF
const getUserCivilByCPF = async (cpf) => {
  const query = 'SELECT * FROM usersCivis WHERE cpf = ?';
  const [users] = await connection.execute(query, [cpf]);

  return users.length > 0 ? users[0] : null;
};

// Função para atualizar usuário civil por ID
const updateUserCivil = async (userId, userCivil) => {
  const { fullName, cpf, birthdate, gender, email, telefone, fatherName, motherName, nationality, birthState, birthCity, maritalStatus, raca, cep, estado, municipio, numero, complemento, logradouro, bairro, problemaSaudeBool, problemaSaude, conclusaoCBAEBool, conclusaoCBAEAno, BC, GVC } = userCivil;

  const query = 'UPDATE usersCivis SET fullName=?, birthdate=?, gender=?, email=?, telefone=?, fatherName=?, motherName=?, nationality=?, birthState=?, birthCity=?, maritalStatus=?, raca=?, cep=?, estado=?, municipio=?, numero=?, complemento=?, logradouro=?, bairro=?, problemaSaudeBool=?, problemaSaude=?, conclusaoCBAEBool=?, conclusaoCBAEAno=?, BC=?, GVC=? WHERE id=?';
  const values = [fullName, birthdate, gender, email, telefone, fatherName, motherName, nationality, birthState, birthCity, maritalStatus, raca, cep, estado, municipio, numero, complemento, logradouro, bairro, problemaSaudeBool, problemaSaude, conclusaoCBAEBool, conclusaoCBAEAno, BC, GVC, userId];

  try {
    await connection.execute(query, values);
    return { userId };
  } catch (error) {
    console.error('Erro ao atualizar usuário civil:', error);
    throw error;
  }
};

const getUserCivilbyId = async (id) => {
  const query = 'SELECT * FROM usersCivis WHERE id = ?';
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

const getUsersWithBCorGVC = async () => {
  const query = 'SELECT * FROM usersCivis WHERE BC = true OR GVC = true';
  try {
    const [users] = await connection.execute(query);
    return users;
  } catch (error) {
    console.error('Erro ao obter usuários com BC ou GVC igual a 1:', error);
    throw error;
  }
};



module.exports = {
  getAllUsersCivil,
  createUserCivil,
  getUserCivilbyId,
  getUserCivilByCPF,
  getUsersWithBCorGVC
};
