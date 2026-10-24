# Jogos de tabuleiro

**Data:** 25 de julho · **Nível:** Simples

## Objetivo

Some pontuações de duas rodadas.

## Como funciona

Some os pontos de duas rodadas do mesmo jogador.

## Exemplo de execução

```text
7 e 4 → 11 pontos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero ponto numa rodada é válido.

## Dicas para resolução

1. Leia ambas.
2. Some.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0725S"
var
rodada1, rodada2: inteiro
inicio
escreva("Pontos da rodada 1: ")
  leia(rodada1)
  escreva("Pontos da rodada 2: ")
  leia(rodada2)
  se (rodada1 < 0) ou (rodada2 < 0) entao
    escreval("Pontos inválidos")
  senao
    escreval("Total: ", rodada1 + rodada2)
  fimse
fimalgoritmo
```

O placar acumulado é a soma das duas parcelas.
