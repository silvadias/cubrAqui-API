const app = require('./app');
const db = require('./config/db');
const { PORT } = require('./config/env');

db.authenticate()
  .then(() => console.log('✅ Conectado ao banco de dados MySQL!'))
  .catch(err => console.error('❌ Erro ao conectar ao MySQL:', err));

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Erro ao sincronizar banco:', err));
