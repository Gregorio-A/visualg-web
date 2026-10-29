# Cartaz de promoção

**Data:** 29 de maio · **Nível:** Simples

## Objetivo

Apresente nome do produto e preço promocional.

## Como funciona

Leia nome, preço e porcentagem de desconto de um produto. Mostre o nome junto do preço após desconto.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Produto: Caderno
Preço original: 20
Desconto: 10%
Caderno — preço promocional: 18
```

Desconto zero conserva o preço original.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0529S"
var
produto: caractere
  preco, desconto, promocional: real
inicio
escreva("Produto: ")
  leia(produto)
  escreva("Preço original: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(desconto)
  promocional <- preco * (100 - desconto) / 100
  escreval(produto, " — preço promocional: ", promocional)
fimalgoritmo
```

O nome fica em texto e o preço promocional resulta da conta percentual.
