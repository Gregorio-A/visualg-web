# Resumo das férias

**Data:** 31 de janeiro · **Nível:** Simples

## Objetivo

Leia três despesas e apresente total e média.

Resuma três despesas mostrando o gasto total e a média por despesa.

## Como funciona

Leia três valores. Some-os uma vez; use esse total para calcular a média aritmética.

## Exemplo de execução

```text
Despesa 1: 10
Despesa 2: 20
Despesa 3: 30
Total: 60
Média: 20
```

Se as três despesas forem zero, total e média também serão zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0131S"
var
primeira, segunda, terceira, total, media: real
inicio
escreva("Despesa 1: ")
  leia(primeira)
  escreva("Despesa 2: ")
  leia(segunda)
  escreva("Despesa 3: ")
  leia(terceira)
  total <- primeira + segunda + terceira
  media <- total / 3
  escreval("Total: ", total)
  escreval("Média: ", media)
fimalgoritmo
```

Reutilizar a variável `total` evita somar os mesmos valores duas vezes.
