# Chaves trocadas

**Data:** 3 de abril · **Nível:** Simples

## Objetivo

Receba dois valores e mostre-os em ordem inversa.

## Como funciona

Leia dois valores e apresente primeiro o segundo, depois o primeiro.

## Exemplo de execução

```text
Entradas: 4 e 9
9
4
```

Valores iguais aparecem duas vezes, sem alteração.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0403S"
var
primeiro, segundo: real
inicio
escreva("Primeiro valor: ")
  leia(primeiro)
  escreva("Segundo valor: ")
  leia(segundo)
  escreval(segundo)
  escreval(primeiro)
fimalgoritmo
```

A ordem da saída é inversa à ordem das leituras.
