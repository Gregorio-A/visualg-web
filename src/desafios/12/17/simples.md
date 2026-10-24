# Papel de presente

**Data:** 17 de dezembro · **Nível:** Simples

## Objetivo

Converta metros para centímetros.

## Como funciona

Um metro tem cem centímetros.

## Exemplo de execução

```text
2,4 m → 240 cm
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero permanece zero.

## Dicas para resolução

1. Lembre que um metro tem 100 centímetros.
2. Leia um comprimento não negativo.
3. Multiplique por cem.

## Solução

```visualg
algoritmo "Desafio1217S"
var
  metros: real
inicio
  escreva("Metros: ")
  leia(metros)
  se metros < 0 entao
    escreval("Medida inválida")
  senao
    escreval("Centímetros: ", metros*100:0:2)
  fimse
fimalgoritmo
```

Multiplique a medida em metros por cem.
