module.exports = (err, req, res, next) => {
  // Logando o erro no console
  console.error('❌ Erro no servidor:', err.stack || err.message);

  // Retornando a resposta com os detalhes do erro
  res.status(err.status || 500).json({
    message: err.message || 'Erro interno no servidor',  // Mensagem de erro
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Exibe stack trace se for desenvolvimento
    error: err, // Detalhes do erro, útil no desenvolvimento
  });

  next();  // Chama o próximo middleware, caso necessário
};

