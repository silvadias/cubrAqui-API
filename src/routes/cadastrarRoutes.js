const express   = require('express');
const router    = express.Router();

// controllers
const CadastrarUsuarioController        = require('../controllers/CadastrarUsuarioController');
const CadastrarEmpresaController        = require('../controllers/CadastrarEmpresaController');
const CadastrarEnderecoController        = require('../controllers/CadastrarEnderecoController');


// middlewares
const ValidarRegistroUsuario            = require('../middlewares/validarRegistroUsuario');
const ValidarRegistroEmpresa            = require('../middlewares/validarRegistroEmpresa');
const validarAcesso                     = require('../middlewares/validarAcesso');

// rotas
router.post('/usuario', ValidarRegistroUsuario,CadastrarUsuarioController.registrar);
router.post('/empresa', ValidarRegistroEmpresa,CadastrarEmpresaController.registrar);
router.post('/endereco', validarAcesso, CadastrarEnderecoController.registrar);



module.exports = router;