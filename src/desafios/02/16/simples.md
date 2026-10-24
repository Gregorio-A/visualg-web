# Preço em dupla

**Data:** 16 de fevereiro · **Nível:** Simples

## Objetivo

Divida igualmente uma compra entre duas pessoas.

## Como funciona

Divida o valor da compra em duas partes iguais.

## Exemplo de execução

```text
Valor da compra: 35
Cada pessoa paga: 17.5
```

A divisão pode produzir centavos; use uma variável real.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0216S"
var
compra, porPessoa: real
inicio
escreva("Valor da compra: ")
  leia(compra)
  porPessoa <- compra / 2
  escreval("Cada pessoa paga: ", porPessoa)
fimalgoritmo
```

Como o número de participantes é fixo, basta dividir o valor por dois.
