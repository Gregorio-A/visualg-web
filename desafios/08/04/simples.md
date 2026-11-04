# FPS médio

**Data:** 4 de agosto · **Nível:** Simples

## Objetivo

Calcule a média de três medições de quadros por segundo.

## Como funciona

Some três medições de FPS e divida por três.

## Exemplo de execução

```text
30, 60 e 45 → média 45 FPS
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma leitura zero é aceita.

## Dicas para resolução

1. Some leituras.
2. Divida por três.
3. Mostre FPS.

## Solução

```visualg
algoritmo "Desafio0804S"
var
a, b, c: real
inicio
escreva("FPS das três medições: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("FPS inválido")
  senao
    escreval("FPS médio: ", (a + b + c) / 3)
  fimse
fimalgoritmo
```

A média aritmética usa as três medições com o mesmo peso.
