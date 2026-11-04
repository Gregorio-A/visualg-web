# Doações recebidas

**Data:** 26 de dezembro · **Nível:** Simples

## Objetivo

Calcule a soma de três doações.

## Como funciona

As doações são valores não negativos em reais.

## Exemplo de execução

```text
R$ 5 + R$ 10 + R$ 15 → R$ 30
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma doação pode ser zero.

## Dicas para resolução

1. Use reais para valores monetários.
2. Leia as três doações.
3. Some e apresente duas casas decimais.

## Solução

```visualg
algoritmo "Desafio1226S"
var
  a, b, c: real
inicio
  escreva("Doação 1: ")
  leia(a)
  escreva("Doação 2: ")
  leia(b)
  escreva("Doação 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Doação inválida")
  senao
    escreval("Total: R$ ", a+b+c:0:2)
  fimse
fimalgoritmo
```

Some os três valores recebidos.
