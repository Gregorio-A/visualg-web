# Carrinho de bebidas

**Data:** 8 de fevereiro · **Nível:** Simples

## Objetivo

Some preços e quantidades de dois itens.

## Como funciona

Para cada um dos dois itens, multiplique o preço pela quantidade e some os subtotais.

## Exemplo de execução

```text
Preço do item 1: 5
Quantidade do item 1: 2
Preço do item 2: 3
Quantidade do item 2: 4
Total do carrinho: 22
```

Quantidade zero contribui com zero ao total.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0208S"
var
preco1, preco2, total: real
  qtd1, qtd2: inteiro
inicio
escreva("Preço do item 1: ")
  leia(preco1)
  escreva("Quantidade do item 1: ")
  leia(qtd1)
  escreva("Preço do item 2: ")
  leia(preco2)
  escreva("Quantidade do item 2: ")
  leia(qtd2)
  se (qtd1 >= 0) e (qtd2 >= 0) entao
    total <- preco1 * qtd1 + preco2 * qtd2
    escreval("Total do carrinho: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse
fimalgoritmo
```

A expressão tem dois produtos, um por item, unidos por uma soma.
