const custosModel = require('../../models/Documentos/custosModel');

const getAllCustos = async (_req, res) => {
  try {
    const custos = await custosModel.getAllCustos();
    res.status(200).json(custos);
  } catch (error) {
    console.error('Erro ao obter custos:', error);
    res.status(500).json({ error: 'Erro ao obter custos' });
  }
};

const createCusto = async (req, res) => {
  try {
    const { item_id, descricao, valor } = req.body;
    const createdCusto = await custosModel.createCusto({ item_id, descricao, valor });
    res.status(201).json(createdCusto);
  } catch (error) {
    console.error('Erro ao criar custo:', error);
    res.status(500).json({ error: 'Erro ao criar custo' });
  }
};

const deleteCusto = async (req, res) => {
  try {
    const { id } = req.params;
    await custosModel.deleteCusto(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir custo:', error);
    res.status(500).json({ error: 'Erro ao excluir custo' });
  }
};

module.exports = {
  getAllCustos,
  createCusto,
  deleteCusto,
};
