# Cafeteria de inverno

**Data:** 1 de julho · **Nível:** Avançado

## Objetivo

Registre pedidos, descontos por combos e estoque de ingredientes.

## Como funciona

Registre cinco pedidos. Chá custa R$ 4, leite R$ 3, combo chá+leite custa R$ 6 por conjunto. Cada item consome uma unidade do respectivo estoque.

## Exemplo de execução

```text
Um combo consome um chá e um leite; custa R$ 6 em vez de R$ 7 separados
```

Se faltar qualquer ingrediente, recuse o pedido inteiro sem alterar estoque.

## Dicas para resolução

1. Associe cada pedido a consumo de ingredientes.
2. Confira os dois estoques.
3. Atualize só após validar.

## Solução

```visualg
algoritmo "Desafio0701A"
var
cha, leite, pedido, quantidade, i: inteiro
  estoqueCha, estoqueLeite: inteiro
  subtotal, total: real
inicio
escreva("Sachês de chá em estoque: ")
  leia(estoqueCha)
  escreva("Doses de leite em estoque: ")
  leia(estoqueLeite)
  total <- 0
  para i de 1 ate 5 faca
    escreva("Pedido ", i, " (1 chá, 2 leite, 3 combo): ")
    leia(pedido)
    escreva("Quantidade: ")
    leia(quantidade)
    cha <- 0
    leite <- 0
    subtotal <- 0
    escolha pedido
      caso 1
        cha <- quantidade
        subtotal <- 4 * quantidade
      caso 2
        leite <- quantidade
        subtotal <- 3 * quantidade
      caso 3
        cha <- quantidade
        leite <- quantidade
        subtotal <- 6 * quantidade
    fimescolha
    se (quantidade <= 0) ou (subtotal = 0) ou (cha > estoqueCha) ou (leite > estoqueLeite) entao
      escreval("Pedido recusado")
    senao
      estoqueCha <- estoqueCha - cha
      estoqueLeite <- estoqueLeite - leite
      total <- total + subtotal
      escreval("Pedido aceito: R$ ", subtotal)
    fimse
  fimpara
  escreval("Faturamento: R$ ", total)
  escreval("Estoque final: chá ", estoqueCha, ", leite ", estoqueLeite)
fimalgoritmo
```

O combo aplica desconto fixo e a checagem conjunta evita estoque parcialmente consumido.
