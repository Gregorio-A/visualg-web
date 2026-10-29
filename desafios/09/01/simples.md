# Muda de árvore

**Data:** 1 de setembro · **Nível:** Simples

## Objetivo

Calcule quantas mudas serão plantadas em N fileiras.

## Como funciona

As fileiras têm a mesma quantidade de mudas.

## Exemplo de execução

```text
4 fileiras com 5 mudas → 20 mudas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero fileira resulta em zero muda.

## Dicas para resolução

1. Leia fileiras.
2. Leia mudas por fileira.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0901S"
var
fileiras, porFileira: inteiro
inicio
escreva("Fileiras de mudas: ")
  leia(fileiras)
  escreva("Mudas por fileira: ")
  leia(porFileira)
  se (fileiras < 0) ou (porFileira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Mudas plantadas: ", fileiras * porFileira)
  fimse
fimalgoritmo
```

A multiplicação soma a mesma quantidade em cada fileira.
