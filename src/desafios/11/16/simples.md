# Tamanho da tela

**Data:** 16 de novembro · **Nível:** Simples

## Objetivo

Multiplique largura e altura para calcular pixels.

## Como funciona

Multiplique largura e altura da imagem em pixels.

## Exemplo de execução

```text
800×600 → 480000 pixels
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma dimensão zero produz zero pixel.

## Dicas para resolução

1. Leia duas dimensões.
2. Multiplique.
3. Mostre pixels.

## Solução

```visualg
algoritmo "Desafio1116S"
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
    escreval("Pixels: ", largura * altura)
  fimse
fimalgoritmo
```

O produto conta as células da grade.
