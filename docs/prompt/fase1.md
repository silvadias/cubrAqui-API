📝 Fase 1: Cadastro e Gestão de Serviços
Prompt 1:
"Crie um arquivo de controller para gerenciar os serviços oferecidos pelas empresas. Ele deve conter métodos para cadastrar um serviço, listar serviços disponíveis e detalhar um serviço específico. Inclua validações para garantir que todos os campos obrigatórios (local, horário, habilidades necessárias, descrição POP) estejam preenchidos. Utilize middleware de autenticação para garantir que apenas empresas cadastradas possam criar serviços."


cadastro de empresas. tabela sedes
                     
Crie uma model completa para cadastro da empresa, usando clean code, retire acentos e circunflexos, 
utilize clean code utilize os dados 

id 
CNPJ: Identificador único da empresa.
Razão Social: Nome legal registrado.
Nome Fantasia: Nome comercial usado publicamente.
E-mail Corporativo: E-mail principal da maior hierarquia
matricialidade
subordinacao
Data de Cadastro: Data do registro no sistema.
senha

use a model usuario como exemplo do que tenho 



cadastro de filiais
elefone Comercial: Contato direto.
Área de Atuação: Exemplo: Indústria, Serviços, etc.
Status da Empresa: Ativa/Inativa.
ndereço: Local físico da sede da empresa.

endereço
telefone
email corporativo


7. Resumo das Relações
Sede ↔ Filiais: company_relationships
Usuário ↔ Empresa: company_users
Usuário ↔ Recursos: user_resource_permissions
Empresa ↔ Recursos: company_resources
Usuário ↔ Serviços: user_service_permissions
Empresa ↔ Serviços: company_services
Papéis ↔ Permissões: role_permissions
Usuário ↔ Papéis: Associado na tabela company_users via campo role.
Essa estrutura cobre:
✅ Hierarquia entre sedes e filiais.
✅ Permissões específicas por usuário e recurso.
✅ Flexibilidade para bloquear/permitir serviços por filial.
✅ Definição de usuários com permissões únicas em recursos específicos.
✅ Histórico de auditoria para rastrear mudanças importantes.