# Primeiro byte

**Data:** 1 de novembro · **Nível:** Simples

## Objetivo

Converta bytes para bits multiplicando por oito.

## Como funciona

Um byte contém oito bits.

## Exemplo de execução

```text
3 bytes → 24 bits
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero byte é zero bit.

## Dicas para resolução

1. Leia bytes.
2. Multiplique por oito.
3. Mostre bits.

## Solução

```visualg
algoritmo "Desafio1101S"
var
bytes: inteiro
inicio
escreva("Bytes: ")
  leia(bytes)
  se bytes < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Bits: ", bytes * 8)
  fimse
fimalgoritmo
```

Multiplicar por oito converte a quantidade.
