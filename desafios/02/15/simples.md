# Passos de dança

**Data:** 15 de fevereiro · **Nível:** Simples

## Objetivo

Converta N sequências de oito passos em total de passos.

## Como funciona

Cada sequência de dança tem oito passos. Multiplique a quantidade de sequências por oito.

## Exemplo de execução

```text
Sequências de oito passos: 4
Total de passos: 32
```

Zero sequências representam zero passos.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0215S"
var
sequencias, passos: inteiro
inicio
escreva("Sequências de oito passos: ")
  leia(sequencias)
  se sequencias >= 0 entao
    passos <- sequencias * 8
    escreval("Total de passos: ", passos)
  senao
    escreval("Quantidade inválida.")
  fimse
fimalgoritmo
```

A multiplicação substitui a soma repetida de oito passos por sequência.
