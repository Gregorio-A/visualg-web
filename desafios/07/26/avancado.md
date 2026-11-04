# Eficiência residencial

**Data:** 26 de julho · **Nível:** Avançado

## Objetivo

Compare aparelhos e calcule economia estimada com substituições.

## Como funciona

Compare um aparelho antigo e um substituto sob o mesmo ciclo de uso. Calcule consumo em kWh e diferença de custo pela tarifa informada.

## Exemplo de execução

```text
100 W trocados por 50 W, 10 h, tarifa R$ 1/kWh → economia R$ 0,50
```

**Como ler o exemplo:** a seta → significa "resulta em".

Economia negativa indica substituto que custa mais energia.

## Dicas para resolução

1. Calcule kWh dos dois.
2. Subtraia consumos.
3. Multiplique pela tarifa.

## Solução

```visualg
algoritmo "Desafio0726A"
var
antigo, novo, horas, dias, tarifa, consumoAntigo, consumoNovo: real
inicio
escreva("Potência antiga em W: ")
  leia(antigo)
  escreva("Potência nova em W: ")
  leia(novo)
  escreva("Horas por dia: ")
  leia(horas)
  escreva("Dias de uso: ")
  leia(dias)
  escreva("Tarifa R$/kWh: ")
  leia(tarifa)
  se (antigo < 0) ou (novo < 0) ou (horas < 0) ou (dias < 0) ou (tarifa < 0) entao
    escreval("Dados inválidos")
  senao
    consumoAntigo <- antigo * horas * dias / 1000
    consumoNovo <- novo * horas * dias / 1000
    escreval("Consumo antigo: ", consumoAntigo, " kWh")
    escreval("Consumo novo: ", consumoNovo, " kWh")
    escreval("Economia estimada: R$ ", (consumoAntigo - consumoNovo) * tarifa)
  fimse
fimalgoritmo
```

A diferença entre consumos multiplicada pela tarifa mede a economia monetária.
