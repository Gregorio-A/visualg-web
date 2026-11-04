# Orçamento de reforma

**Data:** 16 de maio · **Nível:** Simples

## Objetivo

Multiplique área de piso pelo custo por metro quadrado.

## Como funciona

Leia área em metros quadrados e custo por metro quadrado; multiplique.

## Exemplo de execução

```text
Área do piso (m²): 20
Custo por m²: 30
Custo do piso: 600
```

Área zero produz custo zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0516S"
var
area, custo, resultado: real
inicio
escreva("Área do piso (m²): ")
  leia(area)
  escreva("Custo por m²: ")
  leia(custo)
  resultado <- area * custo
  escreval("Custo do piso: ", resultado)
fimalgoritmo
```

A expressão `area * custo` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
