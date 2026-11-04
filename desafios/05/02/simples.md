# Vendas do dia

**Data:** 2 de maio · **Nível:** Simples

## Objetivo

Multiplique preço de um produto pela quantidade vendida.

## Como funciona

Leia preço unitário e quantidade vendida; multiplique-os.

## Exemplo de execução

```text
Preço unitário: 10
Quantidade vendida: 3
Valor da venda: 30
```

Quantidade zero produz venda de valor zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0502S"
var
preco, quantidade, resultado: real
inicio
escreva("Preço unitário: ")
  leia(preco)
  escreva("Quantidade vendida: ")
  leia(quantidade)
  resultado <- preco * quantidade
  escreval("Valor da venda: ", resultado)
fimalgoritmo
```

A expressão `preco * quantidade` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
