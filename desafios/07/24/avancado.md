# Classificador de trilhas

**Data:** 24 de julho · **Nível:** Avançado

## Objetivo

Ordene trilhas por distância, tempo e ganho de elevação usando critérios escolhidos.

## Como funciona

Cadastre cinco trilhas e escolha um critério: menor distância, menor tempo ou menor ganho de elevação. Ordene todos os campos associados.

## Exemplo de execução

```text
Critério distância: trilhas de 2 km e 5 km → 2 km primeiro
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empates preservam a ordem de cadastro.

## Dicas para resolução

1. Leia os três atributos de cada trilha.
2. Selecione a chave de comparação.
3. Troque todos os atributos juntos.

## Solução

```visualg
algoritmo "Desafio0724A"
var
nome: vetor[1..5] de caractere
  distancia, tempo, subida: vetor[1..5] de real
  i, j, criterio: inteiro
  trocaR, a, b: real
  trocaNome: caractere
inicio
para i de 1 ate 5 faca
    escreva("Trilha ", i, ": ")
    leia(nome[i])
    escreva("Distância km, tempo h e subida m: ")
    leia(distancia[i], tempo[i], subida[i])
  fimpara
  escreva("Ordenar por (1 distância, 2 tempo, 3 subida): ")
  leia(criterio)
  se (criterio < 1) ou (criterio > 3) entao
    escreval("Critério inválido")
  senao
    para i de 1 ate 4 faca
      para j de i + 1 ate 5 faca
        escolha criterio
          caso 1
            a <- distancia[i]
            b <- distancia[j]
          caso 2
            a <- tempo[i]
            b <- tempo[j]
          caso 3
            a <- subida[i]
            b <- subida[j]
        fimescolha
        se b < a entao
          trocaR <- distancia[i]
          distancia[i] <- distancia[j]
          distancia[j] <- trocaR
          trocaR <- tempo[i]
          tempo[i] <- tempo[j]
          tempo[j] <- trocaR
          trocaR <- subida[i]
          subida[i] <- subida[j]
          subida[j] <- trocaR
          trocaNome <- nome[i]
          nome[i] <- nome[j]
          nome[j] <- trocaNome
        fimse
      fimpara
    fimpara
    para i de 1 ate 5 faca
      escreval(i, "º ", nome[i], ": ", distancia[i], " km; ", tempo[i], " h; ", subida[i], " m")
    fimpara
  fimse
fimalgoritmo
```

O critério escolhido fornece os dois valores comparados, enquanto as trocas mantêm os demais campos juntos.
