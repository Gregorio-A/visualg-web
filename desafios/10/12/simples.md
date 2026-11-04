# Aranha de oito patas

**Data:** 12 de outubro · **Nível:** Simples

## Objetivo

Calcule total de patas de N aranhas.

## Como funciona

Cada aranha tem oito patas nesta contagem.

## Exemplo de execução

```text
3 aranhas → 24 patas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero aranha produz zero pata.

## Dicas para resolução

1. Leia quantidade.
2. Multiplique por oito.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio1012S"
var
aranhas: inteiro
inicio
escreva("Número de aranhas: ")
  leia(aranhas)
  se aranhas < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de patas: ", aranhas * 8)
  fimse
fimalgoritmo
```

Multiplicar por oito soma as patas de cada animal.
