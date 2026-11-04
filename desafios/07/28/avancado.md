# Planejamento de refeições

**Data:** 28 de julho · **Nível:** Avançado

## Objetivo

Calcule ingredientes de um cardápio para grupos de tamanhos diferentes.

## Como funciona

Três grupos compartilham o mesmo cardápio. Multiplique o tamanho de cada grupo pelo consumo individual de pães e leite; consolide a compra.

## Exemplo de execução

```text
Grupos de 2 e 3 pessoas; 2 pães por pessoa → 4 e 6 pães, total 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Grupo com quantidade negativa é ignorado no total.

## Dicas para resolução

1. Leia o tamanho de cada grupo.
2. Aplique consumo por pessoa.
3. Some para a lista total.

## Solução

```visualg
algoritmo "Desafio0728A"
var
pessoas: vetor[1..3] de inteiro
  paesPorPessoa, leitePorPessoa: real
  i, totalPessoas: inteiro
  paes, leite: real
inicio
totalPessoas <- 0
  para i de 1 ate 3 faca
    escreva("Pessoas do grupo ", i, ": ")
    leia(pessoas[i])
    se pessoas[i] > 0 entao
      totalPessoas <- totalPessoas + pessoas[i]
    fimse
  fimpara
  escreva("Pães por pessoa: ")
  leia(paesPorPessoa)
  escreva("Litros de leite por pessoa: ")
  leia(leitePorPessoa)
  se (paesPorPessoa < 0) ou (leitePorPessoa < 0) entao
    escreval("Consumo inválido")
  senao
    para i de 1 ate 3 faca
      se pessoas[i] >= 0 entao
        escreval("Grupo ", i, ": ", pessoas[i] * paesPorPessoa, " pães e ", pessoas[i] * leitePorPessoa, " L de leite")
      fimse
    fimpara
    paes <- totalPessoas * paesPorPessoa
    leite <- totalPessoas * leitePorPessoa
    escreval("Compra total: ", paes, " pães e ", leite, " L de leite")
  fimse
fimalgoritmo
```

A compra conjunta é o número total de pessoas multiplicado pelo consumo individual.
