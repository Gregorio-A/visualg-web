# Comparador de preços

**Data:** 15 de maio · **Nível:** Simples

## Objetivo

Exiba o menor entre dois preços.

## Como funciona

Leia dois preços e apresente o menor.

## Exemplo de execução

```text
Preço 1: 10
Preço 2: 8
Menor preço: 8
```

Se os preços forem iguais, o valor comum é exibido.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0515S"
var
primeiro, segundo: real
inicio
escreva("Preço 1: ")
  leia(primeiro)
  escreva("Preço 2: ")
  leia(segundo)
  se primeiro <= segundo entao
    escreval("Menor preço: ", primeiro)
  senao
    escreval("Menor preço: ", segundo)
  fimse
fimalgoritmo
```

A comparação escolhe o primeiro quando ele é menor ou igual ao segundo.
