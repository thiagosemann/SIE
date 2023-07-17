const documentsModel = require('../models/documentoModel');


const getAllDocuments = async (_request, response) => {
  try {
    const users = await documentsModel.getAllDocuments();
    return response.status(200).json(users);
  } catch (error) {
    console.error('Erro ao obter documentos:', error);
    return response.status(500).json({ error: 'Erro ao obter documentos' });
  }
};
const createDocument = async (req, res) => {
  try {
    const createdDocument = await documentsModel.createDocument(req.body);
    return res.status(201).json(createdDocument);
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    return res.status(500).json({ error: 'Erro ao criar documento' });
  }
};

const deleteDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    await documentsModel.deleteDocumentById(id);
    return res.status(200).json({ message: 'Documento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return res.status(500).json({ error: 'Erro ao excluir documento' });
  }
};

const updateDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDocument = await documentsModel.updateDocumentById(id, req.body);
    return res.status(200).json(updatedDocument);
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return res.status(500).json({ error: 'Erro ao atualizar documento' });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await documentsModel.getDocumentById(id);
    if (document) {
      return res.status(200).json(document);
    } else {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter documento:', error);
    return res.status(500).json({ error: 'Erro ao obter documento' });
  }
};

const getDocumentByName = async (req, res) => {
  try {
    const { name } = req.params;
    const document = await documentsModel.getDocumentByName(name);
    if (document) {
      return res.status(200).json(document);
    } else {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter documento:', error);
    return res.status(500).json({ error: 'Erro ao obter documento' });
  }
};

module.exports = {
  createDocument,
  deleteDocumentById,
  updateDocumentById,
  getDocumentById,
  getDocumentByName,
  getAllDocuments
};
