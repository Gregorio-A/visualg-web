# Rotina noturna

**Data:** 11 de outubro · **Nível:** Avançado

## Objetivo

Organize atividades do vampiro em intervalos que atravessam meia-noite.

## Como funciona

A noite começa às 18h e termina às 18h seguintes. Converta horas 0–17 para dia seguinte, ordene cinco atividades e sinalize sobreposição.

## Exemplo de execução

```text
Atividade 23h por 2h termina à 1h do dia seguinte
```

Durações não negativas e horas 0–23 são pré-condições de entrada.

## Dicas para resolução

1. Converta horas da madrugada.
2. Ordene por início convertido.
3. Compare início com o maior fim anterior.

## Solução

```visualg
algoritmo "Desafio1011A"
var
nome: vetor[1..5] de caractere
  inicioMin, duracao: vetor[1..5] de inteiro
  i, j, troca, fimAnterior: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(nome[i])
    escreva("Hora de início (0 a 23): ")
    leia(inicioMin[i])
    escreva("Duração em horas: ")
    leia(duracao[i])
    se inicioMin[i] < 18 entao
      inicioMin[i] <- inicioMin[i] + 24
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se inicioMin[j] < inicioMin[i] entao
        troca <- inicioMin[i]
        inicioMin[i] <- inicioMin[j]
        inicioMin[j] <- troca
        troca <- duracao[i]
        duracao[i] <- duracao[j]
        duracao[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  fimAnterior <- 18
  para i de 1 ate 5 faca
    escreval(nome[i], ": da hora ", inicioMin[i] mod 24, " até ", (inicioMin[i] + duracao[i]) mod 24)
    se inicioMin[i] < fimAnterior entao
      escreval("Conflito com atividade anterior")
    fimse
    se inicioMin[i] + duracao[i] > fimAnterior entao
      fimAnterior <- inicioMin[i] + duracao[i]
    fimse
  fimpara
fimalgoritmo
```

Representar a madrugada como horas 24–41 mantém a ordem cronológica contínua.
