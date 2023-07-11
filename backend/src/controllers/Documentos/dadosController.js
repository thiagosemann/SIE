const dadosModel = require('../../models/Documentos/dadosModel');

const getAllDados = async (_request, response) => {
  try {
    const dados = await dadosModel.getAllDados();
    return response.status(200).json(dados);
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    return response.status(500).json({ error: 'Erro ao obter dados' });
  }
};

const createDados = async (request, response) => {
  try {
    const { tabelaDadosId, linha, coluna, valor } = request.body;
    const createdDados = await dadosModel.createDados(tabelaDadosId, linha, coluna, valor);
    return response.status(201).json(createdDados);
  } catch (error) {
    console.error('Erro ao criar dados:', error);
    return response.status(500).json({ error: 'Erro ao criar dados' });
  }
};

const deleteDados = async (request, response) => {
  try {
    const { id } = request.params;
    await dadosModel.deleteDados(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir dados:', error);
    return response.status(500).json({ error: 'Erro ao excluir dados' });
  }
};

module.exports = {
  getAllDados,
  createDados,
  deleteDados
};
