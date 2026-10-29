# Planejador de alimentação

**Data:** 24 de junho · **Nível:** Avançado

## Objetivo

Estime consumo de pratos por faixa de público e controle reserva de segurança.

## Como funciona

Três faixas de público têm consumo médio próprio. Aplique a mesma reserva percentual a cada faixa e arredonde pratos para cima.

## Exemplo de execução

```text
10 pessoas × 1,5 prato com 20% de reserva → 18 pratos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Faixa de público zero exige zero pratos.

## Dicas para resolução

1. Multiplique público por consumo médio.
2. Inclua a reserva.
3. Arredonde para cima antes de somar.

## Solução

```visualg
algoritmo "Desafio0624A"
var
publico: vetor[1..3] de inteiro
  consumo: vetor[1..3] de real
  i, reservaPct, pratos, total: inteiro
  estimativa: real
inicio
total <- 0
  escreva("Reserva de segurança em %: ")
  leia(reservaPct)
  se reservaPct < 0 entao
    escreval("Reserva inválida")
  senao
    para i de 1 ate 3 faca
      escreva("Público da faixa ", i, ": ")
      leia(publico[i])
      escreva("Pratos estimados por pessoa: ")
      leia(consumo[i])
      se (publico[i] >= 0) e (consumo[i] >= 0) entao
        estimativa <- publico[i] * consumo[i] * (1 + reservaPct / 100)
        pratos <- int(estimativa)
        se pratos < estimativa entao
          pratos <- pratos + 1
        fimse
        total <- total + pratos
        escreval("Faixa ", i, ": ", pratos, " pratos")
      fimse
    fimpara
    escreval("Total com reserva: ", total)
  fimse
fimalgoritmo
```

O arredondamento em cada faixa assegura cobertura mesmo com previsão fracionária.
