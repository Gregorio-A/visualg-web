# Partida online

**Data:** 29 de agosto · **Nível:** Simples

## Objetivo

Informe se o número de jogadores alcança o mínimo.

## Como funciona

A partida inicia quando a quantidade presente alcança o mínimo.

## Exemplo de execução

```text
3 presentes, mínimo 4 → aguarda 1 jogador
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade já permite começar.

## Dicas para resolução

1. Compare presentes e mínimo.
2. Use >=.
3. Calcule a falta.

## Solução

```visualg
algoritmo "Desafio0829S"
var
jogadores, minimo: inteiro
inicio
escreva("Jogadores presentes: ")
  leia(jogadores)
  escreva("Mínimo para iniciar: ")
  leia(minimo)
  se (jogadores < 0) ou (minimo < 0) entao
    escreval("Dados inválidos")
  senao
    se jogadores >= minimo entao
      escreval("Partida pode começar")
    senao
      escreval("Aguardando ", minimo - jogadores, " jogador(es)")
    fimse
  fimse
fimalgoritmo
```

A diferença informa quantos jogadores faltam.
