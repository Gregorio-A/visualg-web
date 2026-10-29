# Loja de fantasias

**Data:** 4 de fevereiro · **Nível:** Avançado

## Objetivo

Registre vendas com descontos por categoria e produza ranking dos produtos.

## Como funciona

Cadastre três produtos com preço. Leia vendas informando produto, quantidade e percentual de desconto; acumule receita por produto e apresente ranking decrescente.

## Exemplo de execução

```text
Produto A: R$ 10; venda de 2 unidades com desconto de 20%
Venda: R$ 16
Ranking: A — receita 16; produtos sem venda — receita 0
```

Desconto de 100% torna a venda gratuita. Quantidade zero é inválida.

## Dicas para resolução

1. Associe cada produto a um código.
2. Acumule os subtotais por produto.
3. Ordene receita e nome juntos.

## Solução

```visualg
algoritmo "Desafio0204A"
var
nome: vetor[1..3] de caractere
  receita, precoProduto: vetor[1..3] de real
  preco, desconto, subtotal, temp: real
  quantidade, i, j, categoria, pedidos: inteiro
  tempNome: caractere
inicio
para i de 1 ate 3 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço unitário: ")
    leia(preco)
    precoProduto[i] <- preco
    receita[i] <- 0
  fimpara
  escreva("Quantidade de vendas: ")
  leia(pedidos)
  para i de 1 ate pedidos faca
    escreva("Categoria/produto (1 a 3): ")
    leia(categoria)
    escreva("Quantidade: ")
    leia(quantidade)
    escreva("Desconto (%): ")
    leia(desconto)
    se (categoria >= 1) e (categoria <= 3) e (quantidade > 0) e (desconto >= 0) e (desconto <= 100) entao
      subtotal <- precoProduto[categoria] * quantidade * (100 - desconto) / 100
      receita[categoria] <- receita[categoria] + subtotal
      escreval("Venda: ", subtotal)
    senao
      escreval("Venda inválida.")
    fimse
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se receita[j] > receita[i] entao
        temp <- receita[i]
        receita[i] <- receita[j]
        receita[j] <- temp
        tempNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- tempNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º: ", nome[i], " — receita ", receita[i])
  fimpara
fimalgoritmo
```

O subtotal multiplica preço por quantidade e aplica o desconto; a receita acumulada define o ranking.
