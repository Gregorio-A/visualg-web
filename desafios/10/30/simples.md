# Festa dos monstros

**Data:** 30 de outubro · **Nível:** Simples

## Objetivo

Conte convidados a partir de três grupos.

## Como funciona

Some os convidados de três grupos.

## Exemplo de execução

```text
3, 5 e 2 → 10 convidados
```

**Como ler o exemplo:** a seta → significa "resulta em".

Grupo vazio contribui com zero.

## Dicas para resolução

1. Leia os três grupos.
2. Some.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio1030S"
var
primeiro, segundo, terceiro: inteiro
inicio
escreva("Convidados do grupo 1: ")
  leia(primeiro)
  escreva("Convidados do grupo 2: ")
  leia(segundo)
  escreva("Convidados do grupo 3: ")
  leia(terceiro)
  se (primeiro < 0) ou (segundo < 0) ou (terceiro < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de convidados: ", primeiro + segundo + terceiro)
  fimse
fimalgoritmo
```

O total reúne as três quantidades independentes.
