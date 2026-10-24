# Número escondido

**Data:** 12 de abril · **Nível:** Simples

## Objetivo

Indique se uma entrada está entre 10 e 20.

## Como funciona

Considere o intervalo fechado de 10 até 20, inclusive as duas extremidades.

## Exemplo de execução

```text
Número: 15
Entre 10 e 20
```

Os valores 10 e 20 pertencem ao intervalo.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0412S"
var
numero: real
inicio
escreva("Número: ")
  leia(numero)
  se (numero >= 10) e (numero <= 20) entao
    escreval("Entre 10 e 20")
  senao
    escreval("Fora de 10 a 20")
  fimse
fimalgoritmo
```

As duas comparações são ligadas por `e` porque ambas precisam valer.
