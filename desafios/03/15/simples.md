# Notas extremas

**Data:** 15 de março · **Nível:** Simples

## Objetivo

Identifique a maior entre três notas.

## Como funciona

Leia três notas e compare cada uma com o maior valor observado até então.

## Exemplo de execução

```text
Notas: 6, 9, 8
Maior nota: 9
```

Se todas forem iguais, a maior é esse valor comum.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0315S"
var
a, b, c, maior: real
inicio
escreva("Nota 1: ")
  leia(a)
  escreva("Nota 2: ")
  leia(b)
  escreva("Nota 3: ")
  leia(c)
  maior <- a
  se b > maior entao
    maior <- b
  fimse
  se c > maior entao
    maior <- c
  fimse
  escreval("Maior nota: ", maior)
fimalgoritmo
```

Inicializar `maior` com a primeira nota funciona mesmo para valores negativos.
