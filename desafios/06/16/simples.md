# Quentão sem álcool

**Data:** 16 de junho · **Nível:** Simples

## Objetivo

Calcule o volume total de bebida em copos iguais.

## Como funciona

Multiplique a quantidade de copos pelo volume de cada um.

## Exemplo de execução

```text
8 copos de 200 mL → 1600 mL
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero copos corresponde a zero mL.

## Dicas para resolução

1. Leia copos.
2. Leia mL por copo.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0616S"
var
copos: inteiro
  volume: real
inicio
escreva("Número de copos: ")
  leia(copos)
  escreva("Volume por copo (mL): ")
  leia(volume)
  se (copos < 0) ou (volume < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Volume total: ", copos * volume, " mL")
  fimse
fimalgoritmo
```

Copos iguais permitem calcular o volume por multiplicação.
