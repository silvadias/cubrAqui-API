const express   = require('express');
const router    = express.Router();

const {buscarCEP} 
= require('../controllers/BuscarCEPController');

const HabilidadeUsuario
=require('../controllers/consultar/HabilidadeUsuarioController');

const ListaUsuarioController
=require('../controllers/consultar/ListaUsuarioController');

const CoberturaEspecialista
=require('../controllers/consultar/UsuarioEspecialistaController');

const VagaCobertura
=require('../controllers/consultar/VagaCoberturaController');

const ListaEnderecoUsuario = 
require('../controllers/consultar/ListaEnderecoUsuario');


router.post('/cep',                     buscarCEP);
router.post('/habilidade/usuario',      HabilidadeUsuario.pegarHabilidadeUsuario);
router.post('/cobertura/especialista',  CoberturaEspecialista.pegarCoberturaEspecialista);
router.get('/lista/usuario',            ListaUsuarioController.getAllUsers);
router.get('/cobertura',                VagaCobertura)
router.get('/endereco/usuario',         ListaEnderecoUsuario);


module.exports = router;
