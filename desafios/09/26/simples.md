# Lâmpadas eficientes

**Data:** 26 de setembro · **Nível:** Simples

## Objetivo

Calcule economia em watts entre duas lâmpadas.

## Como funciona

Subtraia a potência da nova lâmpada da antiga.

## Exemplo de execução

```text
60 W para 10 W → economia de 50 W
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resultado negativo indica aumento de potência.

## Dicas para resolução

1. Leia as duas potências.
2. Subtraia nova de antiga.
3. Interprete o sinal.

## Solução

```visualg
algoritmo "Desafio0926S"
var
antiga, eficiente, diferenca: real
inicio
escreva("Potência da lâmpada antiga (W): ")
  leia(antiga)
  escreva("Potência da nova lâmpada (W): ")
  leia(eficiente)
  se (antiga < 0) ou (eficiente < 0) entao
    escreval("Potência inválida")
  senao
    diferenca <- antiga - eficiente
    escreval("Economia de potência: ", diferenca, " W")
  fimse
fimalgoritmo
```

A diferença compara o consumo instantâneo das duas opções.
