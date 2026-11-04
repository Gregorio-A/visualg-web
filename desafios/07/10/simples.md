# Sopa dividida

**Data:** 10 de julho · **Nível:** Simples

## Objetivo

Divida uma quantidade de litros entre pessoas.

## Como funciona

Divida igualmente uma quantidade de litros entre todas as pessoas.

## Exemplo de execução

```text
3 L para 6 pessoas → 0,5 L por pessoa
```

**Como ler o exemplo:** a seta → significa "resulta em".

Não divida por zero pessoas.

## Dicas para resolução

1. Leia volume.
2. Leia público.
3. Divida após validar.

## Solução

```visualg
algoritmo "Desafio0710S"
var
litros: real
  pessoas: inteiro
inicio
escreva("Litros de sopa: ")
  leia(litros)
  escreva("Pessoas: ")
  leia(pessoas)
  se (litros < 0) ou (pessoas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Litros por pessoa: ", litros / pessoas)
  fimse
fimalgoritmo
```

A razão litros por pessoas fornece a porção individual.
