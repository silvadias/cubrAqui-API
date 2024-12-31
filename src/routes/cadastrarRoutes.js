const express   = require('express');
const router    = express.Router();

// controllers
const CadastrarUsuarioController        = require('../controllers/CadastrarUsuarioController');
const CadastrarEmpresaController        = require('../controllers/CadastrarEmpresaController');


// middlewares
const ValidarRegistroUsuario            = require('../middlewares/validarRegistroUsuario');
const ValidarRegistroEmpresa            = require('../middlewares/validarRegistroEmpresa');

// rotas
router.post('/usuario', ValidarRegistroUsuario,CadastrarUsuarioController.registrar);
router.post('/empresa', ValidarRegistroEmpresa,CadastrarEmpresaController.registrar);



module.exports = router;