# Resistor elétrico

**Data:** 4 de novembro · **Nível:** Simples

## Objetivo

Calcule a corrente usando tensão e resistência positiva.

## Como funciona

Use a lei de Ohm I=V/R para resistência positiva.

## Exemplo de execução

```text
12 V e 6 ohms → 2 A
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resistência zero impede o cálculo.

## Dicas para resolução

1. Leia V e R.
2. Valide R > 0.
3. Divida.

## Solução

```visualg
algoritmo "Desafio1104S"
var
tensao, resistencia: real
inicio
escreva("Tensão em volts: ")
  leia(tensao)
  escreva("Resistência em ohms: ")
  leia(resistencia)
  se resistencia <= 0 entao
    escreval("Resistência deve ser positiva")
  senao
    escreval("Corrente: ", tensao / resistencia, " A")
  fimse
fimalgoritmo
```

Dividir tensão pela resistência fornece a corrente.
