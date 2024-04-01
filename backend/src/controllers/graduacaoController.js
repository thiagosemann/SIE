const graduacaoModel = require('../models/graduacaoModel');

const getAllGraduacoes = async (_request, response) => {
  try {
    const graduacoes = await graduacaoModel.getAllGraduacoes();
    return response.status(200).json(graduacoes);
  } catch (error) {
    console.error('Erro ao obter graduações:', error);
    return response.status(500).json({ error: 'Erro ao obter graduações' });
  }
};

const createGraduacao = async (req, res) => {
  try {
    const { nome, diariaCurso, abreviacao1, abreviacao2 } = req.body;

    const createdGraduacao = await graduacaoModel.createGraduacao({ nome, diariaCurso, abreviacao1, abreviacao2 });
    return res.status(201).json(createdGraduacao);
  } catch (error) {
    console.error('Erro ao criar graduação:', error);
    return res.status(500).json({ error: 'Erro ao criar graduação' });
  }
};

const deleteGraduacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    await graduacaoModel.deleteGraduacaoById(id);
    return res.status(200).json({ message: 'Graduação excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir graduação:', error);
    return res.status(500).json({ error: 'Erro ao excluir graduação' });
  }
};

const updateGraduacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGraduacao = await graduacaoModel.updateGraduacaoById(id, req.body);
    return res.status(200).json(updatedGraduacao);
  } catch (error) {
    console.error('Erro ao atualizar graduação:', error);
    return res.status(500).json({ error: 'Erro ao atualizar graduação' });
  }
};

const getGraduacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const graduacao = await graduacaoModel.getGraduacaoById(id);
    if (graduacao) {
      return res.status(200).json(graduacao);
    } else {
      return res.status(404).json({ message: 'Graduação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter graduação:', error);
    return res.status(500).json({ error: 'Erro ao obter graduação' });
  }
};

module.exports = {
  createGraduacao,
  deleteGraduacaoById,
  updateGraduacaoById,
  getGraduacaoById,
  getAllGraduacoes
};
