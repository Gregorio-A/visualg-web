# Concurso de monstros

**Data:** 16 de outubro · **Nível:** Avançado

## Objetivo

Calcule notas ponderadas, aplique penalidades e crie pódio com empates.

## Como funciona

Quatro monstros recebem criatividade com peso 2, fantasia com peso 1 e penalidade subtraída. Ordene e mostre pódio dos três primeiros, indicando empates.

### Palavras úteis

- **Média ponderada:** É uma média em que algumas notas têm mais importância, definida pelos pesos.

## Exemplo de execução

```text
Criatividade 9, fantasia 6, penalidade 1 → nota final 7
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate mantém ordem de cadastro e é sinalizado no pódio.

## Dicas para resolução

1. Aplique pesos 2 e 1.
2. Subtraia penalidade.
3. Ordene e compare notas vizinhas.

## Solução

```visualg
algoritmo "Desafio1016A"
var
nome: vetor[1..4] de caractere
  nota, penalidade, finalNota: vetor[1..4] de real
  i, j, troca: inteiro
  trocaR: real
  trocaNome: caractere
inicio
para i de 1 ate 4 faca
    escreva("Monstro ", i, ": ")
    leia(nome[i])
    escreva("Nota de criatividade (peso 2): ")
    leia(nota[i])
    escreva("Nota de fantasia (peso 1): ")
    leia(finalNota[i])
    escreva("Penalidade: ")
    leia(penalidade[i])
    finalNota[i] <- (2 * nota[i] + finalNota[i]) / 3 - penalidade[i]
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se finalNota[j] > finalNota[i] entao
        trocaR <- finalNota[i]
        finalNota[i] <- finalNota[j]
        finalNota[j] <- trocaR
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º ", nome[i], ": ", finalNota[i])
    se (i > 1) e (finalNota[i] = finalNota[i - 1]) entao
      escreval("Empatado com a posição anterior")
    fimse
  fimpara
fimalgoritmo
```

A média ponderada precede a penalidade; a ordenação mantém nome e nota juntos.
