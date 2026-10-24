# Volume de chuva

**Data:** 7 de setembro · **Nível:** Simples

## Objetivo

Converta milímetros de chuva em litros por metro quadrado.

## Como funciona

Um milímetro de chuva sobre um metro quadrado equivale a um litro de água.

## Exemplo de execução

```text
10 mm sobre 2 m² → 20 L; 10 L/m²
```

**Como ler o exemplo:** a seta → significa "resulta em".

Área zero recebe volume zero.

## Dicas para resolução

1. Use equivalência 1 mm = 1 L/m².
2. Multiplique pela área.
3. Mostre as unidades.

## Solução

```visualg
algoritmo "Desafio0907S"
var
milimetros, area, litros: real
inicio
escreva("Chuva em milímetros: ")
  leia(milimetros)
  escreva("Área em metros quadrados: ")
  leia(area)
  se (milimetros < 0) ou (area < 0) entao
    escreval("Dados inválidos")
  senao
    litros <- milimetros * area
    escreval("Volume: ", litros, " L")
    escreval("Por metro quadrado: ", milimetros, " L/m2")
  fimse
fimalgoritmo
```

Multiplicar precipitação pela área fornece litros.
