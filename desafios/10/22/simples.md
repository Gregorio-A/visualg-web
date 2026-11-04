# Coro de fantasmas

**Data:** 22 de outubro · **Nível:** Simples

## Objetivo

Repita uma palavra em N linhas numeradas.

## Como funciona

Repita a mesma palavra em N linhas numeradas de 1 a N.

## Exemplo de execução

```text
BOO, N=2 → 1: BOO
2: BOO
```

**Como ler o exemplo:** a seta → significa "resulta em".

N=0 não imprime a palavra.

## Dicas para resolução

1. Leia palavra e N.
2. Use para.
3. Imprima número e palavra.

## Solução

```visualg
algoritmo "Desafio1022S"
var
palavra: caractere
  linhas, i: inteiro
inicio
escreva("Palavra do coro: ")
  leia(palavra)
  escreva("Linhas: ")
  leia(linhas)
  se linhas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate linhas faca
      escreval(i, ": ", palavra)
    fimpara
  fimse
fimalgoritmo
```

O contador gera a numeração e controla as repetições.
