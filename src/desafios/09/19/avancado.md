# Monitor de reservatórios

**Data:** 19 de setembro · **Nível:** Avançado

## Objetivo

Simule entrada, consumo e transbordamento de água em vários dias.

## Como funciona

Por sete dias, adicione entrada, limite o reservatório à capacidade e depois retire consumo até o volume disponível.

## Exemplo de execução

```text
Capacidade 100, volume 90, entrada 20, consumo 5 → transborda 10; termina com 95 L
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumo maior que volume disponível é limitado ao volume restante.

## Dicas para resolução

1. Some entrada.
2. Corte acima da capacidade.
3. Subtraia o consumo possível.

## Solução

```visualg
algoritmo "Desafio0919A"
var
dia, capacidade: inteiro
  entrada, consumo, reservatorio, excedente, totalExcedente: real
inicio
escreva("Capacidade do reservatório (L): ")
  leia(capacidade)
  escreva("Volume inicial (L): ")
  leia(reservatorio)
  totalExcedente <- 0
  se (capacidade < 0) ou (reservatorio < 0) ou (reservatorio > capacidade) entao
    escreval("Dados inválidos")
  senao
    para dia de 1 ate 7 faca
      escreva("Entrada do dia ", dia, " (L): ")
      leia(entrada)
      escreva("Consumo (L): ")
      leia(consumo)
      se (entrada >= 0) e (consumo >= 0) entao
        reservatorio <- reservatorio + entrada
        excedente <- 0
        se reservatorio > capacidade entao
          excedente <- reservatorio - capacidade
          reservatorio <- capacidade
          totalExcedente <- totalExcedente + excedente
        fimse
        se consumo > reservatorio entao
          consumo <- reservatorio
        fimse
        reservatorio <- reservatorio - consumo
        escreval("Dia ", dia, ": volume ", reservatorio, " L; transbordou ", excedente, " L")
      fimse
    fimpara
    escreval("Transbordamento total: ", totalExcedente, " L")
  fimse
fimalgoritmo
```

O transbordamento é apurado antes do consumo, respeitando a ordem física definida.
