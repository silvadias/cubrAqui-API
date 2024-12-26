const bcrypt = require('bcryptjs');

const Criptografia = {
  /**
   * Método para criptografar uma senha
   * @param {string} senha - A senha a ser criptografada.
   * @returns {Promise<string>} - A senha criptografada.
   */
  async gerar(senha) {
    try {
      const salto = await bcrypt.genSalt(10); // Gera o salt com custo de 10 rounds
      const senhaCriptografada = await bcrypt.hash(senha, salto); // Criptografa a senha com o salt
      return senhaCriptografada;
    } catch (erro) {
      console.error('❌ Erro ao criptografar senha:', erro);
      throw new Error('Erro ao criptografar senha');
    }
  },

  /**
   * Método para comparar uma senha com uma senha criptografada
   * @param {string} senha - A senha fornecida.
   * @param {string} senhaCriptografada - A senha criptografada armazenada.
   * @returns {Promise<boolean>} - Retorna verdadeiro se as senhas coincidirem.
   */
  async comparar(senha, senhaCriptografada) {
    try {
      return await bcrypt.compare(senha, senhaCriptografada); // Compara a senha com a senha criptografada
    } catch (erro) {
      console.error('❌ Erro ao comparar senha:', erro);
      throw new Error('Erro ao comparar senha');
    }
  }
};

module.exports = Criptografia;
