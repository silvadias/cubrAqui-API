const express = require('express');
const debug = require('../../debug');
const controleAcesso = require('../middlewares/validarAcesso');

const router = express.Router();

router.get('/',debug);

module.exports = router;
