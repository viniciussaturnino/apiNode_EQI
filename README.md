<h1 align="center">EQI Back-End</h1>

<h2 align="center">Status da API</h1>
<h4 align="center">
	🚧 API Backend 🚀 Finalizada...✅
</h4>

<h1 align="center">
  <img src="https://img.shields.io/static/v1?label=yarn&message=1.22.4&color=7159c1&style=for-the-badge&logo=ghost"/>
  <img src="https://img.shields.io/static/v1?label=node&message=12.18.3&color=%3CCOLOR%3E&style=for-the-badge&logo=ghost"/>
</h1>

<p align="center">
 <a href="#Objetivo">Objetivo</a> •
 <a href="#Features">Features</a> •
 <a href="#Tecnologias e ferramentas">Tecnologias</a> •
 <a href="#Instruções de uso">Instruções</a> •
 <a href="#Autor">Autor</a>
</p>

<h1 align="center">Objetivo</h1>

<p align="center">
A Eu Quero Investir oferece assessoria a seus clientes, desde a montagem da carteira de investimentos, até o acompanhamento da rentabilidade. Para isso disponibiliza para seus assessores um sistema para auxiliar e acompanhar seus clientes. Para essa tarefa você deve criar uma API simplificada que recebe requests para criação de clientes, propostas e para consultar a projeção de rendimentos. Você não deve se preocupar com o frontend da aplicação.
</p>

# Features

- [x] Cadastro de assessores.
- [x] Cadastro de clientes (somente assessores).
- [x] Cadastro de propostas (somente assessores).
- [x] Listagem de clientes para determinado assessor.
- [x] Listagem de clientes específicos pelo seu ID.
- [x] Listagem de propostas (somente assessores).
- [x] Projeção de rendimentos calculada com juros compostos (somente assessores).

# Tecnologias e ferramentas

- NodeJS
- MySQL
- Express
- Insomnia
- DBeaver

# Instruções de uso

### Passo 1:
```
$ git clone https://github.com/viniciussaturnino/apiNode_EQI
```
### Passo 2:
```
$ cd apiNode_EQI
```
### Passo 3:
```
$ yarn
```
### Passo 4:
```
$ yarn dev
```

# Fundos disponíveis

```json
{
  "id": 1,
  "cnpj": "80884773000117",
  "nome": "SAO PAULO PREV RF PGBL",
  "rendimentoAnual": 12
}

{
  "id": 2,
  "cnpj": "82867342000178",
  "nome": "SAO PAULO PREV RF VGBL",
  "rendimentoAnual": 8
}
```

### Input rendimentos (2 meses)

valor da proposta: 100
id do fundo usado: 1

```json
{
  "dataInicial": "2020-01-01",
  "proposta": 1,
  "meses": 2
}

```

### Output rendimentos (2 meses)

```json
[
  {
    "data": "2020-02-01",
    "proposta": 1,
    "valor": 101
  },
    {
    "data": "2020-03-01",
    "proposta": 1,
    "valor": 102.01
  }
]
```

<h1 align="center">Autor</h1>
<h3 align="center">
  <a href="https://github.com/viniciussaturnino">
    <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/49040839?s=460&u=75aad58ecd77e5b83e7a207149219b05d6597145&v=4" width="150px;" alt=""/>
    <br />
    <sub><b>Vinicius Saturnino</b></sub></a> <a href="https://github.com/viniciussaturnino" title="Github">🚀
  </a>

  Desenvolvido por Vinicius Saturnino

  [![Linkedin Badge](https://img.shields.io/badge/-Vinicius-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/viniciussaturnino07/)](https://www.linkedin.com/in/viniciussaturnino07/)
[![Gmail Badge](https://img.shields.io/badge/-viniciussaturnino78@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:viniciussaturnino78@gmail.com)](mailto:viniciussaturnino78@gmail.com)
</h3>
