const pagamentoHoraAulaModel = require('../models/pagamentoHoraAulaModel');

const getAllPagamentosHoraAula = async (_request, response) => {
  try {
    const pagamentosHoraAula = await pagamentoHoraAulaModel.getAllPagamentosHoraAula();
    return response.status(200).json(pagamentosHoraAula);
  } catch (error) {
    console.error('Erro ao obter pagamentos de hora/aula:', error);
    return response.status(500).json({ error: 'Erro ao obter pagamentos de hora/aula' });
  }
};

const createPagamentoHoraAula = async (request, response) => {
  try {
    const createdPagamentoHoraAula = await pagamentoHoraAulaModel.createPagamentoHoraAula(request.body);
    return response.status(201).json(createdPagamentoHoraAula);
  } catch (error) {
    console.error('Erro ao criar pagamento de hora/aula:', error);
    return response.status(500).json({ error: 'Erro ao criar pagamento de hora/aula' });
  }
};

const getPagamentoHoraAulaById = async (request, response) => {
  const { id } = request.params;
  try {
    const pagamentoHoraAula = await pagamentoHoraAulaModel.getPagamentoHoraAulaById(id);
    if (!pagamentoHoraAula) {
      return response.status(404).json({ error: 'Pagamento de hora/aula não encontrado' });
    }
    return response.status(200).json(pagamentoHoraAula);
  } catch (error) {
    console.error('Erro ao obter pagamento de hora/aula por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter pagamento de hora/aula por ID' });
  }
};

const updatePagamentoHoraAulaById = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedPagamentoHoraAulaData = { ...request.body };
    const result = await pagamentoHoraAulaModel.updatePagamentoHoraAulaById(id, updatedPagamentoHoraAulaData);
    if (!result.success) {
      return response.status(404).json({ error: `Pagamento de hora/aula com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar pagamento de hora/aula:', error);
    return response.status(500).json({ error: 'Erro ao atualizar pagamento de hora/aula' });
  }
};

const deletePagamentoHoraAulaById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await pagamentoHoraAulaModel.deletePagamentoHoraAulaById(id);
    if (!result.success) {
      return response.status(404).json({ error: `Pagamento de hora/aula com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar pagamento de hora/aula:', error);
    return response.status(500).json({ error: 'Erro ao deletar pagamento de hora/aula' });
  }
};

const getPagamentoByCompiladoId = async (request, response) => {
  const { compiladoId } = request.params;
  try {
    const pagamentosHoraAula = await pagamentoHoraAulaModel.getPagamentoByCompiladoId(compiladoId);
    return response.status(200).json(pagamentosHoraAula);
  } catch (error) {
    console.error('Erro ao obter pagamentos de hora/aula por compilado_id:', error);
    return response.status(500).json({ error: 'Erro ao obter pagamentos de hora/aula por compilado_id' });
  }
};

module.exports = {
  getAllPagamentosHoraAula,
  createPagamentoHoraAula,
  getPagamentoHoraAulaById,
  updatePagamentoHoraAulaById,
  deletePagamentoHoraAulaById,
  getPagamentoByCompiladoId
};
