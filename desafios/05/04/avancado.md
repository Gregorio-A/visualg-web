# Etiquetador em lote

**Data:** 4 de maio · **Nível:** Avançado

## Objetivo

Atualize preços de dez produtos segundo categorias e regras de margem.

## Como funciona

Cadastre dez produtos. A categoria 1 recebe aumento de 5%, a 2 de 10% e a 3 de 15%. Mostre o preço atualizado de cada produto.

## Exemplo de execução

```text
Produto de categoria 2 custa R$ 100
Novo preço: R$ 110
```

As categorias válidas são 1, 2 e 3; informe apenas esses códigos.

## Dicas para resolução

1. Relacione categoria a uma margem fixa.
2. Calcule preço × (100 + margem)/100.
3. Mostre o resultado de cada produto.

## Solução

```visualg
algoritmo "Desafio0504A"
var
nome: vetor[1..10] de caractere
  categoria: vetor[1..10] de inteiro
  preco, margem: vetor[1..10] de real
  i: inteiro
inicio
para i de 1 ate 10 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Categoria (1, 2 ou 3): ")
    leia(categoria[i])
    escreva("Preço atual: ")
    leia(preco[i])
    se categoria[i] = 1 entao
      margem[i] <- 5
    senao
      se categoria[i] = 2 entao
        margem[i] <- 10
      senao
        margem[i] <- 15
      fimse
    fimse
    preco[i] <- preco[i] * (100 + margem[i]) / 100
    escreval(nome[i], ": novo preço ", preco[i])
  fimpara
fimalgoritmo
```

A margem é escolhida pela categoria e aplicada ao preço original por multiplicação percentual.
