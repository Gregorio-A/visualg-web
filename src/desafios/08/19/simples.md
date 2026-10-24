# Pixels coloridos

**Data:** 19 de agosto · **Nível:** Simples

## Objetivo

Calcule quantos pixels existem numa imagem de largura e altura informadas.

## Como funciona

Imagem retangular tem largura multiplicada pela altura em pixels.

## Exemplo de execução

```text
800 × 600 → 480000 pixels
```

**Como ler o exemplo:** a seta → significa "resulta em".

Dimensão zero resulta em zero pixel.

## Dicas para resolução

1. Leia largura.
2. Leia altura.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0819S"
var
largura, altura: inteiro
inicio
escreva("Largura em pixels: ")
  leia(largura)
  escreva("Altura em pixels: ")
  leia(altura)
  se (largura < 0) ou (altura < 0) entao
    escreval("Dimensão inválida")
  senao
    escreval("Pixels totais: ", largura * altura)
  fimse
fimalgoritmo
```

A multiplicação conta todas as posições da grade.
