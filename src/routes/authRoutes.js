// ./routes/authRoutes.js ou ./routes/shiftRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Exemplo de rota pública (sem autenticação)
router.post('/login', AuthController.login);

// Exemplo de rota protegida (com autenticação)
router.get('/protected', authMiddleware, (req, res) => {
  return res.json({ message: 'Acesso autorizado' });
});

module.exports = router;
