const roleModel = require('../models/rolesModel');

const getAllRoles = async (_request, response) => {
  try {
    const roles = await roleModel.getAllRoles();
    return response.status(200).json(roles);
  } catch (error) {
    console.error('Erro ao obter funções:', error);
    return response.status(500).json({ error: 'Erro ao obter funções' });
  }
};

const createRole = async (req, res) => {
  try {
    const { nome } = req.body;

    const createdRole = await roleModel.createRole({ nome });
    return res.status(201).json(createdRole);
  } catch (error) {
    console.error('Erro ao criar função:', error);
    return res.status(500).json({ error: 'Erro ao criar função' });
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    await roleModel.deleteRoleById(id);
    return res.status(200).json({ message: 'Função excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir função:', error);
    return res.status(500).json({ error: 'Erro ao excluir função' });
  }
};

const updateRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await roleModel.updateRoleById(id, req.body);
    return res.status(200).json(updatedRole);
  } catch (error) {
    console.error('Erro ao atualizar função:', error);
    return res.status(500).json({ error: 'Erro ao atualizar função' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleModel.getRoleById(id);
    if (role) {
      return res.status(200).json(role);
    } else {
      return res.status(404).json({ message: 'Função não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter função:', error);
    return res.status(500).json({ error: 'Erro ao obter função' });
  }
};

module.exports = {
  createRole,
  deleteRoleById,
  updateRoleById,
  getRoleById,
  getAllRoles
};
