const capituloModel = require('../../models/Documentos/capituloModel');

const getAllCapitulos = async (_request, response) => {
  try {
    const capitulos = await capituloModel.getAllCapitulos();
    return response.status(200).json(capitulos);
  } catch (error) {
    console.error('Erro ao obter capítulos:', error);
    return response.status(500).json({ error: 'Erro ao obter capítulos' });
  }
};

const createCapitulo = async (request, response) => {
  try {
    const { documentoId, numero, texto } = request.body;
    const createdCapitulo = await capituloModel.createCapitulo(documentoId, numero, texto);
    return response.status(201).json(createdCapitulo);
  } catch (error) {
    console.error('Erro ao criar capítulo:', error);
    return response.status(500).json({ error: 'Erro ao criar capítulo' });
  }
};

const deleteCapitulo = async (request, response) => {
  try {
    const { id } = request.params;
    await capituloModel.deleteCapitulo(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir capítulo:', error);
    return response.status(500).json({ error: 'Erro ao excluir capítulo' });
  }
};

module.exports = {
  getAllCapitulos,
  createCapitulo,
  deleteCapitulo
};
