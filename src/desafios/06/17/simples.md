# Barraca premiada

**Data:** 17 de junho · **Nível:** Simples

## Objetivo

Verifique se uma pontuação alcança o mínimo do prêmio.

## Como funciona

Conceda prêmio quando a pontuação for maior ou igual ao mínimo.

## Exemplo de execução

```text
Pontos 8, mínimo 8 → prêmio conquistado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade ao mínimo é suficiente.

## Dicas para resolução

1. Leia dois números.
2. Use >=.
3. Exiba uma das duas mensagens.

## Solução

```visualg
algoritmo "Desafio0617S"
var
pontos, minimo: inteiro
inicio
escreva("Pontuação: ")
  leia(pontos)
  escreva("Mínimo para prêmio: ")
  leia(minimo)
  se (pontos < 0) ou (minimo < 0) entao
    escreval("Dados inválidos")
  senao
    se pontos >= minimo entao
      escreval("Prêmio conquistado")
    senao
      escreval("Prêmio não conquistado")
    fimse
  fimse
fimalgoritmo
```

A condição >= inclui o limite exato.
