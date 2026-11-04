# Uso da memória

**Data:** 12 de novembro · **Nível:** Simples

## Objetivo

Calcule percentual de memória ocupada.

## Como funciona

Os dois valores de memória estão na mesma unidade.

## Exemplo de execução

```text
4 GB usados de 8 GB → 50%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Memória total zero impede cálculo.

## Dicas para resolução

1. Leia total e uso.
2. Valide.
3. Divida e multiplique por cem.

## Solução

```visualg
algoritmo "Desafio1112S"
var
usada, total: real
inicio
escreva("Memória total: ")
  leia(total)
  escreva("Memória usada: ")
  leia(usada)
  se (total <= 0) ou (usada < 0) ou (usada > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Memória ocupada: ", 100 * usada / total, "%")
  fimse
fimalgoritmo
```

A razão usada/total vira percentual ao multiplicar por cem.
