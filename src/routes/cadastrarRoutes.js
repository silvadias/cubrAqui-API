const express   = require('express');
const router    = express.Router();

// controllers
const CadastrarUsuarioController
= require('../controllers/CadastrarUsuarioController');

const CadastrarEmpresaController
= require('../controllers/CadastrarEmpresaController');

const CadastrarVagaCoberturaController
= require('../controllers/CadastrarVagaCoberturaController');

const CadastrarEnderecoUsuarioController
= require('../controllers/CadastrarEnderecoUsuarioController') ;

const CadastrarEnderecoEmpresaController
= require('../controllers/CadastrarEnderecoEmpresaController');


// middlewares
const ValidarRegistroUsuario            = require('../middlewares/validarRegistroUsuario');
const ValidarRegistroEmpresa            = require('../middlewares/validarRegistroEmpresa');
const validarAcesso                     = require('../middlewares/validarAcesso');
const {validarCEP}                      = require('../middlewares/validarCEP');
const { validarGeolocalizacao }         = require('../middlewares/validarGeolocalizacao');

// rotas
router.post('/usuario', ValidarRegistroUsuario,CadastrarUsuarioController.registrar);
router.post('/empresa', ValidarRegistroEmpresa,CadastrarEmpresaController.registrar);
router.post('/cobertura', validarAcesso, validarCEP,validarGeolocalizacao,CadastrarVagaCoberturaController.registrar);
router.post('/endereco/usuario', validarAcesso, validarCEP, validarGeolocalizacao,CadastrarEnderecoUsuarioController.registrar);
router.post('/endereco/empresa', validarAcesso, validarCEP, validarGeolocalizacao,CadastrarEnderecoEmpresaController.registrar);



module.exports = router;