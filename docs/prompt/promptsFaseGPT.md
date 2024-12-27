📝 Fase 1: Cadastro e Gestão de Serviços
Prompt 1:
"Crie um arquivo de controller para gerenciar os serviços oferecidos pelas empresas. Ele deve conter métodos para cadastrar um serviço, listar serviços disponíveis e detalhar um serviço específico. Inclua validações para garantir que todos os campos obrigatórios (local, horário, habilidades necessárias, descrição POP) estejam preenchidos. Utilize middleware de autenticação para garantir que apenas empresas cadastradas possam criar serviços."

Prompt 2:
*"Crie rotas para o gerenciamento de serviços. As rotas devem incluir:

POST /services: Cadastrar um serviço.
GET /services: Listar serviços disponíveis.
GET /services/:id: Detalhar um serviço específico.
Inclua middleware de autenticação para proteger essas rotas."*
Prompt 3:
"Crie um arquivo de modelo (model) para os serviços, definindo os campos necessários (local, horário, habilidades, descrição POP, status, empresa associada). Utilize um banco de dados relacional (como PostgreSQL) para armazenar essas informações."

📝 Fase 2: Sistema de Notificação de Vagas para Profissionais
Prompt 4:
"Desenvolva a lógica para notificar profissionais sobre novas vagas compatíveis com suas habilidades e localização. Utilize WebSockets para notificações em tempo real. Implemente critérios para seleção de profissionais, como proximidade, avaliações e carimbos de habilidade."

Prompt 5:
"Crie um controller para gerenciar a aceitação de serviços pelos profissionais. Deve incluir métodos para aceitar, recusar e visualizar detalhes de uma vaga."

Prompt 6:
*"Crie rotas para aceitação de serviços:

POST /services/:id/accept: Profissional aceita uma vaga.
POST /services/:id/decline: Profissional recusa uma vaga.
Inclua validações para garantir que apenas profissionais com habilidades compatíveis possam aceitar uma vaga."*
📝 Fase 3: Pré-Autorização e Pagamento
Prompt 7:
"Implemente um controller para gerenciar pagamentos pré-autorizados. Integre um gateway de pagamento (ex: Stripe) para bloquear o valor assim que o profissional aceitar a vaga. Crie métodos para confirmar e cancelar pagamentos."

Prompt 8:
*"Crie rotas para pagamentos:

POST /payments/authorize: Pré-autorizar pagamento.
POST /payments/confirm: Confirmar pagamento após conclusão do serviço.
POST /payments/cancel: Cancelar pagamento em caso de falha.
As rotas devem estar protegidas por middleware de autenticação."*
📝 Fase 4: Check-in e Execução do Serviço
Prompt 9:
"Desenvolva a lógica de check-in/check-out do profissional no local do serviço usando geolocalização. Utilize APIs como Google Maps para validação."

Prompt 10:
*"Crie rotas para check-in/check-out:

POST /services/:id/check-in: Profissional faz check-in.
POST /services/:id/check-out: Profissional finaliza serviço."*
📝 Fase 5: Avaliação e Feedback
Prompt 11:
"Crie um controller para gerenciar avaliações. Permita que tanto a empresa quanto o profissional possam se avaliar mutuamente após a conclusão do serviço."

Prompt 12:
*"Crie rotas para avaliações:

POST /services/:id/review: Realizar avaliação.
GET /reviews/:userId: Listar avaliações de um usuário específico."*
📝 Fase 6: Penalidades e Multas
Prompt 13:
"Implemente a lógica para aplicação de penalidades caso o profissional descumpra as regras (ex: ausência, desistência após 15 minutos). Crie métodos para aplicar multas automáticas e ajustar pontuações no perfil."

Prompt 14:
*"Crie rotas para penalidades:

POST /services/:id/penalty: Aplicar multa ou penalidade.
GET /users/:id/penalties: Listar penalidades de um usuário."*
📝 Fase 7: Agendamento de Demandas Futuras
Prompt 15:
"Desenvolva a lógica para agendamento de vagas futuras. Permita que empresas agendem faltas programadas e que profissionais visualizem e aceitem esses compromissos com antecedência."

Prompt 16:
*"Crie rotas para agendamentos:

POST /schedules: Criar agendamento de vaga futura.
GET /schedules: Listar vagas agendadas.
POST /schedules/:id/accept: Profissional aceita compromisso."*
📝 Fase 8: Sistema de Habilidades e Certificações
Prompt 17:
"Crie um controller para gerenciar habilidades e certificações. Permita que profissionais adicionem habilidades e anexem certificados validados por parceiros ou cursos externos."

Prompt 18:
*"Crie rotas para habilidades:

POST /skills: Adicionar habilidade.
GET /skills: Listar habilidades de um profissional.
POST /skills/:id/validate: Validar habilidade com certificado."*
📝 Fase 9: Relatórios e Analytics
Prompt 19:
"Desenvolva um sistema de relatórios e analytics para empresas acompanharem métricas importantes, como número de vagas preenchidas, desempenho dos profissionais e gastos com temporários."

Prompt 20:
*"Crie rotas para relatórios:

GET /reports/services: Relatório de serviços realizados.
GET /reports/financial: Relatório financeiro."*
📝 Fase 10: Finalização e Testes
Prompt 21:
"Crie testes unitários e de integração para todas as rotas e controllers criados, utilizando frameworks como Jest ou Mocha. Certifique-se de testar fluxos críticos, como pagamentos, notificações e check-ins."

Prompt 22:
"Implemente documentação completa da API com Swagger ou outra ferramenta de documentação. Inclua exemplos claros de requisições e respostas para cada rota."

🛠️ Observações Finais:
Copie e cole cada prompt conforme avançar na aplicação.
Mantenha um histórico para garantir continuidade entre as etapas.
Se precisar ajustar algo em uma etapa anterior, informe para que possamos alinhar o fluxo.
Pronto para começar a primeira etapa? 🚀😊