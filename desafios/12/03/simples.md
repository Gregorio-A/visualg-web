# Lista de presentes

**Data:** 3 de dezembro · **Nível:** Simples

## Objetivo

Some o preço de três presentes.

## Como funciona

Some exatamente três preços não negativos.

## Exemplo de execução

```text
10 + 20 + 5 → R$ 35,00
```

**Como ler o exemplo:** a seta → significa "resulta em".

Preço zero é permitido.

## Dicas para resolução

1. Use variáveis reais para dinheiro.
2. Rejeite preços negativos.
3. Some os três preços.

## Solução

```visualg
algoritmo "Desafio1203S"
var
  a, b, c: real
inicio
  escreva("Preço 1: ")
  leia(a)
  escreva("Preço 2: ")
  leia(b)
  escreva("Preço 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Total: R$ ", a+b+c:0:2)
  fimse
fimalgoritmo
```

Some os três valores lidos.
