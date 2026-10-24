# Bateria do controle

**Data:** 13 de agosto · **Nível:** Simples

## Objetivo

Calcule percentual restante após consumo informado.

## Como funciona

Subtraia o consumo informado, em pontos percentuais, da carga atual.

## Exemplo de execução

```text
80% menos 25 pontos → 55%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumo maior que a carga deixa 0%.

## Dicas para resolução

1. Subtraia consumo.
2. Compare com zero.
3. Mostre o percentual.

## Solução

```visualg
algoritmo "Desafio0813S"
var
bateria, consumo, restante: real
inicio
escreva("Bateria atual em %: ")
  leia(bateria)
  escreva("Consumo em pontos percentuais: ")
  leia(consumo)
  se (bateria < 0) ou (bateria > 100) ou (consumo < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- bateria - consumo
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Bateria restante: ", restante, "%")
  fimse
fimalgoritmo
```

A carga restante é limitada inferiormente para não ficar negativa.
