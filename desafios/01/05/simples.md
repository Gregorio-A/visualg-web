# Preço do protetor

**Data:** 5 de janeiro · **Nível:** Simples

## Objetivo

Aplique um desconto percentual a um produto.

Determine o preço final de um produto após um desconto percentual.

## Como funciona

Leia preço e taxa de desconto. Aceite taxas entre 0% e 100%; aplique a taxa sobre o preço original.

## Exemplo de execução

```text
Preço: 80
Desconto (%): 25
Preço com desconto: 60
```

Com desconto de 100%, o preço final é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0105S"
var
preco, percentual, valorFinal: real
inicio
escreva("Preço: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(percentual)
  se (preco >= 0) e (percentual >= 0) e (percentual <= 100) entao
    valorFinal <- preco * (100 - percentual) / 100
    escreval("Preço com desconto: ", valorFinal)
  senao
    escreval("Preço ou percentual inválido.")
  fimse
fimalgoritmo
```

Multiplicar por `(100 - percentual) / 100` conserva apenas a parte não descontada.
