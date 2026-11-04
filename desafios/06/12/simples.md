# Prêmio do bingo

**Data:** 12 de junho · **Nível:** Simples

## Objetivo

Compare duas quantidades de acertos.

## Como funciona

Compare a quantidade de acertos de dois jogadores.

## Exemplo de execução

```text
A = 4, B = 3 → A venceu
```

**Como ler o exemplo:** a seta → significa "resulta em".

Quantidades iguais resultam em empate.

## Dicas para resolução

1. Leia dois inteiros.
2. Compare maior e menor.
3. Trate igualdade.

## Solução

```visualg
algoritmo "Desafio0612S"
var
a, b: inteiro
inicio
escreva("Acertos do jogador A: ")
  leia(a)
  escreva("Acertos do jogador B: ")
  leia(b)
  se (a < 0) ou (b < 0) entao
    escreval("Acertos inválidos")
  senao
    se a > b entao
      escreval("A venceu")
    senao
      se b > a entao
        escreval("B venceu")
      senao
        escreval("Empate")
      fimse
    fimse
  fimse
fimalgoritmo
```

A comparação cobre as três relações possíveis entre as pontuações.
