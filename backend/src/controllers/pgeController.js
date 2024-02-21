const pgeModel = require('../models/pgeModel');
const axios = require('axios');

const getAllPge = async (_request, response) => {
  try {
    const pges = await pgeModel.getAllPge();
    return response.status(200).json(pges);
  } catch (error) {
    console.error('Erro ao obter PGE:', error);
    return response.status(500).json({ error: 'Erro ao obter PGEs' });
  }
};

const updatePgeById = async (request, response) => {
  try {
    const { id } = request.params; // Assuming you are passing the ID in the request parameters
    const updatedUserData = request.body;
    const result = await pgeModel.updatePgeById(id, updatedUserData);
    return response.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar PGE:', error);
    return response.status(500).json({ error: 'Erro ao atualizar PGE' });
  }
};






module.exports = {
  getAllPge,
  updatePgeById
};
