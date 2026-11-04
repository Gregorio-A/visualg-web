# Meias decorativas

**Data:** 13 de dezembro · **Nível:** Simples

## Objetivo

Diga se a quantidade de meias é suficiente para todas as pessoas.

## Como funciona

Cada pessoa precisa de uma meia.

## Exemplo de execução

```text
8 meias para 10 pessoas → faltam 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem pessoas, o estoque é suficiente.

## Dicas para resolução

1. Considere uma meia por pessoa.
2. Compare estoque e demanda.
3. Mostre a diferença como sobra ou falta.

## Solução

```visualg
algoritmo "Desafio1213S"
var
  meias, pessoas: inteiro
inicio
  escreva("Meias: ")
  leia(meias)
  escreva("Pessoas: ")
  leia(pessoas)
  se (meias < 0) ou (pessoas < 0) entao
    escreval("Dados inválidos")
  senao
    se meias >= pessoas entao
      escreval("Suficientes; sobram ", meias-pessoas)
    senao
      escreval("Insuficientes; faltam ", pessoas-meias)
    fimse
  fimse
fimalgoritmo
```

Compare estoque e demanda e informe a diferença.
