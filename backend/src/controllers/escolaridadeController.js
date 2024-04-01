const escolaridadeModel = require('../models/escolaridadeModel');

const getAllEscolaridades = async (_request, response) => {
  try {
    const escolaridades = await escolaridadeModel.getAllEscolaridades();
    return response.status(200).json(escolaridades);
  } catch (error) {
    console.error('Erro ao obter escolaridades:', error);
    return response.status(500).json({ error: 'Erro ao obter escolaridades' });
  }
};

const createEscolaridade = async (req, res) => {
  try {
    const { nome, valor } = req.body;

    const createdEscolaridade = await escolaridadeModel.createEscolaridade({ nome, valor });
    return res.status(201).json(createdEscolaridade);
  } catch (error) {
    console.error('Erro ao criar escolaridade:', error);
    return res.status(500).json({ error: 'Erro ao criar escolaridade' });
  }
};

const deleteEscolaridadeById = async (req, res) => {
  try {
    const { id } = req.params;
    await escolaridadeModel.deleteEscolaridadeById(id);
    return res.status(200).json({ message: 'Escolaridade excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir escolaridade:', error);
    return res.status(500).json({ error: 'Erro ao excluir escolaridade' });
  }
};

const updateEscolaridadeById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEscolaridade = await escolaridadeModel.updateEscolaridadeById(id, req.body);
    return res.status(200).json(updatedEscolaridade);
  } catch (error) {
    console.error('Erro ao atualizar escolaridade:', error);
    return res.status(500).json({ error: 'Erro ao atualizar escolaridade' });
  }
};

const getEscolaridadeById = async (req, res) => {
  try {
    const { id } = req.params;
    const escolaridade = await escolaridadeModel.getEscolaridadeById(id);
    if (escolaridade) {
      return res.status(200).json(escolaridade);
    } else {
      return res.status(404).json({ message: 'Escolaridade não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter escolaridade:', error);
    return res.status(500).json({ error: 'Erro ao obter escolaridade' });
  }
};

module.exports = {
  createEscolaridade,
  deleteEscolaridadeById,
  updateEscolaridadeById,
  getEscolaridadeById,
  getAllEscolaridades
};
