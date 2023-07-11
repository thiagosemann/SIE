const tabelaDadosModel = require('../../models/Documentos/TabelaDadosModel');

const getAllTabelasDados = async (_request, response) => {
  try {
    const tabelasDados = await tabelaDadosModel.getAllTabelasDados();
    return response.status(200).json(tabelasDados);
  } catch (error) {
    console.error('Erro ao obter tabelas de dados:', error);
    return response.status(500).json({ error: 'Erro ao obter tabelas de dados' });
  }
};

const createTabelaDados = async (request, response) => {
  try {
    const { itemId, content, hasHeader } = request.body;
    const createdTabelaDados = await tabelaDadosModel.createTabelaDados(itemId, content, hasHeader);
    return response.status(201).json(createdTabelaDados);
  } catch (error) {
    console.error('Erro ao criar tabela de dados:', error);
    return response.status(500).json({ error: 'Erro ao criar tabela de dados' });
  }
};

const deleteTabelaDados = async (request, response) => {
  try {
    const { id } = request.params;
    await tabelaDadosModel.deleteTabelaDados(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir tabela de dados:', error);
    return response.status(500).json({ error: 'Erro ao excluir tabela de dados' });
  }
};

module.exports = {
  getAllTabelasDados,
  createTabelaDados,
  deleteTabelaDados
};
