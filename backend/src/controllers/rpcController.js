const rpcModel = require('../models/rpcModel');

const getAllrpcs = async (_request, response) => {
  try {
    const rpcs = await rpcModel.getAllrpcs();
    return response.status(200).json(rpcs);
  } catch (error) {
    console.error('Erro ao obter rpcs:', error);
    return response.status(500).json({ error: 'Erro ao obter rpcs' });
  }
};

const createrpc = async (request, response) => {
  try {
    const createdrpc = await rpcModel.createrpc(request.body);
    return response.status(201).json(createdrpc);
  } catch (error) {
    console.error('Erro ao criar rpc:', error);
    return response.status(500).json({ error: 'Erro ao criar rpc' });
  }
};

const getrpcById = async (request, response) => {
  const { id } = request.params;
  try {
    const rpc = await rpcModel.getrpcById(id);
    if (!rpc) {
      return response.status(404).json({ error: 'rpc não encontrado' });
    }
    return response.status(200).json(rpc);
  } catch (error) {
    console.error('Erro ao obter rpc por ID:', error);
    return response.status(500).json({ error: 'Erro ao obter rpc por ID' });
  }
};

const updaterpcById = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedrpcData = { id, ...request.body };
    const result = await rpcModel.updaterpcById(id, updatedrpcData);
    if (!result.success) {
      return response.status(404).json({ error: `rpc com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar rpc:', error);
    return response.status(500).json({ error: 'Erro ao atualizar rpc' });
  }
};

const deleterpcById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await rpcModel.deleterpcById(id);
    if (!result.success) {
      return response.status(404).json({ error: `rpc com o ID ${id} não encontrado` });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar rpc:', error);
    return response.status(500).json({ error: 'Erro ao deletar rpc' });
  }
};

module.exports = {
  getAllrpcs,
  createrpc,
  getrpcById,
  updaterpcById,
  deleterpcById
};
