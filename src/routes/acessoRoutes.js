const express   = require('express');
const router    = express.Router();

const AutorizarUsuarioController 
= require('../controllers/AutorizarUsuarioController');

const AutorizarEmpresaController 
= require('../controllers/AutorizarEmpresaController');

router.post('/usuario', AutorizarUsuarioController.autenticarUsuario);
router.post('/empresa', AutorizarEmpresaController.autenticarEmpresa);

module.exports = router;
