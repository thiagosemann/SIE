const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const pgeController = require('./controllers/pgeController'); // Importe o controlador da PGE

const verifyToken = require('./middlewares/authMiddleware'); // Adicione esta linha para importar o middleware

// ROTAS USERS
router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/user/:id', verifyToken, usersController.getUser);
router.delete('/users/:id', verifyToken, usersController.deleteTask);
router.put('/users/:id', verifyToken, usersController.updateTask);
// ROTA LOGIN
router.post('/login', usersController.loginUser);

// ROTA PGE
router.get('/pge/populate-database', pgeController.fetchDataAndSaveToDatabase);
router.get('/pge', verifyToken, pgeController.getAllPge);

module.exports = router;