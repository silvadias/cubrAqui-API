const express   = require('express');
const router    = express.Router();

const {buscarCEP} 
= require('../controllers/BuscarCEPController');

const HabilidadeUsuario
= require('../controllers/consultar/HabilidadeUsuarioController');

const ListaUsuarioController
= require('../controllers/consultar/ListaUsuarioController');

const CoberturaCompativelController
= require('../controllers/consultar/CoberturaCompativelController');

const VagaCobertura
= require('../controllers/consultar/VagaCoberturaController');

const ListaEnderecoUsuario 
= require('../controllers/consultar/ListaEnderecoUsuario');

const CoberturaAplicada 
= require('../controllers/consultar/VagasAplicadas.Controller');

const PainelContratosUsuario
=require('../controllers/consultar/painelContratosUsuarioController');



router.post('/cep',                     buscarCEP);
router.post('/habilidade/usuario',      HabilidadeUsuario.pegarHabilidadeUsuario);
router.post('/cobertura/compativel',    CoberturaCompativelController.pegarCoberturaCompativel);
router.get('/lista/usuario',            ListaUsuarioController.getAllUsers);
router.get('/cobertura',                VagaCobertura)
router.get('/endereco/usuario',         ListaEnderecoUsuario);
router.get('/cobertura/aplicada',       CoberturaAplicada.vagasAplicadas);
router.get('/contratos/usuario',PainelContratosUsuario.pegarContratosUsuario)


module.exports = router;
