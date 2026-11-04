# Ponto comercial

**Data:** 9 de maio · **Nível:** Simples

## Objetivo

Calcule área de uma loja retangular.

## Como funciona

Leia comprimento e largura em metros e calcule a área retangular.

## Exemplo de execução

```text
Comprimento da loja (m): 10
Largura da loja (m): 4
Área (m²): 40
```

Se uma dimensão for zero, a área é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0509S"
var
comprimento, largura, resultado: real
inicio
escreva("Comprimento da loja (m): ")
  leia(comprimento)
  escreva("Largura da loja (m): ")
  leia(largura)
  resultado <- comprimento * largura
  escreval("Área (m²): ", resultado)
fimalgoritmo
```

A expressão `comprimento * largura` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
