# Contador de pistas

**Data:** 24 de abril · **Nível:** Simples

## Objetivo

Conte quantos dos cinco números digitados são positivos.

## Como funciona

Leia cinco inteiros e conte somente os estritamente maiores que zero.

## Exemplo de execução

```text
Números: -1, 0, 2, 3, 4
Positivos: 3
```

Zero não é positivo.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0424S"
var
numero, positivos, i: inteiro
inicio
positivos <- 0
  para i de 1 ate 5 faca
    escreva("Número ", i, ": ")
    leia(numero)
    se numero > 0 entao
      positivos <- positivos + 1
    fimse
  fimpara
  escreval("Positivos: ", positivos)
fimalgoritmo
```

O contador começa em zero e aumenta apenas após a comparação positiva.
