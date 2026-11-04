# Comprimento da folha

**Data:** 16 de setembro · **Nível:** Simples

## Objetivo

Converta centímetros para milímetros.

## Como funciona

Cada centímetro contém dez milímetros.

## Exemplo de execução

```text
2,5 cm → 25 mm
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero cm corresponde a zero mm.

## Dicas para resolução

1. Leia cm.
2. Multiplique por dez.
3. Mostre mm.

## Solução

```visualg
algoritmo "Desafio0916S"
var
centimetros: real
inicio
escreva("Comprimento em centímetros: ")
  leia(centimetros)
  se centimetros < 0 entao
    escreval("Medida inválida")
  senao
    escreval("Comprimento: ", centimetros * 10, " mm")
  fimse
fimalgoritmo
```

A conversão multiplica a medida por dez.
