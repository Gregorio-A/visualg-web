# Rifa junina

**Data:** 20 de junho · **Nível:** Simples

## Objetivo

Calcule o valor arrecadado por quantidade de bilhetes.

## Como funciona

Considere todos os bilhetes com o mesmo preço.

## Exemplo de execução

```text
12 bilhetes a R$ 2 → R$ 24
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nenhum bilhete vendido gera arrecadação zero.

## Dicas para resolução

1. Leia bilhetes e preço.
2. Multiplique.
3. Mostre o resultado.

## Solução

```visualg
algoritmo "Desafio0620S"
var
bilhetes: inteiro
  preco: real
inicio
escreva("Bilhetes vendidos: ")
  leia(bilhetes)
  escreva("Preço por bilhete: ")
  leia(preco)
  se (bilhetes < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Arrecadação: R$ ", bilhetes * preco)
  fimse
fimalgoritmo
```

A arrecadação é quantidade multiplicada por valor unitário.
