# Máscara assustadora

**Data:** 16 de outubro · **Nível:** Simples

## Objetivo

Calcule a média de três notas dadas à fantasia.

## Como funciona

Notas vão de zero a dez e possuem o mesmo peso.

## Exemplo de execução

```text
8, 9 e 10 → média 9
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero é nota válida.

## Dicas para resolução

1. Valide a faixa.
2. Some.
3. Divida por três.

## Solução

```visualg
algoritmo "Desafio1016S"
var
a, b, c: real
inicio
escreva("Três notas da fantasia: ")
  leia(a, b, c)
  se (a < 0) ou (a > 10) ou (b < 0) ou (b > 10) ou (c < 0) ou (c > 10) entao
    escreval("Nota inválida")
  senao
    escreval("Média: ", (a + b + c) / 3)
  fimse
fimalgoritmo
```

A média aritmética soma as três notas e divide por três.
