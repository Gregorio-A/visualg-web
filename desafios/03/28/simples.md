# Preço da apostila

**Data:** 28 de março · **Nível:** Simples

## Objetivo

Calcule o valor de N apostilas iguais.

## Como funciona

Leia quantidade e preço unitário; multiplique-os para obter o valor da compra.

## Exemplo de execução

```text
Quantidade: 5; preço unitário: 12
Valor total: 60
```

Quantidade zero representa compra de valor zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0328S"
var
quantidade: inteiro
  preco, total: real
inicio
escreva("Quantidade de apostilas: ")
  leia(quantidade)
  escreva("Preço de uma apostila: ")
  leia(preco)
  se quantidade >= 0 entao
    total <- quantidade * preco
    escreval("Valor total: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse
fimalgoritmo
```

Cada apostila tem o mesmo preço, portanto multiplicação substitui soma repetida.
