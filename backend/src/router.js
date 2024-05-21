const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const documentsController = require('./controllers/documentoController'); // Importe o controlador dos documentos
const pgeController = require('./controllers/pgeController');
const atividadeHomologadaController = require('./controllers/atividadeHomologadaController');
const documentosCriadosController = require('./controllers/documentosCriadosController')
const licoesController = require('./controllers/licoesAtividadeHomologadaController');
const usersCivisController = require('./controllers/usersCivilController'); // Adicione o controlador dos usuários civis
const inscricoesController = require('./controllers/inscritionController'); // Importe o controlador das inscrições
const editaisController = require('./controllers/editaisController'); // Importe o controlador dos editais
const professoresController = require('./controllers/professoresByDocumentoController'); // Importe o controlador dos professores
const graduacoesController = require('./controllers/graduacaoController'); // Importe o controlador das graduações
const escolaridadeController = require('./controllers/escolaridadeController'); // Importe o controlador das escolaridades
const rolesController = require('./controllers/rolesController'); // Importe o controlador de roles
const alunosController = require('./controllers/alunosByDocumentoController');
const rfcController = require('./controllers/rfcController'); // Importe o controlador da tabela RFC
const rpcController = require('./controllers/rpcController'); // Importe o controlador da tabela RFC
const pagamentoHoraAulaController = require('./controllers/pagamentoHoraAulaController'); // Importe o controlador da tabela pagamentoHoraAula
const pagamentoDiariaDeCursoController = require('./controllers/pagamentoDiariaDeCursoController'); // Importe o controlador da tabela pagamentoDiariaDeCurso
const compiladoPagamentoController = require('./controllers/compiladoPagamentoController');



const verifyToken = require('./middlewares/authMiddleware'); // Importe o middleware de autenticação

// ROTAS USERS
router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/users/:mtcl', verifyToken, usersController.getUserByMtcl);
router.get('/users/id/:id', verifyToken, usersController.getUserbyId);

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
router.put('/pge/:procNum', verifyToken, pgeController.updateSituacaoByProcNum);


//ROTAS ATIVIDADE DE ENSINO HOMOLOGADA
router.get('/atividadeHomologada',verifyToken,atividadeHomologadaController.getAllAtividadeHomologada)
router.get('/atividadeHomologada/sigla/:sigla',verifyToken,atividadeHomologadaController.getAtividadeHomologadaBySigla)
router.get('/atividadeHomologada/versions/:id', verifyToken, atividadeHomologadaController.getAllAtividadeHomologadaVersionsById);
router.put('/atividadeHomologada/:id', verifyToken, atividadeHomologadaController.updateAtividadeHomologadaById);
router.delete('/atividadehomologada/:id',verifyToken, atividadeHomologadaController.deleteAtividadeHomologadaById);
router.post('/atividadehomologada/',verifyToken, atividadeHomologadaController.createAtividadeHomologada);

// ROTAS CURSOS
router.get('/documentosCriados', verifyToken, documentosCriadosController.getAllCourses);
router.post('/documentosCriados', verifyToken, documentosCriadosController.createCourse);
router.delete('/documentosCriados/:id', verifyToken, documentosCriadosController.deleteCourseById);
router.put('/documentosCriados/:id', verifyToken, documentosCriadosController.updateCourseById);
router.get('/documentosCriados/id/:id', documentosCriadosController.getCourseById);
router.get('/documentosCriados/auth/:auth', documentosCriadosController.getCourseByAuth);

// Rotas para Lições
router.get('/licoes', verifyToken, licoesController.getAllLicoes);
router.get('/licoes/sigla/:sigla', licoesController.getLicoesBySigla);

// ROTAS USERSCIVIS
router.get('/usersCivil', verifyToken, usersCivisController.getAllUsersCivil);
router.post('/usersCivil', usersCivisController.createUserCivil);
router.get('/usersCivil/BCorGVC', verifyToken, usersCivisController.getUsersWithBCorGVC); 
router.get('/usersCivil/:id', verifyToken, usersCivisController.getUserCivilbyId);
router.get('/usersCivil/cpf/:cpf', verifyToken, usersCivisController.getUserCivilByCPF); 

// ROTAS INSCRICOES
router.get('/inscricoes', verifyToken, inscricoesController.getAllInscricoes);
router.post('/inscricoes', inscricoesController.createInscricao);
router.delete('/inscricoes/:id', verifyToken, inscricoesController.deleteInscricaoById);
router.put('/inscricoes/:id', verifyToken, inscricoesController.updateInscricaoById);
router.get('/inscricoes/:id', verifyToken, inscricoesController.getInscricaoById);
router.get('/inscricoes/documento/:documentosCriadosId', verifyToken, inscricoesController.getInscricoesByDocument);

// ROTAS EDITAIS
router.get('/editais', verifyToken, editaisController.getAllEditais);
router.post('/editais', verifyToken, editaisController.createEdital);
router.get('/editais/:id', verifyToken, editaisController.getEditalById);
router.put('/editais/:id', verifyToken, editaisController.updateEditalById);
router.delete('/editais/:id', verifyToken, editaisController.deleteEditalById);
router.get('/editais/bbm/:bbm', verifyToken, editaisController.getEditaisByBBM);
router.get('/editais/numeroProcesso/:numeroProcesso', verifyToken, editaisController.getEditaisByProcNum);

