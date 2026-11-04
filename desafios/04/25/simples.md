# Número triangular

**Data:** 25 de abril · **Nível:** Simples

## Objetivo

Calcule 1 + 2 + ... + N.

## Como funciona

Leia N e calcule a soma dos inteiros consecutivos de 1 até N.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
N: 5
1 + ... + N = 15
```

Para N zero, a soma é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0425S"
var
limite, i, total: inteiro
inicio
escreva("N: ")
  leia(limite)
  total <- 0
  para i de 1 ate limite faca
    total <- total + i
  fimpara
  escreval("1 + ... + N = ", total)
fimalgoritmo
```

O acumulador recebe cada termo da série uma vez.
