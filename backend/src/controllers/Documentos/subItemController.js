const subitemModel = require('../../models/Documentos/subitemModel');

const getAllSubitens = async (_request, response) => {
  try {
    const subitens = await subitemModel.getAllSubitens();
    return response.status(200).json(subitens);
  } catch (error) {
    console.error('Erro ao obter subitens:', error);
    return response.status(500).json({ error: 'Erro ao obter subitens' });
  }
};

const createSubitem = async (request, response) => {
  try {
    const { itemId, letra, texto } = request.body;
    const createdSubitem = await subitemModel.createSubitem(itemId, letra, texto);
    return response.status(201).json(createdSubitem);
  } catch (error) {
    console.error('Erro ao criar subitem:', error);
    return response.status(500).json({ error: 'Erro ao criar subitem' });
  }
};

const deleteSubitem = async (request, response) => {
  try {
    const { id } = request.params;
    await subitemModel.deleteSubitem(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir subitem:', error);
    return response.status(500).json({ error: 'Erro ao excluir subitem' });
  }
};

module.exports = {
  getAllSubitens,
  createSubitem,
  deleteSubitem
};
