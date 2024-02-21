const inscricoesModel = require('../models/inscritionModel');

const getAllInscricoes = async (_request, response) => {
  try {
    const inscricoes = await inscricoesModel.getAllInscricoes();
    return response.status(200).json(inscricoes);
  } catch (error) {
    console.error('Erro ao obter inscrições:', error);
    return response.status(500).json({ error: 'Erro ao obter inscrições' });
  }
};

const createInscricao = async (req, res) => {
  try {
    const { documentosCriadosId, userCivilId } = req.body;

    // Verifica se já existe uma inscrição para o mesmo documentosCriadosId e userCivilId
    const existingInscricao = await inscricoesModel.getInscricaoByDocumentAndUser(documentosCriadosId, userCivilId);

    if (existingInscricao) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const createdInscricao = await inscricoesModel.createInscricao(req.body);
    return res.status(201).json(createdInscricao);
  } catch (error) {
    console.error('Erro ao criar inscrição:', error);
    return res.status(500).json({ error: 'Erro ao criar inscrição' });
  }
};

const deleteInscricaoById = async (req, res) => {
  try {
    const { id } = req.params;
    await inscricoesModel.deleteInscricaoById(id);
    return res.status(200).json({ message: 'Inscrição excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir inscrição:', error);
    return res.status(500).json({ error: 'Erro ao excluir inscrição' });
  }
};

const updateInscricaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInscricao = await inscricoesModel.updateInscricaoById(id, req.body);
    return res.status(200).json(updatedInscricao);
  } catch (error) {
    console.error('Erro ao atualizar inscrição:', error);
    return res.status(500).json({ error: 'Erro ao atualizar inscrição' });
  }
};

const getInscricaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const inscricao = await inscricoesModel.getInscricaoById(id);
    if (inscricao) {
      return res.status(200).json(inscricao);
    } else {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter inscrição:', error);
    return res.status(500).json({ error: 'Erro ao obter inscrição' });
  }
};

const getInscricoesByDocument= async (req, res) => {
  try {
    const { documentosCriadosId } = req.params;
    const inscricoes = await inscricoesModel.getInscricoesByDocument(documentosCriadosId);
    if (inscricoes) {
      return res.status(200).json(inscricoes);
    } else {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter inscrição:', error);
    return res.status(500).json({ error: 'Erro ao obter inscrição' });
  }
};

module.exports = {
  createInscricao,
  deleteInscricaoById,
  updateInscricaoById,
  getInscricaoById,
  getAllInscricoes,
  getInscricoesByDocument
};
