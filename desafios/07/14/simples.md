# Viagem de ônibus

**Data:** 14 de julho · **Nível:** Simples

## Objetivo

Calcule custo de passagens para N pessoas.

## Como funciona

Todas as pessoas compram uma passagem de mesmo preço.

## Exemplo de execução

```text
5 pessoas a R$ 12 → R$ 60
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pessoa custa zero.

## Dicas para resolução

1. Leia público.
2. Leia preço.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0714S"
var
pessoas: inteiro
  passagem: real
inicio
escreva("Pessoas: ")
  leia(pessoas)
  escreva("Preço por passagem: ")
  leia(passagem)
  se (pessoas < 0) ou (passagem < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo total: R$ ", pessoas * passagem)
  fimse
fimalgoritmo
```

O custo é proporcional ao número de passageiros.
