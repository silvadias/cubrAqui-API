const express = require('express');
const userRoutes = require('./routes/userRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const homeRoutes = require('./routes/homeRoutes'); // Nome correto

const app = express();

// Middleware para tratar JSON
app.use(express.json());

// Rotas
app.use('/', homeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shifts', shiftRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
