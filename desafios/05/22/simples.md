# Frete separado

**Data:** 22 de maio · **Nível:** Simples

## Objetivo

Calcule preço do produto mais frete informado.

## Como funciona

Leia preço do produto e valor do frete; some-os.

## Exemplo de execução

```text
Preço do produto: 50
Frete: 10
Preço entregue: 60
```

Frete gratuito não altera o preço.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0522S"
var
preco, frete, resultado: real
inicio
escreva("Preço do produto: ")
  leia(preco)
  escreva("Frete: ")
  leia(frete)
  resultado <- preco + frete
  escreval("Preço entregue: ", resultado)
fimalgoritmo
```

A expressão `preco + frete` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
