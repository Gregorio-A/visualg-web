# Chocolate quente

**Data:** 6 de julho · **Nível:** Simples

## Objetivo

Converta litros de leite em mililitros.

## Como funciona

Cada litro contém mil mililitros.

## Exemplo de execução

```text
1,5 L → 1500 mL
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero litro é zero mililitro.

## Dicas para resolução

1. Leia litros.
2. Multiplique por 1000.
3. Mostre mL.

## Solução

```visualg
algoritmo "Desafio0706S"
var
litros: real
inicio
escreva("Litros de leite: ")
  leia(litros)
  se litros < 0 entao
    escreval("Volume inválido")
  senao
    escreval("Mililitros: ", litros * 1000)
  fimse
fimalgoritmo
```

A conversão muda a unidade multiplicando por mil.
