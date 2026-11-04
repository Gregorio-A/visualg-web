# Otimizador de tecido

**Data:** 22 de junho · **Nível:** Avançado

## Objetivo

Estime quantas bandeiras retangulares de recorte cabem em peças de tecido.

## Como funciona

Cada bandeira triangular será cortada de um retângulo próprio. Calcule quantos retângulos cabem em uma peça de tecido, sem rotação e sem reaproveitar sobras.

## Exemplo de execução

```text
Tecido 10×6, recorte 3×2 → 3 colunas × 3 linhas = 9 recortes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Recorte maior que o tecido em qualquer dimensão resulta em zero bandeiras.

## Dicas para resolução

1. Divida largura por largura.
2. Divida altura por altura.
3. Multiplique as quantidades inteiras.

## Solução

```visualg
algoritmo "Desafio0622A"
var
larguraTecido, alturaTecido, larguraRecorte, alturaRecorte: real
  horizontal, vertical, total: inteiro
inicio
escreva("Largura e altura do tecido: ")
  leia(larguraTecido, alturaTecido)
  escreva("Largura e altura do recorte retangular: ")
  leia(larguraRecorte, alturaRecorte)
  se (larguraTecido < 0) ou (alturaTecido < 0) ou (larguraRecorte <= 0) ou (alturaRecorte <= 0) entao
    escreval("Medidas inválidas")
  senao
    horizontal <- int(larguraTecido / larguraRecorte)
    vertical <- int(alturaTecido / alturaRecorte)
    total <- horizontal * vertical
    escreval("Recortes sem rotação: ", total)
    escreval("Sobras: ", larguraTecido - horizontal * larguraRecorte, " de largura; ", alturaTecido - vertical * alturaRecorte, " de altura")
  fimse
fimalgoritmo
```

A divisão inteira em largura e altura determina a grade de recortes.
