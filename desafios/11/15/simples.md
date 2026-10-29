# Senha provisória

**Data:** 15 de novembro · **Nível:** Simples

## Objetivo

Compare dois textos e diga se são iguais.

## Como funciona

Compare textos exatamente, inclusive maiúsculas e minúsculas.

## Exemplo de execução

```text
abc e abc → iguais
```

**Como ler o exemplo:** a seta → significa "resulta em".

Abc e abc são diferentes.

## Dicas para resolução

1. Leia dois textos.
2. Use =.
3. Mostre o resultado.

## Solução

```visualg
algoritmo "Desafio1115S"
var
a, b: caractere
inicio
escreva("Primeiro texto: ")
  leia(a)
  escreva("Segundo texto: ")
  leia(b)
  se a = b entao
    escreval("Textos iguais")
  senao
    escreval("Textos diferentes")
  fimse
fimalgoritmo
```

O operador de igualdade compara os valores completos.
