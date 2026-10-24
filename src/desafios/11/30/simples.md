# Fechamento tecnológico

**Data:** 30 de novembro · **Nível:** Simples

## Objetivo

Calcule média de três avaliações de um aplicativo.

## Como funciona

Considere avaliações na escala de zero a cinco, todas com mesmo peso.

## Exemplo de execução

```text
4, 5 e 3 → média 4
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero é avaliação válida.

## Dicas para resolução

1. Valide a escala.
2. Some.
3. Divida por três.

## Solução

```visualg
algoritmo "Desafio1130S"
var
a, b, c: real
inicio
escreva("Três avaliações (0 a 5): ")
  leia(a, b, c)
  se (a < 0) ou (a > 5) ou (b < 0) ou (b > 5) ou (c < 0) ou (c > 5) entao
    escreval("Avaliação inválida")
  senao
    escreval("Média: ", (a + b + c) / 3)
  fimse
fimalgoritmo
```

A média aritmética divide a soma por três.
