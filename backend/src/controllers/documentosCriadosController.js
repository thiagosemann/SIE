const cursosModel = require('../models/documentosCriadosModel');
const professoresByDocumentoModel = require('../models/professoresByDocumentoModel'); // Importando o modelo dos professores

const getAllCourses = async (_request, response) => {
  try {
    const courses = await cursosModel.getAllCourses();
    return response.status(200).json(courses);
  } catch (error) {
    console.error('Erro ao obter cursos:', error);
    return response.status(500).json({ error: 'Erro ao obter cursos' });
  }
};

const createCourse = async (req, res) => {
  try {
    const createdCourse = await cursosModel.createCourse(req.body);
    console.log("req.body",req.body.dados.docentesQTSObj)
    console.log("createdCourse",createdCourse)
    if(req.body.dados.docentesQTSObj){
      const aux = await professoresByDocumentoModel.createProfessoresByDocumento(req.body.dados.docentesQTSObj,createdCourse.insertId)
    }
    
    return res.status(201).json(createdCourse);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    return res.status(500).json({ error: 'Erro ao criar curso' });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    await cursosModel.deleteCourseById(id);
    return res.status(200).json({ message: 'Curso excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir curso:', error);
    return res.status(500).json({ error: 'Erro ao excluir curso' });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await cursosModel.updateCourseById(id, req.body);
    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    return res.status(500).json({ error: 'Erro ao atualizar curso' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await cursosModel.getCourseById(id);
    if (course) {
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter curso:', error);
    return res.status(500).json({ error: 'Erro ao obter curso' });
  }
};

const getCourseByAuth = async (req, res) => {
  try {
    const { auth } = req.params;
    const course = await cursosModel.getCourseByAuth(auth);
    if (course) {
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter curso:', error);
    return res.status(500).json({ error: 'Erro ao obter curso' });
  }
};


module.exports = {
  createCourse,
  deleteCourseById,
  updateCourseById,
  getCourseById,
  getCourseByAuth,
  getAllCourses
};
