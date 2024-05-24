const rfcModel = require('../models/rfcModel');

const getAllRFCs = async (_request, response) => {
  try {
    const rfcs = await rfcModel.getAllRFCs();
    return response.status(200).json(rfcs);
  } catch (error) {
    console.error('Erro ao obter RFCs:', error);
    return response.status(500).json({ error: 'Erro ao obter RFCs' });
  }
};

const createRFC = async (request, response) => {
  try {
    const createdRFC = await rfcModel.createRFC(request.body);
    return response.status(201).json(createdRFC);
  } catch (error) {
    console.error('Erro ao criar RFC:', error);
    return response.status(500).json({ error: 'Erro ao criar RFC' });
  }
};

const getRFCById = async (request, response) => {
  const { id } = request.params;
  try {
    const rfc = await rfcModel.getRFCById(id);
    if (!rfc) {
      return response.status(404).json({ error: 'RFC não encontrado' });
    }
    return response.status(200).json(rfc);
  } catch (error) {
    console.error('Erro ao obter RFC por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter RFC por ID' });
  }
};

const updateRFCById = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedRFCData = { id, ...request.body };
    const result = await rfcModel.updateRFCById(id, updatedRFCData);
    if (!result.success) {
      return response.status(404).json({ error: `RFC com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar RFC:', error);
    return response.status(500).json({ error: 'Erro ao atualizar RFC' });
  }
};

const deleteRFCById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await rfcModel.deleteRFCById(id);
    if (!result.success) {
      return response.status(404).json({ error: `RFC com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar RFC:', error);
    return response.status(500).json({ error: 'Erro ao deletar RFC' });
  }
};

// Nova função para obter RFCs por ID do compilado de diária de curso
const getRFCByCompiladoId = async (request, response) => {
  const { compiladoId } = request.params;
  try {
    const rfcs = await rfcModel.getRFCByCompiladoId(compiladoId);
    return response.status(200).json(rfcs);
  } catch (error) {
    console.error('Erro ao obter RFCs por ID do compilado:', error);
    return response.status(500).json({ error: 'Erro ao obter RFCs por ID do compilado' });
  }
};

module.exports = {
  getAllRFCs,
  createRFC,
  getRFCById,
  updateRFCById,
  deleteRFCById,
  getRFCByCompiladoId 
};
