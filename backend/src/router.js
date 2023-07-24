const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const documentsController = require('./controllers/documentoController'); // Importe o controlador dos documentos
const pgeController = require('./controllers/pgeController')
const atividadeHomologadaController = require('./controllers/atividadeHomologadaController')
const verifyToken = require('./middlewares/authMiddleware'); // Importe o middleware de autenticação

// ROTAS USERS
router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/users/:mtcl', verifyToken, usersController.getUserByMtcl);

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


module.exports = router;
