# Feira por peso

**Data:** 20 de maio · **Nível:** Avançado

## Objetivo

Gerencie pesagens, descontos e totais de compras com vários itens.

## Como funciona

Para cada item, leia peso em kg, preço por kg e desconto percentual. Some apenas itens com valores válidos e mostre cada subtotal.

## Exemplo de execução

```text
2 kg a R$ 10/kg com 10% de desconto; 1 kg a R$ 5/kg sem desconto
R$ 18 + R$ 5 = R$ 23
```

Desconto fora de 0–100% ou preço/peso negativo invalida somente aquele item.

## Dicas para resolução

1. Multiplique peso por preço por kg.
2. Aplique o desconto de cada item.
3. Acumule os subtotais válidos.

## Solução

```visualg
algoritmo "Desafio0520A"
var
i, itens: inteiro
  peso, precoKg, desconto, subtotal, total: real
inicio
total <- 0
  escreva("Número de itens: ")
  leia(itens)
  se itens <= 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate itens faca
      escreva("Peso do item ", i, " (kg): ")
      leia(peso)
      escreva("Preço por kg: ")
      leia(precoKg)
      escreva("Desconto percentual: ")
      leia(desconto)
      se (peso >= 0) e (precoKg >= 0) e (desconto >= 0) e (desconto <= 100) entao
        subtotal <- peso * precoKg * (1 - desconto / 100)
        total <- total + subtotal
        escreval("Subtotal: R$ ", subtotal)
      senao
        escreval("Item inválido ignorado")
      fimse
    fimpara
    escreval("Total da compra: R$ ", total)
  fimse
fimalgoritmo
```

O desconto é aplicado ao valor de cada pesagem antes da soma da compra.
