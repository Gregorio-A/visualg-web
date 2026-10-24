# Casaco em promoção

**Data:** 7 de julho · **Nível:** Simples

## Objetivo

Aplique um desconto de inverno.

## Como funciona

Aplique ao preço original o desconto percentual informado.

## Exemplo de execução

```text
R$ 100 com 25% → R$ 75
```

**Como ler o exemplo:** a seta → significa "resulta em".

Desconto 100% produz preço zero.

## Dicas para resolução

1. Divida percentual por 100.
2. Subtraia de 1.
3. Multiplique pelo preço.

## Solução

```visualg
algoritmo "Desafio0707S"
var
preco, desconto: real
inicio
escreva("Preço do casaco: ")
  leia(preco)
  escreva("Desconto de inverno em %: ")
  leia(desconto)
  se (preco < 0) ou (desconto < 0) ou (desconto > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço promocional: R$ ", preco * (1 - desconto / 100))
  fimse
fimalgoritmo
```

O preço final corresponde à fração não descontada.
