# Soma escondida

**Data:** 20 de abril · **Nível:** Simples

## Objetivo

Calcule a soma dos números de 1 a N.

## Como funciona

Leia N não negativo e some todos os inteiros de 1 até N.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
N: 4
Soma: 10
```

Para N zero, a soma permanece zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0420S"
var
limite, i, soma: inteiro
inicio
escreva("N: ")
  leia(limite)
  soma <- 0
  para i de 1 ate limite faca
    soma <- soma + i
  fimpara
  escreval("Soma: ", soma)
fimalgoritmo
```

O acumulador recebe cada número visitado pelo laço.
