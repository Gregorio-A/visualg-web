# Luzes do quarto

**Data:** 26 de julho · **Nível:** Simples

## Objetivo

Converta consumo de watts e horas para quilowatt-hora.

## Como funciona

Converta watt-hora para quilowatt-hora dividindo por mil.

## Exemplo de execução

```text
100 W por 5 h → 0,5 kWh
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero hora produz consumo zero.

## Dicas para resolução

1. Multiplique W por h.
2. Divida por 1000.
3. Mostre kWh.

## Solução

```visualg
algoritmo "Desafio0726S"
var
watts, horas, quilowattHora: real
inicio
escreva("Potência em watts: ")
  leia(watts)
  escreva("Horas de uso: ")
  leia(horas)
  se (watts < 0) ou (horas < 0) entao
    escreval("Dados inválidos")
  senao
    quilowattHora <- watts * horas / 1000
    escreval("Consumo: ", quilowattHora, " kWh")
  fimse
fimalgoritmo
```

Potência vezes duração fornece watt-hora; a divisão muda a unidade.
