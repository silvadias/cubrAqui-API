const express = require('express');
const AdicionarUsuarioController = require('../controllers/AdicionarUsuarioController');
const ValidarUsuario = require('../middlewares/validarUsuario');

const router = express.Router();

router.post('/registrar', ValidarUsuario,AdicionarUsuarioController.registrar);


module.exports = router;
