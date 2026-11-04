# Agenda de encerramento

**Data:** 28 de dezembro · **Nível:** Avançado

## Objetivo

Ordene pendências por prazo e destaque tarefas que ultrapassam uma data limite.

## Como funciona

Ordene seis pendências pelo dia do prazo; marque aquelas com prazo posterior à data limite informada.

## Exemplo de execução

```text
Prazos 20 e 10, limite 15 → dia 10 no prazo, dia 20 ultrapassa.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Em empate, preserve a ordem de cadastro.

## Dicas para resolução

1. Guarde nomes e prazos.
2. Ordene pelo número do dia.
3. Compare cada prazo com o limite.

## Solução

```visualg
algoritmo "Desafio1228A"
var
  nome: vetor[1..6] de caractere
  prazo: vetor[1..6] de inteiro
  i, j, aux, limite: inteiro
  auxNome: caractere
inicio
  para i de 1 ate 6 faca
    escreva("Pendência ", i, ": ")
    leia(nome[i])
    repita
      escreva("Prazo, dia de dezembro (1–31): ")
      leia(prazo[i])
    ate (prazo[i] >= 1) e (prazo[i] <= 31)
  fimpara
  escreva("Data limite, dia de dezembro: ")
  leia(limite)
  para i de 1 ate 5 faca
    para j de i+1 ate 6 faca
      se prazo[j] < prazo[i] entao
        aux <- prazo[i]
        prazo[i] <- prazo[j]
        prazo[j] <- aux
        auxNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 6 faca
    escreva("Dia ", prazo[i], ": ", nome[i])
    se prazo[i] > limite entao
      escreval(" — ultrapassa o limite")
    senao
      escreval(" — no prazo")
    fimse
  fimpara
fimalgoritmo
```

Troque nome e prazo juntos na ordenação; depois compare cada prazo com o limite.
