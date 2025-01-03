module.exports = (req, res) => {
    
     //const usuario = req.usuario; // Acessando o usuário do middleware
    if(req.usuario.id === 2){
        res.send('Realmente é o número 2 cara');
    }
    return res.json({ resposta: usuario });
};
  