// ROTAS PROFESSORES
router.get('/professoresByDocumento', verifyToken, professoresController.getAllProfessoresByDocumento);
router.post('/professoresByDocumento', verifyToken, professoresController.createProfessorByDocumento);
router.get('/professoresByDocumento/:id', verifyToken, professoresController.getProfessoresByDocumentoId);

// ROTAS GRADUACOES
router.get('/graduacoes', verifyToken, graduacoesController.getAllGraduacoes);
router.post('/graduacoes', verifyToken, graduacoesController.createGraduacao);
router.delete('/graduacoes/:id', verifyToken, graduacoesController.deleteGraduacaoById);
router.put('/graduacoes/:id', verifyToken, graduacoesController.updateGraduacaoById);
router.get('/graduacoes/:id', verifyToken, graduacoesController.getGraduacaoById);

// ROTAS ESCOLARIDADE
router.get('/escolaridades', verifyToken, escolaridadeController.getAllEscolaridades);
router.post('/escolaridades', verifyToken, escolaridadeController.createEscolaridade);
router.delete('/escolaridades/:id', verifyToken, escolaridadeController.deleteEscolaridadeById);
router.put('/escolaridades/:id', verifyToken, escolaridadeController.updateEscolaridadeById);
router.get('/escolaridades/:id', verifyToken, escolaridadeController.getEscolaridadeById);

// ROTAS PARA ROLES
router.get('/roles', verifyToken, rolesController.getAllRoles);
router.post('/roles', verifyToken, rolesController.createRole);
router.delete('/roles/:id', verifyToken, rolesController.deleteRoleById);
router.put('/roles/:id', verifyToken, rolesController.updateRoleById);
router.get('/roles/:id', verifyToken, rolesController.getRoleById);


// ROTAS ALUNOS
router.get('/alunosByDocumento', verifyToken, alunosController.getAllAlunosByDocumento);
router.post('/alunosByDocumento', verifyToken, alunosController.createAlunoByDocumento);
router.get('/alunosByDocumento/:id', verifyToken, alunosController.getAlunosByDocumentoId);
router.put('/alunosByDocumento/:id', verifyToken, alunosController.updateAlunoByDocumentoId);
router.delete('/alunosByDocumento/:id', verifyToken, alunosController.deleteAlunoByDocumentoId);


// ROTAS PARA RFC
router.get('/rfc', verifyToken, rfcController.getAllRFCs);
router.post('/rfc', verifyToken, rfcController.createRFC);
router.get('/rfc/:id', verifyToken, rfcController.getRFCById);
router.put('/rfc/:id', verifyToken, rfcController.updateRFCById);
router.delete('/rfc/:id', verifyToken, rfcController.deleteRFCById);

// ROTAS PARA RFC
router.get('/rpc', verifyToken, rpcController.getAllrpcs);
router.post('/rpc', verifyToken, rpcController.createrpc);
router.get('/rpc/:id', verifyToken, rpcController.getrpcById);
router.put('/rpc/:id', verifyToken, rpcController.updaterpcById);
router.delete('/rpc/:id', verifyToken, rpcController.deleterpcById);

// ROTAS PARA PAGAMENTOS DE HORA/AULA
router.get('/pagamentoHoraAula', verifyToken, pagamentoHoraAulaController.getAllPagamentosHoraAula);
router.post('/pagamentoHoraAula', verifyToken, pagamentoHoraAulaController.createPagamentoHoraAula);
router.get('/pagamentoHoraAula/:id', verifyToken, pagamentoHoraAulaController.getPagamentoHoraAulaById);
router.put('/pagamentoHoraAula/:id', verifyToken, pagamentoHoraAulaController.updatePagamentoHoraAulaById);
router.delete('/pagamentoHoraAula/:id', verifyToken, pagamentoHoraAulaController.deletePagamentoHoraAulaById);

// ROTAS PARA PAGAMENTOS DE DIÁRIA DE CURSO
router.get('/pagamentoDiariaDeCurso', verifyToken, pagamentoDiariaDeCursoController.getAllPagamentosDiariaDeCurso);
router.post('/pagamentoDiariaDeCurso', verifyToken, pagamentoDiariaDeCursoController.createPagamentoDiariaDeCurso);
router.get('/pagamentoDiariaDeCurso/:id', verifyToken, pagamentoDiariaDeCursoController.getPagamentoDiariaDeCursoById);
router.put('/pagamentoDiariaDeCurso/:id', verifyToken, pagamentoDiariaDeCursoController.updatePagamentoDiariaDeCursoById);
router.delete('/pagamentoDiariaDeCurso/:id', verifyToken, pagamentoDiariaDeCursoController.deletePagamentoDiariaDeCursoById);

// Rotas para compiladoPagamento
router.get('/compiladoPagamento', verifyToken, compiladoPagamentoController.getAllCompiladoPagamento);
router.post('/compiladoPagamento', verifyToken, compiladoPagamentoController.createCompiladoPagamento);
router.get('/compiladoPagamento/:id', verifyToken, compiladoPagamentoController.getCompiladoPagamentoById);
router.put('/compiladoPagamento/:id', verifyToken, compiladoPagamentoController.updateCompiladoPagamentoById);
router.delete('/compiladoPagamento/:id', verifyToken, compiladoPagamentoController.deleteCompiladoPagamentoById);


module.exports = router;
