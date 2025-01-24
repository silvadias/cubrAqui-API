const express   = require('express');
const router    = express.Router();

// controllers
const UsuarioController
= require('../controllers/cadastrar/UsuarioController');

const EmpresaController
= require('../controllers/cadastrar/EmpresaController');

const VagaCoberturaController
= require('../controllers/cadastrar/VagaCoberturaController');

const EnderecoUsuarioController
= require('../controllers/cadastrar/EnderecoUsuarioController') ;

const EnderecoEmpresaController
= require('../controllers/cadastrar/EnderecoEmpresaController');

const ClassificacaoProfissionalController
= require('../controllers/cadastrar/ClassificacaoProfissionalController');

const HabilidadeProfissionalUsuario
= require('../controllers/cadastrar/HabilidadeUsuarioController');

const ContratarCobertura 
= require('../controllers/cadastrar/FecharContratoController');

const AceitarUsuarioCobertura
=require('../controllers/cadastrar/LiberarAceiteUsuarioController');



const AplicarVagaController = require('../controllers/cadastrar/AplicarVagaCotroller');
// middlewares
const ValidarRegistroUsuario            = require('../middlewares/validarRegistroUsuario');
const ValidarRegistroEmpresa            = require('../middlewares/validarRegistroEmpresa');
const validarAcesso                     = require('../middlewares/validarAcesso');
const {validarCEP}                      = require('../middlewares/validarCEP');
const { validarGeolocalizacao }         = require('../middlewares/validarGeolocalizacao');

// rotas
router.post(
    '/usuario',
    ValidarRegistroUsuario,
    UsuarioController.registrar

);

router.post(
    '/empresa',
    ValidarRegistroEmpresa,
    EmpresaController.registrar

);

    router.post(
        '/cobertura',
        validarAcesso,
        validarCEP,
        validarGeolocalizacao,
        VagaCoberturaController.registrar
    
    );

    router.post(
        '/endereco/usuario',
        validarAcesso,
        validarCEP,
        validarGeolocalizacao,
    EnderecoUsuarioController.registrar

);

    router.post(
        '/endereco/empresa',
        validarAcesso,
        validarCEP,
        validarGeolocalizacao,
        EnderecoEmpresaController.registrar
    
    );

    router.post(
        '/profissao',
        ClassificacaoProfissionalController.registrar
    
    );

    router.post(
        '/habilidade/usuario',
        HabilidadeProfissionalUsuario.registrar
    
    );

    router.post(
        '/cobertura/aplicar',
        AplicarVagaController.registrar
    );

    router.post(
        '/cobertura/contratar', // verificar possibilidade de usar contratos/fechar.
        ContratarCobertura.fecharContrato
    );

    router.post('/cobertura/aceite',AceitarUsuarioCobertura.aceitarUsuarioCobertura)




module.exports = router;