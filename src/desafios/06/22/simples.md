# Bandeira triangular

**Data:** 22 de junho · **Nível:** Simples

## Objetivo

Calcule a área a partir de base e altura.

## Como funciona

Use a fórmula da área do triângulo: base vezes altura dividido por dois.

## Exemplo de execução

```text
Base 6, altura 4 → área 12
```

**Como ler o exemplo:** a seta → significa "resulta em".

Base ou altura zero produz área zero.

## Dicas para resolução

1. Multiplique base por altura.
2. Divida por 2.
3. Recuse medidas negativas.

## Solução

```visualg
algoritmo "Desafio0622S"
var
base, altura: real
inicio
escreva("Base do triângulo: ")
  leia(base)
  escreva("Altura do triângulo: ")
  leia(altura)
  se (base < 0) ou (altura < 0) entao
    escreval("Medida inválida")
  senao
    escreval("Área: ", base * altura / 2)
  fimse
fimalgoritmo
```

Um triângulo ocupa metade do retângulo de mesma base e altura.
