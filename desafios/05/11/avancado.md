# Compras por fornecedor

**Data:** 11 de maio · **Nível:** Avançado

## Objetivo

Compare preços e fretes de fornecedores e escolha menor custo por item.

## Como funciona

Compare três propostas para a mesma quantidade de um item. Some preço unitário vezes quantidade e frete fixo. Ignore propostas com preço ou frete negativo.

## Exemplo de execução

```text
10 unidades; A: R$ 8 + R$ 15 de frete; B: R$ 9 + R$ 0
A: R$ 95; B: R$ 90; escolha B
```

Empates preservam a primeira proposta. Quantidade não positiva é recusada.

## Dicas para resolução

1. Calcule o custo total de cada proposta.
2. Guarde o menor custo encontrado.
3. Mostre também o fornecedor vencedor.

## Solução

```visualg
algoritmo "Desafio0511A"
var
fornecedor: vetor[1..3] de caractere
  preco, frete: vetor[1..3] de real
  i, melhor: inteiro
  quantidade: inteiro
  total, menor: real
inicio
escreva("Quantidade de unidades: ")
  leia(quantidade)
  se quantidade <= 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate 3 faca
      escreva("Fornecedor: ")
      leia(fornecedor[i])
      escreva("Preço unitário: ")
      leia(preco[i])
      escreva("Frete total: ")
      leia(frete[i])
    fimpara
    melhor <- 0
    para i de 1 ate 3 faca
      se (preco[i] >= 0) e (frete[i] >= 0) entao
        total <- preco[i] * quantidade + frete[i]
        escreval(fornecedor[i], ": R$ ", total)
        se (melhor = 0) ou (total < menor) entao
          melhor <- i
          menor <- total
        fimse
      fimse
    fimpara
    se melhor = 0 entao
      escreval("Nenhuma proposta válida")
    senao
      escreval("Melhor compra: ", fornecedor[melhor], " por R$ ", menor)
    fimse
  fimse
fimalgoritmo
```

A decisão usa o custo completo do pedido, inclusive frete, para cada fornecedor.
