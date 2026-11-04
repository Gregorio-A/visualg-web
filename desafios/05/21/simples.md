# Contador de encomendas

**Data:** 21 de maio · **Nível:** Simples

## Objetivo

Some pedidos de dois períodos.

## Como funciona

Leia quantidades de pedidos de dois períodos e some-as.

## Exemplo de execução

```text
Pedidos da manhã: 8
Pedidos da tarde: 12
Pedidos totais: 20
```

Um período sem pedidos contribui com zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0521S"
var
manha, tarde, resultado: real
inicio
escreva("Pedidos da manhã: ")
  leia(manha)
  escreva("Pedidos da tarde: ")
  leia(tarde)
  resultado <- manha + tarde
  escreval("Pedidos totais: ", resultado)
fimalgoritmo
```

A expressão `manha + tarde` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
