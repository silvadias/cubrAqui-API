const express = require('express');
const NewUserController = require('../controllers/NewUserController');
//const validateUser = require('../middlewares/validateUser'); // Validação opcional

const router = express.Router();

// Rota para criar um novo usuário
//router.post('/register', validateUser, NewUserController.register);
router.post('/register', NewUserController.register);


module.exports = router;
