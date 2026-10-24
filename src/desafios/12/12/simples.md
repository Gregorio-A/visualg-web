# Caixas empilhadas

**Data:** 12 de dezembro · **Nível:** Simples

## Objetivo

Calcule a altura de N caixas iguais.

## Como funciona

As caixas têm altura igual e são empilhadas sem folga.

## Exemplo de execução

```text
5 caixas de 30 cm → 150 cm
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero caixas produz altura zero.

## Dicas para resolução

1. Leia quantidade e altura unitária.
2. Confirme que não há medidas negativas.
3. Multiplique para obter a pilha.

## Solução

```visualg
algoritmo "Desafio1212S"
var
  caixas: inteiro
  altura: real
inicio
  escreva("Caixas: ")
  leia(caixas)
  escreva("Altura de cada caixa: ")
  leia(altura)
  se (caixas < 0) ou (altura < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Altura empilhada: ", caixas*altura:0:2)
  fimse
fimalgoritmo
```

Multiplique a altura unitária pela quantidade.
