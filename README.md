# Almoxarifado: Sistema de Controle de Estoque

Projeto em producao: https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-AbnerMatheusz/

## Sprint 1: Fundacao, API e Inventario

### Objetivo

Construir a base do sistema de controle de almoxarifado: a interface inicial, o formulario de cadastro e a tabela de listagem consumindo a MockAPI (nuvem).

### Tecnologias Utilizadas

- HTML5: estrutura semantica da aplicacao
- Bootstrap 5.3: estilizacao via CDN
- CSS3: customizacoes complementares em style.css
- JavaScript (Vanilla): logica da aplicacao em main.js
- MockAPI: API REST em nuvem para persistencia dos dados

### Funcionalidades Entregues

#### Interface

- Navbar com contador de itens em estoque em tempo real
- Formulario de cadastro com campos de nome e quantidade
- Tabela de listagem de materiais com feedback visual de loading e estado vazio

#### Conexao GET

- Ao carregar a pagina, o sistema faz uma requisicao GET para a MockAPI
- Os materiais retornados sao renderizados dinamicamente na tabela #lista-materiais
- Exibe spinner de carregamento e mensagem de erro em caso de falha

#### Conexao POST

- Ao clicar em #btn-cadastrar, os dados do formulario sao enviados via POST para a MockAPI
- Validacao dos campos antes do envio (nome obrigatorio, quantidade maior ou igual a 0)
- Feedback visual de sucesso ou erro apos a requisicao
- A tabela e recarregada automaticamente apos o cadastro

### Contrato Tecnico (IDs Obrigatorios, Sprint 1)

| Elemento | ID | Descricao |
|---|---|---|
| Input de nome | input-nome | Campo de texto para o nome do material |
| Input de quantidade | input-quantidade | Campo numerico para a quantidade |
| Botao de cadastrar | btn-cadastrar | Dispara o POST para a API |
| Tabela de materiais | lista-materiais | tbody populado dinamicamente pelo GET |

## Sprint 2: Regras de Negocio e Saidas

### Objetivo

Criar o modulo de retirada (baixa de estoque) e de exclusao de materiais, garantindo que o sistema nao aceite numeros negativos ou maiores que o estoque disponivel.

### Funcionalidades Entregues

#### Validacao de Regras de Negocio

- Funcao validarRetirada(estoqueAtual, quantidadeRetirada) que retorna true ou false conforme a operacao seja valida
- Bloqueia retirada de valores negativos
- Bloqueia retirada de valores maiores que o estoque disponivel
- Bloqueia retirada de valor zero
- Bloqueia retirada com campo vazio (correcao de um bug encontrado em teste manual, onde um campo vazio gerava NaN e zerava o estoque indevidamente)

#### Conexao PUT (Baixa de Estoque)

- Cada item da tabela possui um botao com a classe btn-baixar
- Ao clicar, o sistema valida a quantidade informada no campo input-retirada usando validarRetirada
- Se valida, envia uma requisicao PUT para a MockAPI atualizando a quantidade do item
- A tabela e recarregada automaticamente apos a baixa
- Feedback visual de sucesso ou erro e exibido ao usuario

#### Conexao DELETE (Exclusao de Material)

- Cada item da tabela possui um botao com a classe btn-excluir
- Ao clicar, e exibida uma confirmacao antes da exclusao
- Se confirmado, envia uma requisicao DELETE para a MockAPI removendo o item
- A tabela e recarregada automaticamente apos a exclusao

### Contrato Tecnico (IDs e Classes Obrigatorios, Sprint 2)

| Elemento | Identificador | Descricao |
|---|---|---|
| Input de retirada | input-retirada | Campo numerico para a quantidade a retirar |
| Botao de baixa | btn-baixar (classe) | Dispara o PUT na MockAPI, presente em cada linha da tabela |
| Botao de exclusao | btn-excluir (classe) | Dispara o DELETE na MockAPI, presente em cada linha da tabela |
| Funcao de validacao | validarRetirada | Funcao pura que valida a operacao de retirada |

## Sprint 3: Dashboard e Polimento

### Objetivo

Implementar a barra de pesquisa, alertas visuais de estoque baixo, tratamento de erros de internet, e publicar o projeto na nuvem.

### Funcionalidades Entregues

#### Barra de Pesquisa

- Campo de busca que filtra os materiais pelo nome em tempo real, sem precisar recarregar a pagina
- A lista de materiais e mantida em cache local e filtrada no proprio navegador

#### Dashboard

- Elemento #total-itens exibe o numero total de materiais cadastrados
- Atualizado automaticamente a cada cadastro, baixa ou exclusao

#### Alerta Visual de Estoque Critico

- Itens com quantidade menor que 10 unidades recebem a classe estoque-critico
- A classe e aplicada dinamicamente via JavaScript na linha da tabela
- O CSS destaca essas linhas com fundo e texto em tons de vermelho, chamando atencao para o estoque baixo

#### Tratamento de Erros

- Todas as requisicoes a MockAPI (GET, POST, PUT, DELETE) estao protegidas por blocos try/catch
- Em caso de falha de rede ou erro da API, o sistema exibe uma mensagem de erro ao usuario em vez de quebrar silenciosamente

#### Deploy

- Projeto publicado via GitHub Pages, disponivel em producao no link no topo deste documento

### Contrato Tecnico (IDs e Classes Obrigatorios, Sprint 3)

| Elemento | Identificador | Descricao |
|---|---|---|
| Input de busca | input-busca | Campo de texto que filtra os materiais por nome |
| Total de itens | total-itens | Elemento que exibe a contagem total de materiais cadastrados |
| Estoque critico | estoque-critico (classe) | Aplicada via JS na linha da tabela quando a quantidade e menor que 10 |

## Configuracao da API

A URL do endpoint esta definida no topo do main.js:

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
3. O sistema carregara os materiais automaticamente da MockAPI
