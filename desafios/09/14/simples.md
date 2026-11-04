# Vasos no quintal

**Data:** 14 de setembro · **Nível:** Simples

## Objetivo

Multiplique linhas e colunas para descobrir a quantidade de vasos.

## Como funciona

Considere uma grade retangular com todas as posições ocupadas por um vaso.

## Exemplo de execução

```text
3 linhas × 4 colunas → 12 vasos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Grade com dimensão zero não possui vasos.

## Dicas para resolução

1. Leia linhas.
2. Leia colunas.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0914S"
var
linhas, colunas: inteiro
inicio
escreva("Linhas de vasos: ")
  leia(linhas)
  escreva("Colunas de vasos: ")
  leia(colunas)
  se (linhas < 0) ou (colunas < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de vasos: ", linhas * colunas)
  fimse
fimalgoritmo
```

Multiplicação conta todas as posições da grade.
