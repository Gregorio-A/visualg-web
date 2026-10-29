# Portas alternadas

**Data:** 18 de abril · **Nível:** Simples

## Objetivo

Mostre ABERTA nos índices pares e FECHADA nos ímpares.

## Como funciona

Leia N e mostre estado de cada índice de porta de 1 a N: pares abertos, ímpares fechados.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Número de portas: 3
Porta 1: FECHADA
Porta 2: ABERTA
Porta 3: FECHADA
```

A porta 1 é ímpar e deve aparecer fechada.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0418S"
var
quantidade, i: inteiro
inicio
escreva("Número de portas: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    se i mod 2 = 0 entao
      escreval("Porta ", i, ": ABERTA")
    senao
      escreval("Porta ", i, ": FECHADA")
    fimse
  fimpara
fimalgoritmo
```

O resto por dois identifica índices pares.
