# Retrospectiva pessoal

**Data:** 29 de dezembro · **Nível:** Simples

## Objetivo

Calcule média de quatro metas percentuais.

## Como funciona

As quatro metas têm o mesmo peso e vão de 0% a 100%.

## Exemplo de execução

```text
50%, 100%, 75%, 75% → 75%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Todas em zero dão média zero.

## Dicas para resolução

1. Leia os quatro percentuais.
2. Verifique a faixa 0 a 100.
3. Divida a soma por quatro.

## Solução

```visualg
algoritmo "Desafio1229S"
var
  a, b, c, d: real
inicio
  escreva("Meta 1 (%): ")
  leia(a)
  escreva("Meta 2 (%): ")
  leia(b)
  escreva("Meta 3 (%): ")
  leia(c)
  escreva("Meta 4 (%): ")
  leia(d)
  se (a < 0) ou (a > 100) ou (b < 0) ou (b > 100) ou (c < 0) ou (c > 100) ou (d < 0) ou (d > 100) entao
    escreval("Percentual inválido")
  senao
    escreval("Média: ", (a+b+c+d)/4:0:2, "%")
  fimse
fimalgoritmo
```

Divida a soma dos quatro percentuais por quatro.
