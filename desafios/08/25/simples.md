# Armazenamento de fotos

**Data:** 25 de agosto · **Nível:** Simples

## Objetivo

Calcule espaço de N imagens iguais.

## Como funciona

Considere todas as imagens com o mesmo tamanho.

## Exemplo de execução

```text
50 imagens de 2 MB → 100 MB
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero imagem usa zero MB.

## Dicas para resolução

1. Leia número e tamanho.
2. Multiplique.
3. Mostre MB.

## Solução

```visualg
algoritmo "Desafio0825S"
var
imagens: inteiro
  porImagem: real
inicio
escreva("Número de imagens: ")
  leia(imagens)
  escreva("Espaço por imagem (MB): ")
  leia(porImagem)
  se (imagens < 0) ou (porImagem < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Espaço total: ", imagens * porImagem, " MB")
  fimse
fimalgoritmo
```

A multiplicação fornece o armazenamento conjunto.
