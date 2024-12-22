module.exports = {
    authenticateUser(email, password) {
      return email === 'admin@example.com' && password === 'admin123';
    }
  };
  