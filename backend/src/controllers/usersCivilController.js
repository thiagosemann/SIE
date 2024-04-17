const usersCivisModel = require('../models/usersCivilModel');

const getAllUsersCivil = async (_request, response) => {
  try {
    const usersCivis = await usersCivisModel.getAllUsersCivil();
    return response.status(200).json(usersCivis);
  } catch (error) {
    console.error('Erro ao obter usuários civis:', error);
    return response.status(500).json({ error: 'Erro ao obter usuários civis' });
  }
};

const createUserCivil = async (request, response) => {
  try {
    const createdUserCivis = await usersCivisModel.createUserCivil(request.body);
    return response.status(201).json(createdUserCivis);
  } catch (error) {
    console.error('Erro ao criar usuário civil:', error);
    return response.status(500).json({ error: `Erro ao criar usuário civil: ${error.message}` });
  }
};

const getUserCivilbyId = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await usersCivisModel.getUserCivilbyId(id);

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

const getUserCivilByCPF = async (request, response) => {
  try {
    const { cpf } = request.params;
    const user = await usersCivisModel.getUserCivilByCPF(cpf);

    if (user) {
      return response.status(200).json(user);
    } else {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter usuário por CPF:', error);
    return response.status(500).json({ error: 'Erro ao obter usuário por CPF' });
  }
};

const getUsersWithBCorGVC = async (_request, response) => {
  try {
    const users = await usersCivisModel.getUsersWithBCorGVC();
    return response.status(200).json(users);
  } catch (error) {
    console.error('Erro ao obter usuários com BC ou GVC igual a 1:', error);
    return response.status(500).json({ error: 'Erro ao obter usuários com BC ou GVC igual a 1' });
  }
};


module.exports = {
  getAllUsersCivil,
  createUserCivil,
  getUserCivilbyId,
  getUserCivilByCPF,
  getUsersWithBCorGVC
};
