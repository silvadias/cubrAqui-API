
module.exports = (req, res, next) => {
    const { cpf, fullName, email, password } = req.body;
  
    if (!cpf || !fullName || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
  
    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ message: 'CPF deve conter exatamente 11 números' });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
    }
  
    next();
  };
  