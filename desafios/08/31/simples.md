# Resumo do jogo

**Data:** 31 de agosto · **Nível:** Simples

## Objetivo

Calcule razão entre vitórias e partidas totais como percentual.

## Como funciona

Divida vitórias por partidas e multiplique por 100.

## Exemplo de execução

```text
6 vitórias em 8 partidas → 75%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero partida impede calcular uma razão.

## Dicas para resolução

1. Valide o total.
2. Divida vitórias por partidas.
3. Multiplique por cem.

## Solução

```visualg
algoritmo "Desafio0831S"
var
vitorias, partidas: inteiro
  percentual: real
inicio
escreva("Vitórias: ")
  leia(vitorias)
  escreva("Partidas: ")
  leia(partidas)
  se (partidas <= 0) ou (vitorias < 0) ou (vitorias > partidas) entao
    escreval("Dados inválidos")
  senao
    percentual <- 100 * vitorias / partidas
    escreval("Aproveitamento: ", percentual, "%")
  fimse
fimalgoritmo
```

O percentual mede a fração de partidas vencidas.
