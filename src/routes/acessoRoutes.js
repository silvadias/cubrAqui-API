const express   = require('express');
const router    = express.Router();

const AutorizarUsuarioController = require('../controllers/AutorizarUsuarioController');

router.post('/usuario', AutorizarUsuarioController.autenticarUsuario);

module.exports = router;
