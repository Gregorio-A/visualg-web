# Dia da fantasia

**Data:** 29 de outubro · **Nível:** Simples

## Objetivo

Aplique desconto percentual em fantasias.

## Como funciona

Calcule o valor a pagar depois do desconto percentual.

## Exemplo de execução

```text
R$ 50 com 20% de desconto → R$ 40
```

**Como ler o exemplo:** a seta → significa "resulta em".

Desconto de 100% resulta em preço zero.

## Dicas para resolução

1. Converta percentual em fração.
2. Subtraia de 1.
3. Multiplique pelo preço.

## Solução

```visualg
algoritmo "Desafio1029S"
var
preco, desconto: real
inicio
escreva("Preço da fantasia: ")
  leia(preco)
  escreva("Desconto percentual: ")
  leia(desconto)
  se (preco < 0) ou (desconto < 0) ou (desconto > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço final: R$ ", preco * (1 - desconto / 100))
  fimse
fimalgoritmo
```

A fração restante do preço é um menos o desconto dividido por cem.
