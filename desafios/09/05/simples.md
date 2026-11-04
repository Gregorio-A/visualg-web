# Tamanho do jardim

**Data:** 5 de setembro · **Nível:** Simples

## Objetivo

Calcule a área de um canteiro retangular.

## Como funciona

O canteiro é retangular e as duas medidas estão em metros.

## Exemplo de execução

```text
3 m por 4 m → 12 m²
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma medida zero produz área zero.

## Dicas para resolução

1. Leia dois lados.
2. Multiplique.
3. Mostre m².

## Solução

```visualg
algoritmo "Desafio0905S"
var
largura, comprimento: real
inicio
escreva("Largura do canteiro: ")
  leia(largura)
  escreva("Comprimento do canteiro: ")
  leia(comprimento)
  se (largura < 0) ou (comprimento < 0) entao
    escreval("Medida inválida")
  senao
    escreval("Área: ", largura * comprimento, " m2")
  fimse
fimalgoritmo
```

A área do retângulo é o produto dos lados.
