# Lanterna fraca

**Data:** 21 de outubro · **Nível:** Simples

## Objetivo

Subtraia consumo de uma carga inicial.

## Como funciona

Desconte o consumo da carga inicial e limite o resultado a zero.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
80% menos 30 pontos → 50%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumo maior que a carga deixa zero.

## Dicas para resolução

1. Subtraia consumo.
2. Compare com zero.
3. Mostre a carga.

## Solução

```visualg
algoritmo "Desafio1021S"
var
carga, consumo, restante: real
inicio
escreva("Carga inicial da lanterna (%): ")
  leia(carga)
  escreva("Consumo em pontos percentuais: ")
  leia(consumo)
  se (carga < 0) ou (carga > 100) ou (consumo < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- carga - consumo
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Carga restante: ", restante, "%")
  fimse
fimalgoritmo
```

O limite inferior evita porcentagem de bateria negativa.
