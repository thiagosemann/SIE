const pagamentoDiariaDeCursoModel = require('../models/pagamentoDiariaDeCursoModel');

const getAllPagamentosDiariaDeCurso = async (_request, response) => {
  try {
    const pagamentosDiariaDeCurso = await pagamentoDiariaDeCursoModel.getAllPagamentosDiariaDeCurso();
    return response.status(200).json(pagamentosDiariaDeCurso);
  } catch (error) {
    console.error('Erro ao obter pagamentos de diária de curso:', error);
    return response.status(500).json({ error: 'Erro ao obter pagamentos de diária de curso' });
  }
};

const createPagamentoDiariaDeCurso = async (request, response) => {
  try {
    const createdPagamentoDiariaDeCurso = await pagamentoDiariaDeCursoModel.createPagamentoDiariaDeCurso(request.body);
    return response.status(201).json(createdPagamentoDiariaDeCurso);
  } catch (error) {
    console.error('Erro ao criar pagamento de diária de curso:', error);
    return response.status(500).json({ error: 'Erro ao criar pagamento de diária de curso' });
  }
};

const getPagamentoDiariaDeCursoById = async (request, response) => {
  const { id } = request.params;
  try {
    const pagamentoDiariaDeCurso = await pagamentoDiariaDeCursoModel.getPagamentoDiariaDeCursoById(id);
    if (!pagamentoDiariaDeCurso) {
      return response.status(404).json({ error: 'Pagamento de diária de curso não encontrado' });
    }
    return response.status(200).json(pagamentoDiariaDeCurso);
  } catch (error) {
    console.error('Erro ao obter pagamento de diária de curso por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter pagamento de diária de curso por ID' });
  }
};

const updatePagamentoDiariaDeCursoById = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedPagamentoDiariaDeCursoData = request.body;
    const result = await pagamentoDiariaDeCursoModel.updatePagamentoDiariaDeCursoById(id, updatedPagamentoDiariaDeCursoData);
    if (!result.success) {
      return response.status(404).json({ error: `Pagamento de diária de curso com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar pagamento de diária de curso:', error);
    return response.status(500).json({ error: 'Erro ao atualizar pagamento de diária de curso' });
  }
};

const deletePagamentoDiariaDeCursoById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await pagamentoDiariaDeCursoModel.deletePagamentoDiariaDeCursoById(id);
    if (!result.success) {
      return response.status(404).json({ error: `Pagamento de diária de curso com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar pagamento de diária de curso:', error);
    return response.status(500).json({ error: 'Erro ao deletar pagamento de diária de curso' });
  }
};

module.exports = {
  getAllPagamentosDiariaDeCurso,
  createPagamentoDiariaDeCurso,
  getPagamentoDiariaDeCursoById,
  updatePagamentoDiariaDeCursoById,
  deletePagamentoDiariaDeCursoById
};
