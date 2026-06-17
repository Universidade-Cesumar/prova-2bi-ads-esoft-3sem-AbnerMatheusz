# Almoxarifado — Sistema de Controle de Estoque

## Sprint 1 — Fundação, API e Inventário

### Objetivo

Construir a base do sistema de controle de almoxarifado: a interface inicial, o formulário de cadastro e a tabela de listagem consumindo a MockAPI (nuvem).

### Tecnologias Utilizadas

- HTML5 — estrutura semântica da aplicação
- Bootstrap 5.3 — estilização via CDN
- CSS3 — customizações complementares em style.css
- JavaScript (Vanilla) — lógica da aplicação em main.js
- MockAPI — API REST em nuvem para persistência dos dados

### Funcionalidades Entregues

#### Interface

- Navbar com contador de itens em estoque em tempo real
- Formulário de cadastro com campos de nome e quantidade
- Tabela de listagem de materiais com feedback visual de loading e estado vazio

#### Conexão GET

- Ao carregar a página, o sistema faz uma requisição GET para a MockAPI
- Os materiais retornados são renderizados dinamicamente na tabela #lista-materiais
- Exibe spinner de carregamento e mensagem de erro em caso de falha

#### Conexão POST

- Ao clicar em #btn-cadastrar, os dados do formulário são enviados via POST para a MockAPI
- Validação dos campos antes do envio (nome obrigatório, quantidade ≥ 0)
- Feedback visual de sucesso ou erro após a requisição
- A tabela é recarregada automaticamente após o cadastro

### Contrato Técnico — IDs Obrigatórios (Sprint 1)

| Elemento | ID | Descrição |
|---|---|---|
| Input de nome | input-nome | Campo de texto para o nome do material |
| Input de quantidade | input-quantidade | Campo numérico para a quantidade |
| Botão de cadastrar | btn-cadastrar | Dispara o POST para a API |
| Tabela de materiais | lista-materiais | tbody populado dinamicamente pelo GET |

---

## Sprint 2 — Regras de Negócio e Saídas

### Objetivo

Criar o módulo de retirada (baixa de estoque) e de exclusão de materiais, garantindo que o sistema não aceite números negativos ou maiores que o estoque disponível.

### Funcionalidades Entregues

#### Validação de Regras de Negócio

- Função `validarRetirada(estoqueAtual, quantidadeRetirada)` que retorna `true` ou `false` conforme a operação seja válida
- Bloqueia retirada de valores negativos
- Bloqueia retirada de valores maiores que o estoque disponível
- Bloqueia retirada de valor zero
- Bloqueia retirada com campo vazio (correção de um bug encontrado em teste manual, onde um campo vazio gerava `NaN` e zerava o estoque indevidamente)

#### Conexão PUT (Baixa de Estoque)

- Cada item da tabela possui um botão com a classe `btn-baixar`
- Ao clicar, o sistema valida a quantidade informada no campo `input-retirada` usando `validarRetirada`
- Se válida, envia uma requisição PUT para a MockAPI atualizando a quantidade do item
- A tabela é recarregada automaticamente após a baixa
- Feedback visual de sucesso ou erro é exibido ao usuário

#### Conexão DELETE (Exclusão de Material)

- Cada item da tabela possui um botão com a classe `btn-excluir`
- Ao clicar, é exibida uma confirmação antes da exclusão
- Se confirmado, envia uma requisição DELETE para a MockAPI removendo o item
- A tabela é recarregada automaticamente após a exclusão

### Contrato Técnico — IDs e Classes Obrigatórios (Sprint 2)

| Elemento | Identificador | Descrição |
|---|---|---|
| Input de retirada | input-retirada | Campo numérico para a quantidade a retirar |
| Botão de baixa | btn-baixar (classe) | Dispara o PUT na MockAPI; presente em cada linha da tabela |
| Botão de exclusão | btn-excluir (classe) | Dispara o DELETE na MockAPI; presente em cada linha da tabela |
| Função de validação | validarRetirada | Função pura que valida a operação de retirada |

---

## Tecnologias Utilizadas (Geral)

- HTML5 — estrutura semântica da aplicação
- Bootstrap 5.3 — estilização via CDN
- CSS3 — customizações complementares em style.css
- JavaScript (Vanilla) — lógica da aplicação em main.js
- MockAPI — API REST em nuvem para persistência dos dados

## Configuração da API

A URL do endpoint está definida no topo do main.js:

```js
const API_URL = "https://6a29e320f59cb8f65f1db3ab.mockapi.io/api/v1/materiais";
```

O recurso materiais foi criado no MockAPI com o seguinte schema:

| Campo | Tipo |
|---|---|
| id | Object ID (gerado automaticamente) |
| name | String |
| quantidade | Number |

## Como Executar

1. Clone ou baixe os arquivos do projeto
2. Abra o index.html em um servidor local (ex: Live Server no VS Code)
3. O sistema carregará os materiais automaticamente da MockAPI