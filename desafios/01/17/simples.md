# Pedágio da estrada

**Data:** 17 de janeiro · **Nível:** Simples

## Objetivo

Multiplique o preço do pedágio pela quantidade de praças.

Calcule o custo total de passar por várias praças de pedágio com a mesma tarifa.

## Como funciona

Leia a tarifa por praça e a quantidade de praças. Multiplique somente para quantidade não negativa.

## Exemplo de execução

```text
Preço por pedágio: 8
Quantidade de praças: 3
Custo total: 24
```

Uma rota sem pedágios tem custo zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0117S"
var
preco, total: real
  quantidade: inteiro
inicio
escreva("Preço por pedágio: ")
  leia(preco)
  escreva("Quantidade de praças: ")
  leia(quantidade)
  se quantidade >= 0 entao
    total <- preco * quantidade
    escreval("Custo total: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse
fimalgoritmo
```

O produto tarifa × quantidade representa a soma de tarifas iguais.
