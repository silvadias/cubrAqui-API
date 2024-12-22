const express = require('express');
const HomeController = require('../controllers/HomeController');

const router = express.Router();

// Definindo a rota principal
router.get('/', HomeController.home);

module.exports = router;
