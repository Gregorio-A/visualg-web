# Chaves misteriosas

**Data:** 23 de outubro · **Nível:** Simples

## Objetivo

Some os códigos de duas chaves.

Crie um algoritmo que receba os dois códigos e mostre a soma. Cada código é representado por um número inteiro; o programa não precisa abrir uma porta nem comparar a soma com uma senha.

## Como funciona

1. Peça o código da primeira chave.
2. Peça o código da segunda chave.
3. Some os dois valores e apresente o resultado.

Os códigos podem ser zero ou negativos. Use variáveis do tipo `inteiro` para guardar os valores e a soma.

## Exemplo de execução

```text
Código da primeira chave: 12
Código da segunda chave: 8
Soma dos códigos: 20
```

Com `-3` e `7`, o resultado deve ser `4`.

## Dicas para resolução

1. Declare três variáveis: uma para cada código e outra para o resultado.
2. Use `leia` para receber os valores após mostrar a pergunta com `escreva`.
3. O operador `+` produz a soma. Guarde o resultado com `<-` antes de exibi-lo.

## Solução

```visualg
algoritmo "ChavesMisteriosas"
var
  primeira, segunda, soma: inteiro
inicio
  escreva("Código da primeira chave: ")
  leia(primeira)
  escreva("Código da segunda chave: ")
  leia(segunda)

  soma <- primeira + segunda
  escreval("Soma dos códigos: ", soma)
fimalgoritmo
```

O algoritmo lê os dois inteiros, guarda a adição em `soma` e imprime o valor. Ele também funciona quando um dos códigos é zero ou negativo.
