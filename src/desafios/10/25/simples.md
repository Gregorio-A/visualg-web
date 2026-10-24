# Corrida dos zumbis

**Data:** 25 de outubro · **Nível:** Simples

## Objetivo

Calcule quantos metros um zumbi percorre em N minutos.

## Como funciona

Assuma velocidade constante e multiplique o tempo em minutos pela velocidade em metros por minuto.

## Exemplo de execução

```text
5 min a 12 m/min → 60 m
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero minuto produz zero metro.

## Dicas para resolução

1. Leia tempo e velocidade.
2. Multiplique.
3. Mostre metros.

## Solução

```visualg
algoritmo "Desafio1025S"
var
minutos: inteiro
  velocidade: real
inicio
escreva("Minutos de corrida: ")
  leia(minutos)
  escreva("Velocidade em metros por minuto: ")
  leia(velocidade)
  se (minutos < 0) ou (velocidade < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Distância: ", minutos * velocidade, " metros")
  fimse
fimalgoritmo
```

Unidades compatíveis resultam em distância em metros.
