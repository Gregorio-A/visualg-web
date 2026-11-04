# Placar empatado

**Data:** 18 de agosto · **Nível:** Simples

## Objetivo

Verifique se dois jogadores têm a mesma pontuação.

## Como funciona

Verifique somente se os dois placares são iguais.

## Exemplo de execução

```text
10 e 10 → empatado; 10 e 8 → diferente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero a zero é empate.

## Dicas para resolução

1. Leia dois valores.
2. Use =.
3. Exiba um dos resultados.

## Solução

```visualg
algoritmo "Desafio0818S"
var
primeiro, segundo: inteiro
inicio
escreva("Pontos do jogador 1: ")
  leia(primeiro)
  escreva("Pontos do jogador 2: ")
  leia(segundo)
  se primeiro = segundo entao
    escreval("Placar empatado")
  senao
    escreval("Placar diferente")
  fimse
fimalgoritmo
```

A igualdade compara diretamente as duas pontuações.
