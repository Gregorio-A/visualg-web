# Maré medida

**Data:** 29 de setembro · **Nível:** Simples

## Objetivo

Calcule a diferença entre nível máximo e mínimo.

## Como funciona

A diferença entre nível máximo e mínimo é a amplitude medida.

## Exemplo de execução

```text
Máximo 3 m e mínimo 1 m → amplitude 2 m
```

**Como ler o exemplo:** a seta → significa "resulta em".

Níveis iguais dão amplitude zero.

## Dicas para resolução

1. Leia extremos.
2. Confirme a ordem.
3. Subtraia.

## Solução

```visualg
algoritmo "Desafio0929S"
var
maximo, minimo: real
inicio
escreva("Nível máximo da maré: ")
  leia(maximo)
  escreva("Nível mínimo da maré: ")
  leia(minimo)
  se maximo < minimo entao
    escreval("Máximo menor que mínimo")
  senao
    escreval("Amplitude da maré: ", maximo - minimo)
  fimse
fimalgoritmo
```

A subtração mede a variação entre extremos.
