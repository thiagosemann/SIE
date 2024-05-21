const compiladoPagamentoModel = require('../models/compiladoPagamentoModel');

const getAllCompiladoPagamento = async (_request, response) => {
  try {
    const compiladoPagamento = await compiladoPagamentoModel.getAllCompiladoPagamento();
    return response.status(200).json(compiladoPagamento);
  } catch (error) {
    console.error('Erro ao obter todos os compilados de pagamento:', error);
    return response.status(500).json({ error: 'Erro ao obter todos os compilados de pagamento' });
  }
};

const createCompiladoPagamento = async (request, response) => {
  try {
    const createdCompiladoPagamento = await compiladoPagamentoModel.createCompiladoPagamento(request.body);
    return response.status(201).json(createdCompiladoPagamento);
  } catch (error) {
    console.error('Erro ao criar compilado de pagamento:', error);
    return response.status(500).json({ error: 'Erro ao criar compilado de pagamento' });
  }
};

const getCompiladoPagamentoById = async (request, response) => {
  const { id } = request.params;
  try {
    const compiladoPagamento = await compiladoPagamentoModel.getCompiladoPagamentoById(id);
    if (!compiladoPagamento) {
      return response.status(404).json({ error: 'Compilado de pagamento não encontrado' });
    }
    return response.status(200).json(compiladoPagamento);
  } catch (error) {
    console.error('Erro ao obter compilado de pagamento por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter compilado de pagamento por ID' });
  }
};

const updateCompiladoPagamentoById = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedCompiladoPagamentoData = { id, ...request.body };
    const result = await compiladoPagamentoModel.updateCompiladoPagamentoById(id, updatedCompiladoPagamentoData);
    if (!result.success) {
      return response.status(404).json({ error: `Compilado de pagamento com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar compilado de pagamento:', error);
    return response.status(500).json({ error: 'Erro ao atualizar compilado de pagamento' });
  }
};

const deleteCompiladoPagamentoById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await compiladoPagamentoModel.deleteCompiladoPagamentoById(id);
    if (!result.success) {
      return response.status(404).json({ error: `Compilado de pagamento com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar compilado de pagamento:', error);
    return response.status(500).json({ error: 'Erro ao deletar compilado de pagamento' });
  }
};

module.exports = {
  getAllCompiladoPagamento,
  createCompiladoPagamento,
  getCompiladoPagamentoById,
  updateCompiladoPagamentoById,
  deleteCompiladoPagamentoById
};
