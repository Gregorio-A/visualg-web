# Sessão de filmes

**Data:** 4 de julho · **Nível:** Simples

## Objetivo

Some durações de dois filmes em minutos.

## Como funciona

Some as durações em minutos dos dois filmes, sem intervalo.

## Exemplo de execução

```text
90 min e 100 min → 190 min
```

**Como ler o exemplo:** a seta → significa "resulta em".

Filme de duração zero não altera o total.

## Dicas para resolução

1. Leia os dois tempos.
2. Some.
3. Mostre minutos.

## Solução

```visualg
algoritmo "Desafio0704S"
var
primeiro, segundo: inteiro
inicio
escreva("Minutos do primeiro filme: ")
  leia(primeiro)
  escreva("Minutos do segundo filme: ")
  leia(segundo)
  se (primeiro < 0) ou (segundo < 0) entao
    escreval("Duração inválida")
  senao
    escreval("Duração total: ", primeiro + segundo, " min")
  fimse
fimalgoritmo
```

Como as unidades já são iguais, basta somar.
