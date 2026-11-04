# Etiqueta na vitrine

**Data:** 4 de maio · **Nível:** Simples

## Objetivo

Aplique aumento percentual a um preço.

## Como funciona

Leia preço e percentual de aumento. Some o aumento proporcional ao preço original.

## Exemplo de execução

```text
Preço original: 100
Aumento (%): 20
Preço reajustado: 120
```

Aumento de 0% conserva o preço original.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0504S"
var
preco, aumento, resultado: real
inicio
escreva("Preço original: ")
  leia(preco)
  escreva("Aumento (%): ")
  leia(aumento)
  resultado <- preco * (100 + aumento) / 100
  escreval("Preço reajustado: ", resultado)
fimalgoritmo
```

A expressão `preco * (100 + aumento) / 100` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
