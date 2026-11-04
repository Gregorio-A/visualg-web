# Três suspeitos

**Data:** 10 de abril · **Nível:** Simples

## Objetivo

Exiba o menor de três números.

## Como funciona

Leia três valores e mantenha o menor encontrado até o momento.

## Exemplo de execução

```text
Números: 8, 2, 5
Menor: 2
```

A comparação funciona também quando todos os números são negativos.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0410S"
var
a, b, c, menor: real
inicio
escreva("Número 1: ")
  leia(a)
  escreva("Número 2: ")
  leia(b)
  escreva("Número 3: ")
  leia(c)
  menor <- a
  se b < menor entao
    menor <- b
  fimse
  se c < menor entao
    menor <- c
  fimse
  escreval("Menor: ", menor)
fimalgoritmo
```

Começar pelo primeiro valor evita escolher zero indevidamente como mínimo.
