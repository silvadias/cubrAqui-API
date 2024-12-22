require('dotenv').config(); // Carregar variáveis de ambiente do .env
const app = require('./app');
const db = require('./config/db'); // Importa a configuração do banco de dados
const { PORT } = require('./config/env');

// Conectar ao banco de dados e iniciar o servidor
db.authenticate()
  .then(() => console.log('✅ Conectado ao banco de dados MySQL!'))
  .catch(err => console.error('❌ Erro ao conectar ao MySQL:', err));

db.sync() // Sincroniza o banco (cria as tabelas)
  .then(() => {
    // Inicia o servidor na porta definida
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Erro ao sincronizar banco:', err));
