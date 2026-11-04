# Associação de resistores

**Data:** 4 de novembro · **Nível:** Avançado

## Objetivo

Calcule resistência equivalente de redes simples em série e paralelo.

## Como funciona

Para dois resistores positivos, série soma resistências e paralelo usa R1×R2/(R1+R2).

## Exemplo de execução

```text
Dois resistores de 10 ohms → série 20 ohms, paralelo 5 ohms
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resistência zero ou negativa é recusada neste modelo.

## Dicas para resolução

1. Leia duas resistências.
2. Some para série.
3. Use produto sobre soma para paralelo.

## Solução

```visualg
algoritmo "Desafio1104A"
var
r1, r2, serie, paralelo: real
inicio
escreva("Resistor 1 em ohms: ")
  leia(r1)
  escreva("Resistor 2 em ohms: ")
  leia(r2)
  se (r1 <= 0) ou (r2 <= 0) entao
    escreval("Resistências devem ser positivas")
  senao
    serie <- r1 + r2
    paralelo <- r1 * r2 / (r1 + r2)
    escreval("Equivalente em série: ", serie, " ohms")
    escreval("Equivalente em paralelo: ", paralelo, " ohms")
  fimse
fimalgoritmo
```

As duas fórmulas representam topologias elétricas diferentes para os mesmos componentes.
