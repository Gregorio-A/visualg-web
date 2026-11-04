# Premiação de grupos

**Data:** 27 de fevereiro · **Nível:** Avançado

## Objetivo

Calcule pontuação por várias provas e resolva empates por critério secundário.

## Como funciona

Leia pontos de três grupos em quatro provas. Classifique pelo total e use a pontuação da quarta prova como critério secundário.

## Exemplo de execução

```text
Grupo A: 5,5,5,5 → total 20, última 5
Grupo B: 6,6,2,6 → total 20, última 6
B fica à frente de A
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se total e quarta prova forem iguais, os grupos dividem a mesma posição.

## Dicas para resolução

1. Some todas as provas.
2. Guarde a nota da última prova separadamente.
3. Compare total primeiro; só em empate compare a última prova.

## Solução

```visualg
algoritmo "Desafio0227A"
var
nome: vetor[1..3] de caractere
  pontos, desempate: vetor[1..3] de inteiro
  i, prova, nota, posicao, j: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Grupo ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    para prova de 1 ate 4 faca
      escreva("Pontos da prova ", prova, ": ")
      leia(nota)
      pontos[i] <- pontos[i] + nota
      se prova = 4 entao
        desempate[i] <- nota
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    posicao <- 1
    para j de 1 ate 3 faca
      se (pontos[j] > pontos[i]) ou ((pontos[j] = pontos[i]) e (desempate[j] > desempate[i])) entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(nome[i], ": posição ", posicao, ", total ", pontos[i], ", última prova ", desempate[i])
  fimpara
fimalgoritmo
```

A posição é calculada contando quantos grupos superam o atual pelo par de critérios.
