# Pista de gelo fictícia

**Data:** 19 de julho · **Nível:** Simples

## Objetivo

Calcule distância de N voltas.

## Como funciona

Todas as voltas têm o mesmo comprimento.

## Exemplo de execução

```text
4 voltas de 250 m → 1000 m
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero volta dá distância zero.

## Dicas para resolução

1. Leia voltas.
2. Leia distância de uma.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0719S"
var
voltas: inteiro
  metrosPorVolta: real
inicio
escreva("Voltas: ")
  leia(voltas)
  escreva("Metros por volta: ")
  leia(metrosPorVolta)
  se (voltas < 0) ou (metrosPorVolta < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Distância: ", voltas * metrosPorVolta, " metros")
  fimse
fimalgoritmo
```

O comprimento por volta é somado repetidamente por multiplicação.
