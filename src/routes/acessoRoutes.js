const express = require('express');
const AutorizarUsuarioController = require('../controllers/AutorizarUsuarioController');

const router = express.Router();

router.post('/login', AutorizarUsuarioController.autenticarUsuario);

module.exports = router;
