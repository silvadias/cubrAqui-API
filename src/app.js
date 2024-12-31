const express   = require('express');
const app       = express();

//impotação de rotas
const userRoutes            = require('./routes/    userRoutes');
const acessoRoutes          = require('./routes/    acessoRoutes');
const registrarRoutes       = require('./routes/    registrarRoutes');
const debugRouter           = require('./routes/    debugRoutes');

//importação de middlewares
const errorHandler          = require('./middlewares/   rrorHandler');    // Middleware para tratar erro
const verificarAcesso       = require('./middlewares/   verificarAcesso'); // Middleware para verificar acesso de usuarios.

// Middleware para analisar JSON no corpo das requisições
app.use(express.json());


// Rotas
app.use('/',                debugRouter);           // arquivo e rota para debugar e entender código.
app.use('/api/acesso',      acessoRoutes);          // Rota de Acesso e autorização.
app.use('/api/users',       userRoutes);            // Retorna todos os usuários.
app.use('/api/cadastro',    registrarRoutes);       // Novos registros: usuarios e empresas.


// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
