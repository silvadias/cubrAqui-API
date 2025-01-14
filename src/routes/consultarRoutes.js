const express   = require('express');
const router    = express.Router();

const {buscarCEP} = require('../controllers/BuscarCEPController');
const acessarHabilidadeUsuario
=require('../controllers/consultar/consultarHabilidadeUsuarioController');

router.post('/cep', buscarCEP);
router.post('/habilidade/usuario',acessarHabilidadeUsuario.pegarHabilidadeUsuario);

module.exports = router;
