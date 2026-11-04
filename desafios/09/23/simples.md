# Altura da árvore

**Data:** 23 de setembro · **Nível:** Simples

## Objetivo

Converta metros para centímetros.

## Como funciona

Um metro contém cem centímetros.

## Exemplo de execução

```text
2,5 m → 250 cm
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero metro corresponde a zero cm.

## Dicas para resolução

1. Leia metros.
2. Multiplique por cem.
3. Mostre cm.

## Solução

```visualg
algoritmo "Desafio0923S"
var
metros: real
inicio
escreva("Altura da árvore em metros: ")
  leia(metros)
  se metros < 0 entao
    escreval("Altura inválida")
  senao
    escreval("Altura: ", metros * 100, " cm")
  fimse
fimalgoritmo
```

Multiplicar por cem muda a unidade.
