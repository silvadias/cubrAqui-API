const express = require('express');
const app = express();

//rotas
const userRoutes = require('./routes/userRoutes');
const acessoRoutes = require('./routes/acessoRoutes');
const registrarUsuarioRoutes = require('./routes/registrarUsuarioRoutes');
const debugRouter = require('./routes/debugRoutes'); 



//middlewares
const errorHandler = require('./middlewares/errorHandler'); // Middleware para tratar erro
const verificarAcesso = require('./middlewares/verificarAcesso'); // Middleware para verificar acesso de usuarios.
app.use(express.json()); // Middleware para tratar JSON






// Rotas
app.use('/',debugRouter); // arquivo e rota para debugar e entender código.
app.use('/api/acesso', acessoRoutes);
app.use('/api/users',userRoutes);
app.use('/api/cadastro', registrarUsuarioRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
