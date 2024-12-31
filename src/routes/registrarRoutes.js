const express   = require('express');
const router    = express.Router();

// controllers
const RegistrarUsuarioController        = require('../controllers/RegistrarUsuarioController');
const RegistrarEmpresaController        = require('../controllers/RegistrarEmpresaController');

// middlewares
const ValidarRegistroUsuario            = require('../middlewares/validarRegistroUsuario');
const ValidarRegistroEmpresa            = require('../middlewares/validarRegistroEmpresa');

// rotas
router.post('/usuario', ValidarRegistroUsuario,RegistrarUsuarioController.registrar);
router.post('/empresa', ValidarRegistroEmpresa,RegistrarEmpresaController.registrar);


module.exports = router;