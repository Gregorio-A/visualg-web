# Partição equilibrada

**Data:** 28 de abril · **Nível:** Avançado

## Objetivo

Divida seis pesos em dois grupos cuja diferença absoluta de somas seja mínima.

## Como funciona

Leia seis pesos inteiros. Examine as 64 divisões possíveis entre grupos A e B e escolha uma com menor diferença absoluta entre somas.

## Exemplo de execução

```text
Pesos 1,2,3,4,5,5 → total 20; há uma divisão 10/10, diferença 0.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Trocar os nomes dos grupos não muda a diferença; em empate, a primeira máscara testada é mantida.

## Dicas para resolução

1. Calcule a soma total.
2. Enumere combinações por bits de 0 a 63.
3. Compare o valor absoluto da diferença das somas.

## Solução

```visualg
algoritmo "Desafio0428A"
var
pesos: vetor[1..6] de inteiro
  mascara, melhorMascara, i, potencia, somaA, somaB, total, diferenca, melhor: inteiro
inicio
total <- 0
  para i de 1 ate 6 faca
    escreva("Peso ", i, ": ")
    leia(pesos[i])
    total <- total + pesos[i]
  fimpara
  melhor <- 999999999
  melhorMascara <- 0
  para mascara de 0 ate 63 faca
    somaA <- 0
    potencia <- 1
    para i de 1 ate 6 faca
      se (mascara div potencia) mod 2 = 1 entao
        somaA <- somaA + pesos[i]
      fimse
      potencia <- potencia * 2
    fimpara
    somaB <- total - somaA
    diferenca <- somaA - somaB
    se diferenca < 0 entao
      diferenca <- -diferenca
    fimse
    se diferenca < melhor entao
      melhor <- diferenca
      melhorMascara <- mascara
    fimse
  fimpara
  escreval("Menor diferença: ", melhor)
  potencia <- 1
  para i de 1 ate 6 faca
    se (melhorMascara div potencia) mod 2 = 1 entao
      escreval("Peso ", i, " no grupo A")
    senao
      escreval("Peso ", i, " no grupo B")
    fimse
    potencia <- potencia * 2
  fimpara
fimalgoritmo
```

Cada bit da máscara decide em qual grupo fica um dos seis pesos; todas as 64 máscaras são avaliadas.
