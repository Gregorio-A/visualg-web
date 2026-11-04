# Receita da oficina

**Data:** 19 de maio · **Nível:** Simples

## Objetivo

Some os valores de três serviços.

## Como funciona

Leia três preços de serviços e some-os.

## Exemplo de execução

```text
Serviço 1: 10
Serviço 2: 20
Serviço 3: 30
Total dos serviços: 60
```

Serviço gratuito contribui com zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0519S"
var
a, b, c, resultado: real
inicio
escreva("Serviço 1: ")
  leia(a)
  escreva("Serviço 2: ")
  leia(b)
  escreva("Serviço 3: ")
  leia(c)
  resultado <- a + b + c
  escreval("Total dos serviços: ", resultado)
fimalgoritmo
```

A expressão `a + b + c` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
