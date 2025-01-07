const express   = require('express');
const router    = express.Router();

// controllers
const CadastrarUsuarioController        = require('../controllers/CadastrarUsuarioController');
const CadastrarEmpresaController        = require('../controllers/CadastrarEmpresaController');
const CadastrarEnderecoController       = require('../controllers/CadastrarEnderecoController');
const CadastrarVagaCoberturaController  = require('../controllers/CadastrarVagaCoberturaController') 


// middlewares
const ValidarRegistroUsuario            = require('../middlewares/validarRegistroUsuario');
const ValidarRegistroEmpresa            = require('../middlewares/validarRegistroEmpresa');
const validarAcesso                     = require('../middlewares/validarAcesso');
const {validarCEP}                      = require('../middlewares/validarCEP');
const { validarGeolocalizacao }         = require('../middlewares/validarGeolocalizacao');

// rotas
router.post('/usuario', ValidarRegistroUsuario,CadastrarUsuarioController.registrar);
router.post('/empresa', ValidarRegistroEmpresa,CadastrarEmpresaController.registrar);
router.post('/endereco', validarAcesso, CadastrarEnderecoController.registrar);
router.post('/cobertura', validarAcesso, validarCEP,validarGeolocalizacao,CadastrarVagaCoberturaController.registrar);



module.exports = router;