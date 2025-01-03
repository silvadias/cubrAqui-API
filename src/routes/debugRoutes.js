const express = require('express');
const debug = require('../../debug');

//const validarAcesso = require('../middlewares/validarAcesso');

const router = express.Router();

router.get('/', debug);

module.exports = router;
