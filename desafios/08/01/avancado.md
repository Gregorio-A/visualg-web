# Ranking arcade

**Data:** 1 de agosto · **Nível:** Avançado

## Objetivo

Registre pontuações de dez jogadores e organize o top 5 sem perder nomes.

## Como funciona

Cadastre dez jogadores. Ordene por pontuação decrescente e mostre os cinco primeiros com seus nomes.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Ana 100, Beto 80 → Ana antes de Beto
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate preserva a ordem de cadastro.

## Dicas para resolução

1. Guarde nome e pontuação no mesmo índice.
2. Compare pontos.
3. Troque os dois campos juntos.

## Solução

```visualg
algoritmo "Desafio0801A"
var
nome: vetor[1..10] de caractere
  pontos: vetor[1..10] de inteiro
  i, j, troca: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 10 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    escreva("Pontuação: ")
    leia(pontos[i])
  fimpara
  para i de 1 ate 9 faca
    para j de i + 1 ate 10 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara
fimalgoritmo
```

As trocas movem nomes e pontuações juntos para não perder a ligação entre eles.
