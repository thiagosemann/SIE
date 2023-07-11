const itemModel = require('../../models/Documentos/itemModel');

const getAllItens = async (_request, response) => {
  try {
    const itens = await itemModel.getAllItens();
    return response.status(200).json(itens);
  } catch (error) {
    console.error('Erro ao obter itens:', error);
    return response.status(500).json({ error: 'Erro ao obter itens' });
  }
};

const createItem = async (request, response) => {
  try {
    const { capituloId, numero, texto } = request.body;
    const createdItem = await itemModel.createItem(capituloId, numero, texto);
    return response.status(201).json(createdItem);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    return response.status(500).json({ error: 'Erro ao criar item' });
  }
};

const deleteItem = async (request, response) => {
  try {
    const { id } = request.params;
    await itemModel.deleteItem(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    return response.status(500).json({ error: 'Erro ao excluir item' });
  }
};

module.exports = {
  getAllItens,
  createItem,
  deleteItem
};
