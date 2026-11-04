# Cemitério iluminado

**Data:** 27 de outubro · **Nível:** Simples

## Objetivo

Calcule total de velas por fileira.

## Como funciona

Considere fileiras iguais e multiplique número de fileiras por velas em cada uma.

## Exemplo de execução

```text
4 fileiras de 6 → 24 velas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero fileiras resulta em zero velas.

## Dicas para resolução

1. Leia duas quantidades.
2. Multiplique.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio1027S"
var
fileiras, velasPorFileira: inteiro
inicio
escreva("Fileiras: ")
  leia(fileiras)
  escreva("Velas por fileira: ")
  leia(velasPorFileira)
  se (fileiras < 0) ou (velasPorFileira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de velas: ", fileiras * velasPorFileira)
  fimse
fimalgoritmo
```

A multiplicação soma a mesma quantidade de velas em cada fileira.
