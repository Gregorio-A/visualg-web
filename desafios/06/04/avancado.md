# Pescaria de prêmios

**Data:** 4 de junho · **Nível:** Avançado

## Objetivo

Gerencie sorteios pré-definidos, estoque de prêmios e rodadas sem repetição.

## Como funciona

Leia estoque dos três prêmios e cinco sorteios já definidos. Cada tipo de prêmio só pode ser entregue uma vez no conjunto de rodadas.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Estoque de lápis 2; sorteios 2 e 2 → primeira entrega lápis, segunda sem entrega
```

**Como ler o exemplo:** a seta → significa "resulta em".

Um prêmio esgotado não é marcado como usado, mas continua sem entrega até haver estoque, que não é reposto aqui.

## Dicas para resolução

1. Associe número a prêmio.
2. Confira se já foi usado.
3. Confira saldo antes de entregar.

## Solução

```visualg
algoritmo "Desafio0604A"
var
premio: vetor[1..3] de caractere
  estoque, usado: vetor[1..3] de inteiro
  rodada, sorteio, total: inteiro
inicio
premio[1] <- "adesivo"
  premio[2] <- "lápis"
  premio[3] <- "brinquedo"
  para rodada de 1 ate 3 faca
    escreva("Estoque de ", premio[rodada], ": ")
    leia(estoque[rodada])
    usado[rodada] <- 0
  fimpara
  para rodada de 1 ate 5 faca
    escreva("Sorteio pré-definido da rodada ", rodada, " (1 a 3): ")
    leia(sorteio)
    se (sorteio < 1) ou (sorteio > 3) entao
      escreval("Sorteio inválido")
    senao
      se usado[sorteio] = 1 entao
        escreval("Prêmio já saiu; rodada sem entrega")
      senao
        se estoque[sorteio] <= 0 entao
          escreval("Prêmio esgotado")
        senao
          estoque[sorteio] <- estoque[sorteio] - 1
          usado[sorteio] <- 1
          escreval("Entregue: ", premio[sorteio])
        fimse
      fimse
    fimse
  fimpara
fimalgoritmo
```

O vetor de usados impede repetição de tipo; o de estoque impede entrega sem unidade.
