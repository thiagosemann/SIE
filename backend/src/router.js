const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const documentsController = require('./controllers/documentoController'); // Importe o controlador dos documentos
const pgeController = require('./controllers/pgeController');
const atividadeHomologadaController = require('./controllers/atividadeHomologadaController');
const cursosController = require('./controllers/cursosController')
const licoesController = require('./controllers/licoesAtividadeHomologadaController');

const verifyToken = require('./middlewares/authMiddleware'); // Importe o middleware de autenticação

// ROTAS USERS
router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/users/:mtcl', verifyToken, usersController.getUserByMtcl);
router.put('/users/:id', verifyToken, usersController.updateUser);
router.post('/users', verifyToken, usersController.createUser);
router.post('/users/batch', verifyToken, usersController.batchUpdateUsers);

// ROTA LOGIN
router.post('/login', usersController.loginUser);

// ROTAS DOCUMENTS
router.get('/documents', verifyToken, documentsController.getAllDocuments);
router.post('/documents', verifyToken, documentsController.createDocument);
router.delete('/documents/:id', verifyToken, documentsController.deleteDocumentById);
router.put('/documents/:id', verifyToken, documentsController.updateDocumentById);
router.get('/documents/:id', verifyToken, documentsController.getDocumentById);
router.get('/documents/name/:name', documentsController.getDocumentByName);

// ROTAS PGE
router.get('/pge',verifyToken,pgeController.getAllPge)

//ROTAS ATIVIDADE DE ENSINO HOMOLOGADA
router.get('/atividadeHomologada',verifyToken,atividadeHomologadaController.getAllAtividadeHomologada)
router.get('/atividadeHomologada/sigla/:sigla',verifyToken,atividadeHomologadaController.getAtividadeHomologadaBySigla)
router.get('/atividadeHomologada/versions/:id', verifyToken, atividadeHomologadaController.getAllAtividadeHomologadaVersionsById);
router.put('/atividadeHomologada/:id', verifyToken, atividadeHomologadaController.updateAtividadeHomologadaById);

// ROTAS CURSOS
router.get('/documentosCriados', verifyToken, cursosController.getAllCourses);
router.post('/documentosCriados', verifyToken, cursosController.createCourse);
router.delete('/documentosCriados/:id', verifyToken, cursosController.deleteCourseById);
router.put('/documentosCriados/:id', verifyToken, cursosController.updateCourseById);
router.get('/documentosCriados/id/:id', cursosController.getCourseById);
router.get('/documentosCriados/auth/:auth', cursosController.getCourseByAuth);

// Rotas para Lições
router.get('/licoes', verifyToken, licoesController.getAllLicoes);
router.get('/licoes/sigla/:sigla', licoesController.getLicoesBySigla);


module.exports = router;
