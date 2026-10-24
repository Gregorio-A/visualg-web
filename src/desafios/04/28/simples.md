# Balança de números

**Data:** 28 de abril · **Nível:** Simples

## Objetivo

Compare duas somas e indique a maior.

## Como funciona

Leia dois pares de números. Some cada par e compare os dois resultados.

## Exemplo de execução

```text
Primeiro par: 2 e 5; segundo par: 3 e 1
Primeira soma é maior: 7
```

Somas iguais devem produzir mensagem de empate.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0428S"
var
a, b, c, d, somaA, somaB: real
inicio
escreva("Valor A1: ")
  leia(a)
  escreva("Valor A2: ")
  leia(b)
  escreva("Valor B1: ")
  leia(c)
  escreva("Valor B2: ")
  leia(d)
  somaA <- a + b
  somaB <- c + d
  se somaA > somaB entao
    escreval("Primeira soma é maior: ", somaA)
  senao
    se somaB > somaA entao
      escreval("Segunda soma é maior: ", somaB)
    senao
      escreval("As duas somas são iguais: ", somaA)
    fimse
  fimse
fimalgoritmo
```

Comparar as somas depois de calculadas evita confundir valores individuais com os totais.
