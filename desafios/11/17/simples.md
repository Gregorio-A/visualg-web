# Código de cores

**Data:** 17 de novembro · **Nível:** Simples

## Objetivo

Calcule a média inteira de três canais RGB.

## Como funciona

Use média inteira com divisão que descarta a parte fracionária.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.

## Exemplo de execução

```text
R=0, G=0, B=255 → média 85
```

**Como ler o exemplo:** a seta → significa "resulta em".

Canais devem estar entre 0 e 255.

## Dicas para resolução

1. Valide RGB.
2. Some os canais.
3. Use div 3.

## Solução

```visualg
algoritmo "Desafio1117S"
var
vermelho, verde, azul, media: inteiro
inicio
escreva("Canais RGB (0 a 255): ")
  leia(vermelho, verde, azul)
  se (vermelho < 0) ou (vermelho > 255) ou (verde < 0) ou (verde > 255) ou (azul < 0) ou (azul > 255) entao
    escreval("Canal inválido")
  senao
    media <- (vermelho + verde + azul) div 3
    escreval("Média inteira: ", media)
  fimse
fimalgoritmo
```

A soma dos três canais dividida por três produz a intensidade média.
