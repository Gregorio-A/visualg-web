# Desconto de cliente

**Data:** 7 de maio · **Nível:** Simples

## Objetivo

Verifique se uma compra alcança limite para desconto.

## Como funciona

Compare o valor da compra com o limite mínimo para oferecer desconto.

## Exemplo de execução

```text
Valor da compra: 120
Limite para desconto: 100
Desconto disponível.
```

Compra igual ao limite já alcança a condição.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0507S"
var
compra, limite: real
inicio
escreva("Valor da compra: ")
  leia(compra)
  escreva("Limite para desconto: ")
  leia(limite)
  se compra >= limite entao
    escreval("Desconto disponível.")
  senao
    escreval("Desconto indisponível.")
  fimse
fimalgoritmo
```

A comparação inclusiva `>=` traduz “alcançar o limite”.
