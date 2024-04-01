const professoresModel = require('../models/professoresByDocumentoModel'); // Importando o modelo dos professores

const getAllProfessoresByDocumento = async (_request, response) => {
  try {
    const professores = await professoresModel.getAllProfessoresByDocumento();
    return response.status(200).json(professores);
  } catch (error) {
    console.error('Erro ao obter professores:', error);
    return response.status(500).json({ error: 'Erro ao obter professores' });
  }
};

const createProfessorByDocumento = async (request, response) => {
  try {
    const createdProfessor = await professoresModel.createProfessorByDocumento(request.body);
    return response.status(201).json(createdProfessor);
  } catch (error) {
    console.error('Erro ao criar professor:', error);
    return response.status(500).json({ error: 'Erro ao criar professor' });
  }
};

// Defina outras funções de controller conforme necessário

module.exports = {
  getAllProfessoresByDocumento,
  createProfessorByDocumento
  // Adicione outras funções de controller aqui conforme necessário
};
