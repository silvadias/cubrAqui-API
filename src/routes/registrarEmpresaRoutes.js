const express = require('express');
const RegistrarEmpresaController = require('../controllers/RegistrarEmpresaController');
const ValidarRegistroEmpresa = require('../middlewares/validarRegistroEmpresa');

const router = express.Router();

router.post('/registrar-empresa', ValidarRegistroEmpresa,RegistrarEmpresaController.registrar);


module.exports = router;
