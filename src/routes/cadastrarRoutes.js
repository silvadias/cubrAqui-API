const express   = require('express');
const router    = express.Router();

// controllers
const CadastrarUsuarioController
= require('../controllers/cadastrar/CadastrarUsuarioController');

const CadastrarEmpresaController
= require('../controllers/cadastrar/CadastrarEmpresaController');

const CadastrarVagaCoberturaController
= require('../controllers/cadastrar/CadastrarVagaCoberturaController');

const CadastrarEnderecoUsuarioController
= require('../controllers/cadastrar/CadastrarEnderecoUsuarioController') ;

const CadastrarEnderecoEmpresaController
= require('../controllers/cadastrar/CadastrarEnderecoEmpresaController');

const CadastrarClassificacaoProfissionalController
= require('../controllers/cadastrar/CadastrarClassificacaoProfissionalController');

const HabilidadeProfissionalUsuario
= require('../controllers/cadastrar/CadastrarHabilidadeUsuarioController');

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
    CadastrarUsuarioController.registrar

);

router.post(
    '/empresa',
    ValidarRegistroEmpresa,
    CadastrarEmpresaController.registrar

);

    router.post(
        '/cobertura',
        validarAcesso,
        validarCEP,
        validarGeolocalizacao,
        CadastrarVagaCoberturaController.registrar
    
    );

    router.post(
        '/endereco/usuario',
        validarAcesso,
        validarCEP,
        validarGeolocalizacao,
    CadastrarEnderecoUsuarioController.registrar

);

    router.post(
        '/endereco/empresa',
        validarAcesso,
        validarCEP,
        validarGeolocalizacao,
        CadastrarEnderecoEmpresaController.registrar
    
    );

    router.post(
        '/profissao',
        CadastrarClassificacaoProfissionalController.registrar
    
    );

    router.post(
        '/habilidade/usuario',
        HabilidadeProfissionalUsuario.registrar
    
    );


module.exports = router;