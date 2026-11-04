# Relógio de competição

**Data:** 22 de agosto · **Nível:** Avançado

## Objetivo

Mantenha placar e eventos em instantes informados e gere linha do tempo.

## Como funciona

Cadastre dez eventos com minuto, descrição e time do gol opcional. Ordene por minuto e gere uma linha do tempo com placar atualizado.

## Exemplo de execução

```text
Evento aos 5 min: gol A → placar 1×0; aos 8 min: falta → placar 1×0
```

**Como ler o exemplo:** a seta → significa "resulta em".

Eventos no mesmo minuto preservam cadastro.

## Dicas para resolução

1. Guarde três campos por evento.
2. Ordene todos juntos pelo minuto.
3. Atualize gols durante a impressão.

## Solução

```visualg
algoritmo "Desafio0822A"
var
minuto: vetor[1..10] de inteiro
  descricao: vetor[1..10] de caractere
  time: vetor[1..10] de inteiro
  i, j, troca, golsA, golsB: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 10 faca
    escreva("Minuto do evento ", i, ": ")
    leia(minuto[i])
    escreva("Descrição: ")
    leia(descricao[i])
    escreva("Time do gol (0 sem gol, 1 A, 2 B): ")
    leia(time[i])
  fimpara
  para i de 1 ate 9 faca
    para j de i + 1 ate 10 faca
      se minuto[j] < minuto[i] entao
        troca <- minuto[i]
        minuto[i] <- minuto[j]
        minuto[j] <- troca
        troca <- time[i]
        time[i] <- time[j]
        time[j] <- troca
        trocaNome <- descricao[i]
        descricao[i] <- descricao[j]
        descricao[j] <- trocaNome
      fimse
    fimpara
  fimpara
  golsA <- 0
  golsB <- 0
  para i de 1 ate 10 faca
    se time[i] = 1 entao
      golsA <- golsA + 1
    fimse
    se time[i] = 2 entao
      golsB <- golsB + 1
    fimse
    escreval(minuto[i], " min: ", descricao[i], " — placar ", golsA, " x ", golsB)
  fimpara
fimalgoritmo
```

Ordenar eventos antes de processá-los garante que o placar mostrado corresponda à cronologia.
