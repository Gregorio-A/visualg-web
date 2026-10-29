# Férias econômicas

**Data:** 14 de janeiro · **Nível:** Simples

## Objetivo

Calcule a sobra de um orçamento após uma despesa.

Determine o saldo de um orçamento depois de uma despesa.

## Como funciona

Leia o valor disponível e o gasto e subtraia o segundo do primeiro.

## Exemplo de execução

```text
Orçamento: 100
Despesa: 35
Saldo após a despesa: 65
```

Se a despesa exceder o orçamento, o saldo negativo indica quanto faltou.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0114S"
var
orcamento, despesa, sobra: real
inicio
escreva("Orçamento: ")
  leia(orcamento)
  escreva("Despesa: ")
  leia(despesa)
  sobra <- orcamento - despesa
  escreval("Saldo após a despesa: ", sobra)
fimalgoritmo
```

A subtração conserva o sinal e deixa evidente quando houve gasto acima do previsto.
