# Troco do cliente

**Data:** 5 de maio · **Nível:** Simples

## Objetivo

Calcule o troco após uma compra válida.

## Como funciona

Leia o total da compra e o valor entregue. Somente quando o pagamento cobre a compra, subtraia compra de pagamento.

## Exemplo de execução

```text
Valor pago: 50
Total da compra: 35
Troco: 15
```

Pagamento exatamente igual ao preço gera troco zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0505S"
var
pago, compra: real
inicio
escreva("Valor pago: ")
  leia(pago)
  escreva("Total da compra: ")
  leia(compra)
  se (compra >= 0) e (pago >= compra) entao
    escreval("Troco: ", pago - compra)
  senao
    escreval("Compra inválida ou pagamento insuficiente.")
  fimse
fimalgoritmo
```

A validação evita apresentar troco negativo como se fosse dinheiro a devolver.
