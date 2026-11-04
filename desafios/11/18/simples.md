# Contagem de erros

**Data:** 18 de novembro · **Nível:** Simples

## Objetivo

Some as ocorrências de três tipos de falha.

## Como funciona

Some as ocorrências registradas dos três tipos de falha.

## Exemplo de execução

```text
2, 3 e 1 → 6 falhas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tipo sem ocorrência contribui com zero.

## Dicas para resolução

1. Leia três contagens.
2. Some.
3. Mostre total.

## Solução

```visualg
algoritmo "Desafio1118S"
var
a, b, c: inteiro
inicio
escreva("Falhas dos três tipos: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Contagem inválida")
  senao
    escreval("Falhas totais: ", a + b + c)
  fimse
fimalgoritmo
```

A soma representa a contagem conjunta.
