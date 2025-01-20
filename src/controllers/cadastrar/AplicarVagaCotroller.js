const { 
    VagaAplicada,
    Usuario,
    Empresa,
    VagaCobertura
 } = require("../../models/associations/vagaAplicadaAssociation");

 async function registrar(req, res) 
 {    
   const { 
 
    idCobertura,
    idUsuario,
    idEmpresa
     
   } = req.body;
 
   try {    
    
      const aplicarVaga = await VagaAplicada.create({

            idCobertura,
            idUsuario,
            idEmpresa,
 
     });
 
     return res.status(201).json({
       message: 'Aplicado na cobertura com sucesso. Aguarde o aceite!',
       Aplicacao: aplicarVaga 

     }); 
 
   } catch (error) {
 
     return res.status(500).json({
       message: 'Erro ao aplicar na cobertura',
       falha: error.message,
 
     });
   }
     
 }
 
 module.exports = {
    registrar,
    VagaAplicada,
    Usuario,
    Empresa,
    VagaCobertura
 };
