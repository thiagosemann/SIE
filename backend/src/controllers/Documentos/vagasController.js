const vagasModel = require('../../models/Documentos/vagasModel');

const getAllVagas = async (_request, response) => {
  try {
    const vagas = await vagasModel.getAllVagas();
    return response.status(200).json(vagas);
  } catch (error) {
    console.error('Erro ao obter vagas:', error);
    return response.status(500).json({ error: 'Erro ao obter vagas' });
  }
};

const createVaga = async (request, response) => {
  try {
    const { itemId, bbm, quantidade } = request.body;
    const createdVaga = await vagasModel.createVaga(itemId, bbm, quantidade);
    return response.status(201).json(createdVaga);
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    return response.status(500).json({ error: 'Erro ao criar vaga' });
  }
};

const deleteVaga = async (request, response) => {
  try {
    const { id } = request.params;
    await vagasModel.deleteVaga(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir vaga:', error);
    return response.status(500).json({ error: 'Erro ao excluir vaga' });
  }
};

module.exports = {
  getAllVagas,
  createVaga,
  deleteVaga
};
