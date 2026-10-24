# Latência da rede

**Data:** 24 de agosto · **Nível:** Simples

## Objetivo

Calcule a média de três tempos de resposta.

## Como funciona

Some as três latências em milissegundos e divida por três.

## Exemplo de execução

```text
10, 20, 30 ms → média 20 ms
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero ms é aceito nesta simulação.

## Dicas para resolução

1. Some os tempos.
2. Divida por três.
3. Mostre ms.

## Solução

```visualg
algoritmo "Desafio0824S"
var
a, b, c: real
inicio
escreva("Latências das três respostas (ms): ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Latência inválida")
  senao
    escreval("Latência média: ", (a + b + c) / 3, " ms")
  fimse
fimalgoritmo
```

A média aritmética dá o tempo médio de resposta.
