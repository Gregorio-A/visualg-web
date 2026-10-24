# Enigma do dobro

**Data:** 11 de abril · **Nível:** Simples

## Objetivo

Descubra o número original dado seu dobro.

## Como funciona

Leia o valor que corresponde ao dobro de um número e divida-o por dois.

## Exemplo de execução

```text
Dobro: 18
Número original: 9
```

O dobro pode ser negativo ou fracionário; a divisão continua válida.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0411S"
var
dobro, original: real
inicio
escreva("Dobro do número: ")
  leia(dobro)
  original <- dobro / 2
  escreval("Número original: ", original)
fimalgoritmo
```

Dividir por dois desfaz a multiplicação pelo fator dois.
