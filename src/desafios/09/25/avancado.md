# Gestão de compostagem

**Data:** 25 de setembro · **Nível:** Avançado

## Objetivo

Simule entradas, transformação e saídas de material em várias semanas.

## Como funciona

Por quatro semanas, adicione material, aplique uma perda percentual sobre o material em transformação e retire composto pronto se houver saldo.

## Exemplo de execução

```text
Estoque 100 kg, entrada 0, perda 10%, saída 20 kg → saldo 70 kg
```

**Como ler o exemplo:** a seta → significa "resulta em".

Saída maior que material transformado é recusada e preserva o estoque anterior da semana.

## Dicas para resolução

1. Some entrada ao saldo.
2. Aplique perda percentual.
3. Confira saída antes de descontar.

## Solução

```visualg
algoritmo "Desafio0925A"
var
semana: inteiro
  estoque, entrada, perdaPct, saida, transformado, totalSaida: real
inicio
escreva("Massa inicial em kg: ")
  leia(estoque)
  escreva("Perda percentual semanal: ")
  leia(perdaPct)
  totalSaida <- 0
  se (estoque < 0) ou (perdaPct < 0) ou (perdaPct > 100) entao
    escreval("Parâmetros inválidos")
  senao
    para semana de 1 ate 4 faca
      escreva("Entrada de material na semana ", semana, ": ")
      leia(entrada)
      escreva("Saída de composto: ")
      leia(saida)
      se (entrada >= 0) e (saida >= 0) entao
        transformado <- (estoque + entrada) * (1 - perdaPct / 100)
        se saida <= transformado entao
          estoque <- transformado - saida
          totalSaida <- totalSaida + saida
          escreval("Semana ", semana, ": estoque ", estoque, " kg")
        senao
          escreval("Saída maior que material disponível; operação recusada")
        fimse
      fimse
    fimpara
    escreval("Saídas totais: ", totalSaida, " kg")
  fimse
fimalgoritmo
```

A ordem entrada → transformação → saída determina o novo estoque.
