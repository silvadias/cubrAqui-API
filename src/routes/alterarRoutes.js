const express = require('express');
const router = express.Router();
const AlterarSenhaController = require('../controllers/AlterarSenhaController');

router.patch('/senha',AlterarSenhaController);

module.exports = router;