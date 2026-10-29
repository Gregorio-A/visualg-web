# Fechamento da loja

**Data:** 30 de maio · **Nível:** Simples

## Objetivo

Calcule a diferença entre saldo inicial e final de caixa.

## Como funciona

Leia os saldos no início e no fim do dia. Calcule final menos inicial; sinal positivo indica aumento.

## Exemplo de execução

```text
Saldo inicial: 100
Saldo final: 140
Variação do caixa: 40
```

Se os saldos forem iguais, a variação é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0530S"
var
inicial, final, resultado: real
inicio
escreva("Saldo inicial: ")
  leia(inicial)
  escreva("Saldo final: ")
  leia(final)
  resultado <- final - inicial
  escreval("Variação do caixa: ", resultado)
fimalgoritmo
```

A expressão `final - inicial` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
