const subsubitemModel = require('../../models/Documentos/subsubItemModel');

const getAllSubsubitens = async (_request, response) => {
  try {
    const subsubitens = await subsubitemModel.getAllSubsubitens();
    return response.status(200).json(subsubitens);
  } catch (error) {
    console.error('Erro ao obter subsubitens:', error);
    return response.status(500).json({ error: 'Erro ao obter subsubitens' });
  }
};

const createSubsubitem = async (request, response) => {
  try {
    const { subitemId, letra, texto } = request.body;
    const createdSubsubitem = await subsubitemModel.createSubsubitem(subitemId, letra, texto);
    return response.status(201).json(createdSubsubitem);
  } catch (error) {
    console.error('Erro ao criar subsubitem:', error);
    return response.status(500).json({ error: 'Erro ao criar subsubitem' });
  }
};

const deleteSubsubitem = async (request, response) => {
  try {
    const { id } = request.params;
    await subsubitemModel.deleteSubsubitem(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir subsubitem:', error);
    return response.status(500).json({ error: 'Erro ao excluir subsubitem' });
  }
};

module.exports = {
  getAllSubsubitens,
  createSubsubitem,
  deleteSubsubitem
};
