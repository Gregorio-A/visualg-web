# Calendário de recompensas

**Data:** 28 de agosto · **Nível:** Avançado

## Objetivo

Simule registro de dias, bônus de sequência e reinício após ausência.

## Como funciona

Em dez dias, presença dá 10 moedas mais 2 por dia anterior da sequência. Ausência zera a sequência, mas não retira moedas já ganhas.

## Exemplo de execução

```text
Presenças 1,1,0,1 → bônus 10,12,0,10; total 32
```

**Como ler o exemplo:** a seta → significa "resulta em".

Entrada diferente de 1 é ausência.

## Dicas para resolução

1. Conte presenças consecutivas.
2. Calcule bônus conforme a posição na sequência.
3. Some ao saldo acumulado.

## Solução

```visualg
algoritmo "Desafio0828A"
var
dia: vetor[1..10] de inteiro
  i, sequencia, bonus, total: inteiro
inicio
sequencia <- 0
  total <- 0
  para i de 1 ate 10 faca
    escreva("Registrou presença no dia ", i, "? (0/1): ")
    leia(dia[i])
    se dia[i] = 1 entao
      sequencia <- sequencia + 1
      bonus <- 10 + 2 * (sequencia - 1)
      total <- total + bonus
      escreval("Dia ", i, ": bônus ", bonus, "; total ", total)
    senao
      sequencia <- 0
      escreval("Dia ", i, ": ausência; sequência reiniciada")
    fimse
  fimpara
  escreval("Recompensa acumulada: ", total)
fimalgoritmo
```

A sequência corrente determina o bônus do dia e reinicia após ausência.
