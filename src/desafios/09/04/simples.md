# Energia solar

**Data:** 4 de setembro · **Nível:** Simples

## Objetivo

Calcule geração de um painel com potência e horas ideais.

## Como funciona

Considere potência constante em horas ideais; converta Wh para kWh.

## Exemplo de execução

```text
500 W por 4 h → 2 kWh
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero hora gera zero energia.

## Dicas para resolução

1. Multiplique W por h.
2. Divida por 1000.
3. Mostre kWh.

## Solução

```visualg
algoritmo "Desafio0904S"
var
potencia, horas, geracao: real
inicio
escreva("Potência do painel em W: ")
  leia(potencia)
  escreva("Horas ideais de sol: ")
  leia(horas)
  se (potencia < 0) ou (horas < 0) entao
    escreval("Dados inválidos")
  senao
    geracao <- potencia * horas / 1000
    escreval("Geração estimada: ", geracao, " kWh")
  fimse
fimalgoritmo
```

Potência vezes tempo fornece Wh; mil Wh formam um kWh.
