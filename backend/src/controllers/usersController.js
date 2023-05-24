const usersModel = require('../models/usersModel');
const { checkLdapUser } = require('../models/ldap'); 
const jwt = require('jsonwebtoken');
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
    const { email, password } = request.body;

    const ldapResult = await checkLdapUser(email, password);
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

const getUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await usersModel.getUser(id);

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

const deleteTask = async (request, response) => {
  try {
    const { id } = request.params;
    await usersModel.deleteTask(id);
    return response.status(204).json();
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    return response.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};

const updateTask = async (request, response) => {
  try {
    const { id } = request.params;
    await usersModel.updateTask(id, request.body);
    return response.status(204).json();
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return response.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
  deleteTask,
  updateTask,
};