const express   = require('express');
const app       = express();

//impotação de rotas
const userRoutes            = require('./routes/userRoutes');
const acessoRoutes          = require('./routes/acessoRoutes');
const cadastrarRoutes       = require('./routes/cadastrarRoutes');
const debugRouter           = require('./routes/debugRoutes');
const consultar             = require('./routes/consultarRoutes');
const alterar               = require('./routes/alterarRoutes');

//importação de middlewares
const errorHandler          = require('./middlewares/errorHandler');    // Middleware para tratar erro
const validarrAcesso       = require('./middlewares/validarAcesso'); // Middleware para verificar acesso de usuarios.

// Middleware para analisar JSON no corpo das requisições
app.use(express.json());


// Rotas
app.use('/',                debugRouter);           // arquivo e rota para debugar e entender código.
app.use('/api/acessar',      acessoRoutes);          // Rota de Acesso e autorização.
app.use('/api/usuario',       userRoutes);            // Retorna todos os usuários.
app.use('/api/cadastrar',    cadastrarRoutes);       // Novos registros: usuarios e empresas.
app.use('/api/consultar',   consultar);
app.use('/api/alterar', validarrAcesso,alterar);


// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
