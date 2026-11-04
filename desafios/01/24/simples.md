# Balde de areia

**Data:** 24 de janeiro · **Nível:** Simples

## Objetivo

Converta litros de um recipiente para mililitros.

Converta a capacidade de um recipiente de litros para mililitros.

## Como funciona

Leia um valor em litros e multiplique por 1000.

## Exemplo de execução

```text
Capacidade (litros): 2.5
Capacidade (ml): 2500
```

Meio litro corresponde a 500 ml.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0124S"
var
litros, mililitros: real
inicio
escreva("Capacidade (litros): ")
  leia(litros)
  mililitros <- litros * 1000
  escreval("Capacidade (ml): ", mililitros)
fimalgoritmo
```

A relação entre as unidades é constante e não depende do tamanho do recipiente.
