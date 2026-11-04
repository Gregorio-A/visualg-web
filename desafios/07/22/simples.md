# Termômetro congelante

**Data:** 22 de julho · **Nível:** Simples

## Objetivo

Diga se uma temperatura é menor ou igual a zero.

## Como funciona

Considere congelante qualquer temperatura menor ou igual a zero.

## Exemplo de execução

```text
0 °C → congelante; 1 °C → acima de zero
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valores negativos são congelantes.

## Dicas para resolução

1. Leia a temperatura.
2. Use <= 0.
3. Mostre a classificação.

## Solução

```visualg
algoritmo "Desafio0722S"
var
temperatura: real
inicio
escreva("Temperatura em °C: ")
  leia(temperatura)
  se temperatura <= 0 entao
    escreval("Congelante")
  senao
    escreval("Acima de zero")
  fimse
fimalgoritmo
```

A condição <= inclui o limite zero.
