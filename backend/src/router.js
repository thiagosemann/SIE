const express = require('express');

const router = express.Router();

const usersController = require('./controllers/usersController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');
const verifyToken = require('./middlewares/authMiddleware'); // Adicione esta linha para importar o middleware


router.get('/users', verifyToken, usersController.getAllUsers);
router.get('/user/:id', verifyToken, usersController.getUser);
router.post('/users', verifyToken, tasksMiddleware.validateUser, usersController.createUser);
router.delete('/users/:id', verifyToken, usersController.deleteTask);
router.put('/users/:id', verifyToken, usersController.updateTask);
router.post('/login', usersController.loginUser);

module.exports = router;