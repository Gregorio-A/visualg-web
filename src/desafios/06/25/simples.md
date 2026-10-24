# Pontuação do arremesso

**Data:** 25 de junho · **Nível:** Simples

## Objetivo

Some valores de três tentativas.

## Como funciona

Some os pontos das três tentativas.

## Exemplo de execução

```text
2, 5 e 3 → 10 pontos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tentativa com zero ponto continua válida.

## Dicas para resolução

1. Leia três números.
2. Some os três.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0625S"
var
a, b, c: inteiro
inicio
escreva("Pontos da tentativa 1: ")
  leia(a)
  escreva("Pontos da tentativa 2: ")
  leia(b)
  escreva("Pontos da tentativa 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Pontos inválidos")
  senao
    escreval("Pontuação total: ", a + b + c)
  fimse
fimalgoritmo
```

O total reúne as três parcelas registradas.
