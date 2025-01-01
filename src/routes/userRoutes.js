const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/listar', UserController.getAllUsers);

module.exports = router;
