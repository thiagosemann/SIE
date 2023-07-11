const dataDocumentoModel = require('../../models/Documentos/dataDocumentoModel');

const getAllDataDocumentos = async (_request, response) => {
  try {
    const dataDocumentos = await dataDocumentoModel.getAllDataDocumentos();
    return response.status(200).json(dataDocumentos);
  } catch (error) {
    console.error('Erro ao obter data_documentos:', error);
    return response.status(500).json({ error: 'Erro ao obter data_documentos' });
  }
};

const createDataDocumento = async (request, response) => {
  try {
    const { documentoId, texto } = request.body;
    const createdDataDocumento = await dataDocumentoModel.createDataDocumento(documentoId, texto);
    return response.status(201).json(createdDataDocumento);
  } catch (error) {
    console.error('Erro ao criar data_documento:', error);
    return response.status(500).json({ error: 'Erro ao criar data_documento' });
  }
};

const deleteDataDocumento = async (request, response) => {
  try {
    const { id } = request.params;
    await dataDocumentoModel.deleteDataDocumento(id);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir data_documento:', error);
    return response.status(500).json({ error: 'Erro ao excluir data_documento' });
  }
};

module.exports = {
  getAllDataDocumentos,
  createDataDocumento,
  deleteDataDocumento
};
