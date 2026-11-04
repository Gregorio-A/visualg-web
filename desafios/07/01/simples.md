# Chá quentinho

**Data:** 1 de julho · **Nível:** Simples

## Objetivo

Calcule custo de N sachês de chá.

## Como funciona

Considere todos os sachês com o mesmo preço.

## Exemplo de execução

```text
6 sachês a R$ 2 → R$ 12
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero sachê custa zero.

## Dicas para resolução

1. Leia preço e quantidade.
2. Multiplique.
3. Mostre o custo.

## Solução

```visualg
algoritmo "Desafio0701S"
var
saches: inteiro
  preco: real
inicio
escreva("Sachês: ")
  leia(saches)
  escreva("Preço por sachê: ")
  leia(preco)
  se (saches < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", saches * preco)
  fimse
fimalgoritmo
```

Multiplique o preço unitário pela quantidade.
