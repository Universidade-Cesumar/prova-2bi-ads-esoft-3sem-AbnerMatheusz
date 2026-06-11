 Almoxarifado  Sistema de Controle de Estoque

Sprint 1 — Fundação, API e Inventário

Objetivo

Construir a base do sistema de controle de almoxarifado: a interface inicial, o formulário de cadastro e a tabela de listagem consumindo a MockAPI (nuvem).


Tecnologias Utilizadas


HTML5 — estrutura semântica da aplicação
Bootstrap 5.3 — estilização via CDN
CSS3 — customizações complementares em style.css
JavaScript (Vanilla) — lógica da aplicação em main.js
MockAPI — API REST em nuvem para persistência dos dados


Funcionalidades Entregues

 Interface


Navbar com contador de itens em estoque em tempo real
Formulário de cadastro com campos de nome e quantidade
Tabela de listagem de materiais com feedback visual de loading e estado vazio


 Conexão GET


Ao carregar a página, o sistema faz uma requisição GET para a MockAPI
Os materiais retornados são renderizados dinamicamente na tabela #lista-materiais
Exibe spinner de carregamento e mensagem de erro em caso de falha


 Conexão POST


Ao clicar em #btn-cadastrar, os dados do formulário são enviados via POST para a MockAPI
Validação dos campos antes do envio (nome obrigatório, quantidade ≥ 0)
Feedback visual de sucesso ou erro após a requisição
A tabela é recarregada automaticamente após o cadastro



Contrato Técnico — IDs Obrigatórios

ElementoIDDescriçãoInput de nomeinput-nomeCampo de texto para o nome do materialInput de quantidadeinput-quantidadeCampo numérico para a quantidadeBotão de cadastrarbtn-cadastrarDispara o POST para a APITabela de materiaislista-materiais<tbody> populado dinamicamente pelo GET


Configuração da API

A URL do endpoint está definida no topo do main.js:

jsconst API_URL = "https://6a29e320f59cb8f65f1db3ab.mockapi.io/api/v1/materiais";

O recurso materiais foi criado no MockAPI com o seguinte schema:

CampoTipoidObject ID (gerado automaticamente)nameStringquantidadeNumber


Como Executar


Clone ou baixe os arquivos do projeto
Abra o index.html em um servidor local (ex: Live Server no VS Code)
O sistema carregará os materiais automaticamente da MockAPI