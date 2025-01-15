const express   = require('express');
const router    = express.Router();

const {buscarCEP} = require('../controllers/BuscarCEPController');

const acessarHabilidadeUsuario
=require('../controllers/consultar/consultarHabilidadeUsuarioController');

const ConsultarListaUsuarioController
=require('../controllers/consultar/ConsultarListaUsuarioController');

const ConsultarCoberturaEspecialista
=require('../controllers/consultar/ConsultarCoberturaEspecialistaUsuarioController');

router.post('/cep', buscarCEP);
router.post('/habilidade/usuario',acessarHabilidadeUsuario.pegarHabilidadeUsuario);
router.get('/lista/usuario', ConsultarListaUsuarioController.getAllUsers);


router.post('/cobertura/especialista',ConsultarCoberturaEspecialista.pegarCoberturaEspecialista);

module.exports = router;
