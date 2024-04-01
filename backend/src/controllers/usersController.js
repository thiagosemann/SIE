const usersModel = require('../models/usersModel');
const { checkLdapUser } = require('../models/ldap'); 


require('dotenv').config();

const getAllUsers = async (_request, response) => {
  try {
    const users = await usersModel.getAllUsers();
    return response.status(200).json(users);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return response.status(500).json({ error: 'Erro ao obter usuários' });
  }
};

const createUser = async (request, response) => {
  try {
    const createdUser = await usersModel.createUser(request.body);
    return response.status(201).json(createdUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return response.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

const loginUser = async (request, response) => {
  try {
    const { username, password } = request.body;
    const ldapResult = await checkLdapUser(username, password);
    if (!ldapResult.success) {
      console.error('LDAP Error:', ldapResult);
      return response.status(401).json({ message: 'Credenciais LDAP inválidas', ldapError: ldapResult.error });
    }
    console.log("ldapResult",ldapResult)
    if(ldapResult.success && !ldapResult.user.employeenumber){
      const userAux = await usersModel.getUserByLdap(username)
        console.log("userAux",userAux)
      const {user,token} = await usersModel.loginUser(userAux.mtcl);
      console.log("Logado com sucesso:",userAux.mtcl)
      return response.status(200).json({ message: 'Login bem-sucedido',user,token });
    }
    const {user,token} = await usersModel.loginUser(ldapResult.user.employeenumber);
    console.log("Logado com sucesso:",ldapResult.user.employeenumber)
    return response.status(200).json({ message: 'Login bem-sucedido',user,token });

  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return response.status(500).json({ error: 'Erro ao realizar login' });
  }
};

const getUserbyId = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await usersModel.getUserbyId(id);

    if (user) {
      return response.status(200).json(user);
    } else {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return response.status(500).json({ error: 'Erro ao obter usuário' });
  }
};

const getUserByMtcl = async (request, response) => {
  try {
    const { mtcl } = request.params;
    const user = await usersModel.getUserByMtcl(mtcl);

    if (user) {
      return response.status(200).json(user);
    } else {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return response.status(500).json({ error: 'Erro ao obter usuário' });
  }
};

const updateUser = async (request, response) => {
  try {
    const updatedUserData = request.body;
    const result = await usersModel.updateUser(updatedUserData);
    return response.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return response.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};


const batchUpdateUsers = async (request, response) => {
  try {
    const batchData = request.body; // Supõe que você enviará um array de objetos com dados de atualização
    const results = [];
    for (const userData of batchData) {
      if (userData.criarUser === true) {
        // Se a propriedade "criarUser" for true, cria um novo usuário
        const result = await usersModel.createUser(userData);
        results.push(result);

        console.log(`Usuário criado com sucesso: ${JSON.stringify(userData)}`);
      } else {
        // Se não, atualiza o usuário existente
        const result =  await usersModel.updateUser(userData);
        results.push(result);

        console.log(`Usuário com mtcl ${userData.mtcl} atualizado com sucesso.`);
      }
    }

    return response.status(200).json(results);
  } catch (error) {
    console.error('Erro ao atualizar ou criar usuários em lote:', error);
    return response.status(500).json({ error: 'Erro ao atualizar ou criar usuários em lote' });
  }
};




module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserbyId,
  getUserByMtcl,
  updateUser,
  batchUpdateUsers
  
};