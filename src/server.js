require('dotenv').config(); // Carregar variáveis de ambiente do .env

const app = require('./app'); // Importa a configuração do Express
const db = require('./config/db'); // Importa a configuração do banco de dados
const { PORT } = require('./config/env'); // Importa a porta definida

// Função assíncrona para inicializar o servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await db.authenticate();
    console.log('✅ Conectado ao banco de dados MySQL!');

    // Sincronizar modelos com o banco de dados
    await db.sync();
    console.log('✅ Modelos sincronizados com sucesso!');

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error.message);
    process.exit(1); // Finaliza o processo em caso de erro grave
  }
};

// Inicia o servidor
startServer();
