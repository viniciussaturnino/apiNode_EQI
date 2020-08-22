# EQI Back-End

## Api em Node JS

A Eu Quero Investir oferece assessoria a seus clientes, desde a montagem da carteira de investimentos, até o acompanhamento da rentabilidade. Para isso disponibiliza para seus assessores um sistema para auxiliar e acompanhar seus clientes. Para essa tarefa você deve criar uma API simplificada que recebe requests para criação de clientes, propostas e para consultar a projeção de rendimentos. Você não deve se preocupar com o frontend da aplicação.

## Fundos disponíveis

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

## Atributos de cliente

* nome (texto com no minimo 2 e no máximo 200 caracteres)
* cpf (somente 11 números, sem pontuações)
* email (texto com no máximo 200 caracteres)
* assessor (ID de um assessor criado)

## Atributos do assessor

* nome (texto com no minimo 2 e no máximo 200 caracteres)

## Atributos de proposta

* codigo (número inteiro único que representa o número da proposta criada na seguradora)
* valor (número de ponto flutuante positivo)
* tipoPagamento ("boleto" ou "debito")
* fundo (ID de um dos fundos disponíveis)
* cliente (ID de um cliente cadastrado)

## User Story Cliente

* Sendo um assessor eu quero cadastrar meus clientes para ter seus dados salvos para futuras operações
* Sendo um assessor eu quero ter acesso a todos os clientes que eu já cadastrei para usar seus dados em novas operações

### Requisitos para Cliente

* Deve ser criado por 1 assessor
* Deve pertencer ao assessor que o criou
* Deve ser encontrado somente pelo assessor que o criou
* Deve ser encontrado pelo seu ID

## User Story Proposta

* Sendo um assessor eu quero cadastrar propostas de investimentos para meus clientes terem as vantagens do produto

### Requisitos para Proposta

* Deve ser criada por um assessor para um dos seus clientes
* Deve ter apenas o valor de aporte inicial
* Deve estar vinculado a um dos fundos disponíveis
* Deve estar vinculado ao cliente titular

### User Story Rendimentos

* Sendo um assessor eu quero ter acesso a projeção de rendimentos para informar possíveis ganhos aos meus clientes com mais agilidade

### Requisitos para Rendimentos

* Deve ser calculado usando juros compostos
* Deve ser calculado para uma quantidade variável de meses futuros
* Deve ser possível saber para qual mês o rendimento calculado pertence

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

## Critérios

Nós prefiriamos que você use nodejs com mysql, porém pode-se usar qualquer linguagem ou framework contanto que você construa um sistema sólido, resiliente, com foco em qualidade de código, simplicidade e manutenabilidade. Esperamos que você aprenda rápido e tome decisões visando qualidade na entrega. Não é necessário criar interfaces para o usuário, porém esperamos que a implementação seja a mais próxima possível do que seria necessário na vida real, considerando que outro desenvolvedor pegaria esse projeto e tivesse que começar a implementar novas funcionalidades a partir do exato ponto onde você parou.