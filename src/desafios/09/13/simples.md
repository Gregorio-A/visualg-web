# Pegada do transporte

**Data:** 13 de setembro · **Nível:** Simples

## Objetivo

Calcule emissões estimadas por distância usando taxa informada.

## Como funciona

Considere taxa de emissão constante por quilômetro.

## Exemplo de execução

```text
100 km a 0,2 kg/km → 20 kg
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero distância produz zero emissão.

## Dicas para resolução

1. Leia km.
2. Leia kg/km.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0913S"
var
distancia, taxa: real
inicio
escreva("Distância percorrida em km: ")
  leia(distancia)
  escreva("Emissão estimada em kg por km: ")
  leia(taxa)
  se (distancia < 0) ou (taxa < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Emissão estimada: ", distancia * taxa, " kg")
  fimse
fimalgoritmo
```

A emissão é distância multiplicada pela taxa.
