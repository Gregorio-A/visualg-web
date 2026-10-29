# Kit de inverno

**Data:** 27 de julho · **Nível:** Simples

## Objetivo

Some o preço de três peças.

## Como funciona

O kit contém exatamente uma unidade de cada uma das três peças.

## Exemplo de execução

```text
R$ 10, R$ 15 e R$ 5 → R$ 30
```

**Como ler o exemplo:** a seta → significa "resulta em".

Peça gratuita pode custar zero.

## Dicas para resolução

1. Leia três preços.
2. Some.
3. Mostre em reais.

## Solução

```visualg
algoritmo "Desafio0727S"
var
primeira, segunda, terceira: real
inicio
escreva("Preço da peça 1: ")
  leia(primeira)
  escreva("Preço da peça 2: ")
  leia(segunda)
  escreva("Preço da peça 3: ")
  leia(terceira)
  se (primeira < 0) ou (segunda < 0) ou (terceira < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Kit: R$ ", primeira + segunda + terceira)
  fimse
fimalgoritmo
```

O preço do kit soma seus componentes.
