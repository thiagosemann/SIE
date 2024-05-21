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

const getProfessoresByDocumentoId = async (request, response) => {
  const { id } = request.params;
  try {
    const docentes = await professoresModel.getProfessoresByDocumentoId(id);
    if (!docentes) {
      return response.status(404).json({ error: 'Nenhum aluno encontrado com o documento ID fornecido' });
    }
    return response.status(200).json(docentes);
  } catch (error) {
    console.error('Erro ao obter docentes por documento ID:', error);
    return response.status(500).json({ error: 'Erro ao obter docentes por documento ID' });
  }
};

module.exports = {
  getAllProfessoresByDocumento,
  createProfessorByDocumento,
  getProfessoresByDocumentoId
  // Adicione outras funções de controller aqui conforme necessário
};
