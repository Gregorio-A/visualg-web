# Comissão simples

**Data:** 3 de maio · **Nível:** Simples

## Objetivo

Calcule uma comissão percentual sobre uma venda.

## Como funciona

Leia o valor vendido e a taxa percentual; aplique a taxa sobre a venda.

## Exemplo de execução

```text
Valor da venda: 200
Comissão (%): 5
Comissão: 10
```

Comissão de 0% produz zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0503S"
var
venda, taxa, resultado: real
inicio
escreva("Valor da venda: ")
  leia(venda)
  escreva("Comissão (%): ")
  leia(taxa)
  resultado <- venda * taxa / 100
  escreval("Comissão: ", resultado)
fimalgoritmo
```

A expressão `venda * taxa / 100` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
