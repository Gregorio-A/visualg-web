# Névoa intensa

**Data:** 20 de outubro · **Nível:** Simples

## Objetivo

Classifique visibilidade numérica acima ou abaixo de um limite.

## Como funciona

Visibilidade abaixo do limite caracteriza névoa intensa.

## Exemplo de execução

```text
50 m, limite 100 m → névoa intensa
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade não fica abaixo do limite.

## Dicas para resolução

1. Leia medida e limite.
2. Use <.
3. Mostre a classificação.

## Solução

```visualg
algoritmo "Desafio1020S"
var
visibilidade, limite: real
inicio
escreva("Visibilidade medida (m): ")
  leia(visibilidade)
  escreva("Limite de névoa intensa (m): ")
  leia(limite)
  se (visibilidade < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    se visibilidade < limite entao
      escreval("Névoa intensa")
    senao
      escreval("Visibilidade no limite ou melhor")
    fimse
  fimse
fimalgoritmo
```

A condição estrita < separa os estados.
