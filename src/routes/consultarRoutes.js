const express   = require('express');
const router    = express.Router();

const {buscarCEP} = require('../controllers/BuscarCEPController');

router.post('/cep', buscarCEP);

module.exports = router;
