const alunosModel = require('../models/alunosByDocumentoModel');

const getAllAlunosByDocumento = async (_request, response) => {
  try {
    const alunos = await alunosModel.getAllAlunosByDocumento();
    return response.status(200).json(alunos);
  } catch (error) {
    console.error('Erro ao obter alunos:', error);
    return response.status(500).json({ error: 'Erro ao obter alunos' });
  }
};

const createAlunoByDocumento = async (request, response) => {
  try {
    const createdAluno = await alunosModel.createAlunoByDocumento(request.body);
    return response.status(201).json(createdAluno);
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    return response.status(500).json({ error: 'Erro ao criar aluno' });
  }
};

const getAlunoByDocumentoId = async (request, response) => {
  const { id } = request.params;
  try {
    const aluno = await alunosModel.getAlunoByDocumentoId(id);
    if (!aluno) {
      return response.status(404).json({ error: 'Aluno não encontrado' });
    }
    return response.status(200).json(aluno);
  } catch (error) {
    console.error('Erro ao obter aluno por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter aluno por ID' });
  }
};

const updateAlunoByDocumentoId = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedAlunoData = { id, ...request.body };
    const result = await alunosModel.updateAlunoByDocumentoId(updatedAlunoData);
    if (!result.success) {
      return response.status(404).json({ error: `Aluno com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    return response.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

const deleteAlunoByDocumentoId = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await alunosModel.deleteAlunoByDocumentoId(id);
    if (!result.success) {
      return response.status(404).json({ error: `Aluno com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    return response.status(500).json({ error: 'Erro ao deletar aluno' });
  }
};

module.exports = {
  getAllAlunosByDocumento,
  createAlunoByDocumento,
  getAlunoByDocumentoId,
  updateAlunoByDocumentoId,
  deleteAlunoByDocumentoId
};
