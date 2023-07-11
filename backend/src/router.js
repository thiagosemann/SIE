const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const pgeController = require('./controllers/pgeController'); // Importe o controlador da PGE

const documentoController = require('./controllers/Documentos/documentoController');
const dataDocumentoController = require('./controllers/Documentos/dataDocumentoController');
const capituloController = require('./controllers/Documentos/capituloController');
const itemController = require('./controllers/Documentos/itemController');
const subitemController = require('./controllers/Documentos/subItemController');
const subsubitemController = require('./controllers/Documentos/subSubItemController');
const tabelaDadosController = require('./controllers/Documentos/tabelaDadosController');
const dadosController = require('./controllers/Documentos/dadosController');
const vagasController = require('./controllers/Documentos/vagasController');
const custosController = require('./controllers/Documentos/custosController');

const verifyToken = require('./middlewares/authMiddleware'); // Adicione esta linha para importar o middleware

// ROTAS USERS
router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/users/:mtcl',verifyToken, usersController.getUserByMtcl);


// ROTA LOGIN
router.post('/login', usersController.loginUser);

// ROTA PGE
router.get('/pge/populate-database', pgeController.fetchDataAndSaveToDatabase);
router.get('/pge', verifyToken, pgeController.getAllPge);


// ROTAS DOCUMENTO
router.get('/documentos', verifyToken, documentoController.getAllDocumentos);
router.post('/documentos', verifyToken, documentoController.createDocumento);
router.delete('/documentos/:id', verifyToken, documentoController.deleteDocumento);
router.get('/documento/:tipoDocumento', documentoController.getDocumentoByTipo);


// ROTAS DATA_DOCUMENTO
router.get('/data-documentos', verifyToken, dataDocumentoController.getAllDataDocumentos);
router.post('/data-documentos', verifyToken, dataDocumentoController.createDataDocumento);
router.delete('/data-documentos/:id', verifyToken, dataDocumentoController.deleteDataDocumento);

// ROTAS CAPITULO
router.get('/capitulos', verifyToken, capituloController.getAllCapitulos);
router.post('/capitulos', verifyToken, capituloController.createCapitulo);
router.delete('/capitulos/:id', verifyToken, capituloController.deleteCapitulo);

// ROTAS ITEM
router.get('/itens', verifyToken, itemController.getAllItens);
router.post('/itens', verifyToken, itemController.createItem);
router.delete('/itens/:id', verifyToken, itemController.deleteItem);

// ROTAS SUBITEM
router.get('/subitens', verifyToken, subitemController.getAllSubitens);
router.post('/subitens', verifyToken, subitemController.createSubitem);
router.delete('/subitens/:id', verifyToken, subitemController.deleteSubitem);

// ROTAS SUBSUBITEM
router.get('/subsubitens', verifyToken, subsubitemController.getAllSubsubitens);
router.post('/subsubitens', verifyToken, subsubitemController.createSubsubitem);
router.delete('/subsubitens/:id', verifyToken, subsubitemController.deleteSubsubitem);

// ROTAS TABELA_DADOS
router.get('/tabelas-dados', verifyToken, tabelaDadosController.getAllTabelasDados);
router.post('/tabelas-dados', verifyToken, tabelaDadosController.createTabelaDados);
router.delete('/tabelas-dados/:id', verifyToken, tabelaDadosController.deleteTabelaDados);

// ROTAS DADOS
router.get('/dados', verifyToken, dadosController.getAllDados);
router.post('/dados', verifyToken, dadosController.createDados);
router.delete('/dados/:id', verifyToken, dadosController.deleteDados);

// ROTAS VAGAS
router.get('/vagas', verifyToken, vagasController.getAllVagas);
router.post('/vagas', verifyToken, vagasController.createVaga);
router.delete('/vagas/:id', verifyToken, vagasController.deleteVaga);

// ROTAS CUSTOS
router.get('/custos', verifyToken, custosController.getAllCustos);
router.post('/custos', verifyToken, custosController.createCusto);
router.delete('/custos/:id', verifyToken, custosController.deleteCusto);

module.exports = router;