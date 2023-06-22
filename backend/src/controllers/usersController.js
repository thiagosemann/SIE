const usersModel = require('../models/usersModel');
const { checkLdapUser } = require('../models/ldap'); 
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

async function fetchUserDataAndSaveToDatabase() {
  try {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbzjR6h6qjE9CugIUQeDUVGI5gpSdepizUkXk3oMbnFKTn50H9aH6gjJS8SoRTADhzo5-Q/exec?action=getEfetivo');
    const userData = response.data;

    if (!Array.isArray(userData)) {
      throw new Error('Os dados recebidos não estão no formato esperado');
    }

    const updatedUsers = [];
    for (const user of userData) {
      const mtcl = user.mtcl;
      let existingUser = await usersModel.getUserByMtcl(mtcl);

      if (existingUser) {
        let hasChanges = false;
        const changedFields = {};

        for (const key in user) {
          if (key === 'ldap') {
            continue; // Ignorar o campo "ldap" na comparação
          }

          const oldValue = String(existingUser[key]);
          const newValue = String(user[key]);

          if (oldValue !== newValue) {
            hasChanges = true;
            changedFields[key] = { oldValue, newValue };
            existingUser[key] = newValue;
          }
        }

        if (hasChanges) {
          await usersModel.updateUserByMtcl(mtcl, existingUser);
          updatedUsers.push({ mtcl, changedFields });

          console.log(`Usuário com mtcl ${mtcl} teve as seguintes mudanças:`);
          for (const key in changedFields) {
            const { oldValue, newValue } = changedFields[key];
            console.log(`${key}: ${oldValue} -> ${newValue}`);
          }
          console.log('----------------------------------------');
        }
      } else {
        await usersModel.createUser(user);
      }
    }

    console.log('Os dados de usuários foram salvos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Ocorreu um erro ao obter os dados de usuários ou ao salvar no banco de dados:', error);
  }
}




fetchUserDataAndSaveToDatabase(); 
  function scheduleFunction() {
    const d = new Date();
    const currentMinutes = d.getMinutes();
  
    // Verifica se o minuto atual é igual a 30
    if (currentMinutes === 30) {
      fetchUserDataAndSaveToDatabase();
    }
  }
  
  // Chamando a função inicialmente para verificar se deve ser executada imediatamente
  scheduleFunction();

  // Configurando o setInterval para chamar a função a cada minuto
  setInterval(scheduleFunction, 60000); // 60000 milissegundos = 1 minuto



module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserbyId,
  getUserByMtcl
  
};