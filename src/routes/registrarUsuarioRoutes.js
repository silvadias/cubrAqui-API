const express = require('express');
const RegistrarUsuarioController = require('../controllers/RegistrarUsuarioController');
const ValidarRegistroUsuario = require('../middlewares/validarRegistroUsuario');

const router = express.Router();

router.post('/registrar-usuario', ValidarRegistroUsuario,RegistrarUsuarioController.registrar);


module.exports = router;
