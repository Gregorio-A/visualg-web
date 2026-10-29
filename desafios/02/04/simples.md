# Fantasia em promoção

**Data:** 4 de fevereiro · **Nível:** Simples

## Objetivo

Calcule o preço final após desconto.

## Como funciona

Informe preço e percentual de desconto. Calcule somente para preço não negativo e percentual de 0 a 100.

## Exemplo de execução

```text
Preço da fantasia: 100
Desconto (%): 20
Preço final: 80
```

Desconto de 100% produz preço zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0204S"
var
preco, desconto, final: real
inicio
escreva("Preço da fantasia: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(desconto)
  se (preco >= 0) e (desconto >= 0) e (desconto <= 100) entao
    final <- preco * (100 - desconto) / 100
    escreval("Preço final: ", final)
  senao
    escreval("Dados inválidos.")
  fimse
fimalgoritmo
```

Multiplicar pela parte restante do percentual evita subtrair uma taxa sem escala.
