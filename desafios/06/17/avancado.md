# Pontuação de barracas

**Data:** 17 de junho · **Nível:** Avançado

## Objetivo

Registre tentativas, pontue desempenhos e gere classificação com desempate.

## Como funciona

Quatro participantes fazem três tentativas. Cada acerto vale dez pontos. Classifique por pontuação decrescente, com empate pela ordem original de cadastro.

## Exemplo de execução

```text
Ana acerta 2 e Beto acerta 1 → Ana 20 pontos, Beto 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Entrada diferente de 1 é tratada como não acerto.

## Dicas para resolução

1. Conte acertos.
2. Multiplique por dez.
3. Ordene nome e pontos juntos.

## Solução

```visualg
algoritmo "Desafio0617A"
var
nome: vetor[1..4] de caractere
  pontos: vetor[1..4] de inteiro
  i, j, tentativa, troca: inteiro
  nomeTroca: caractere
inicio
para i de 1 ate 4 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    para j de 1 ate 3 faca
      escreva("Acertou a tentativa ", j, "? (0/1): ")
      leia(tentativa)
      se tentativa = 1 entao
        pontos[i] <- pontos[i] + 10
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara
fimalgoritmo
```

A ordenação estável preserva o desempate por ordem de cadastro porque só troca pontuações estritamente maiores.
