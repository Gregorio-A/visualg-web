# Balanceamento de bagagens

**Data:** 20 de julho · **Nível:** Avançado

## Objetivo

Distribua itens em duas malas minimizando a diferença de peso.

## Como funciona

Distribua seis itens de pesos inteiros em duas malas, sem dividir itens. Examine as 64 alocações e escolha a de menor diferença absoluta de peso.

## Exemplo de execução

```text
Pesos 3 e 2, demais zero → uma mala com 3, outra com 2; diferença 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Peso negativo é tratado como zero. Empates preservam a primeira distribuição encontrada.

## Dicas para resolução

1. Enumere 2⁶ distribuições.
2. Some pesos de uma mala.
3. Compare a diferença absoluta com o melhor valor.

## Solução

```visualg
algoritmo "Desafio0720A"
var
peso: vetor[1..6] de inteiro
  i, mascara, bit, somaA, somaB, diferenca, menor, melhorMascara, total: inteiro
inicio
total <- 0
  para i de 1 ate 6 faca
    escreva("Peso inteiro do item ", i, ": ")
    leia(peso[i])
    se peso[i] < 0 entao
      peso[i] <- 0
    fimse
    total <- total + peso[i]
  fimpara
  menor <- total + 1
  melhorMascara <- 0
  para mascara de 0 ate 63 faca
    somaA <- 0
    bit <- 1
    para i de 1 ate 6 faca
      se (mascara div bit) mod 2 = 1 entao
        somaA <- somaA + peso[i]
      fimse
      bit <- bit * 2
    fimpara
    somaB <- total - somaA
    diferenca <- somaA - somaB
    se diferenca < 0 entao
      diferenca <- 0 - diferenca
    fimse
    se diferenca < menor entao
      menor <- diferenca
      melhorMascara <- mascara
    fimse
  fimpara
  escreval("Menor diferença: ", menor)
  bit <- 1
  para i de 1 ate 6 faca
    se (melhorMascara div bit) mod 2 = 1 entao
      escreval("Item ", i, " na mala A")
    senao
      escreval("Item ", i, " na mala B")
    fimse
    bit <- bit * 2
  fimpara
fimalgoritmo
```

Cada número de 0 a 63 codifica uma escolha binária de mala para os seis itens.
