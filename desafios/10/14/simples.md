# Lua cheia fictícia

**Data:** 14 de outubro · **Nível:** Simples

## Objetivo

Classifique a fase conforme um índice entre 1 e 4.

## Como funciona

Associe 1 nova, 2 crescente, 3 cheia e 4 minguante.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Índice 3 → Lua cheia
```

**Como ler o exemplo:** a seta → significa "resulta em".

Índice fora de 1–4 é inválido.

## Dicas para resolução

1. Leia o índice.
2. Use escolha.
3. Inclua outrocaso.

## Solução

```visualg
algoritmo "Desafio1014S"
var
indice: inteiro
inicio
escreva("Índice da fase (1 a 4): ")
  leia(indice)
  escolha indice
    caso 1
      escreval("Lua nova")
    caso 2
      escreval("Quarto crescente")
    caso 3
      escreval("Lua cheia")
    caso 4
      escreval("Quarto minguante")
    outrocaso
      escreval("Índice inválido")
  fimescolha
fimalgoritmo
```

A seleção cobre as quatro fases do modelo fictício.
