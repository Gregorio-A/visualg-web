# Termômetro da festa

**Data:** 26 de junho · **Nível:** Avançado

## Objetivo

Analise série de medições e identifique intervalos de queda contínua.

## Como funciona

Leia oito temperaturas. Encontre a maior sequência de medições em que cada valor seja estritamente menor que o anterior.

## Exemplo de execução

```text
20,18,16,17,15,14 → maior queda nas medições 1–3, com 3 leituras
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valores iguais interrompem uma sequência de queda.

## Dicas para resolução

1. Compare leituras consecutivas.
2. Reinicie quando a temperatura não cair.
3. Guarde o melhor intervalo.

## Solução

```visualg
algoritmo "Desafio0626A"
var
temperatura: vetor[1..8] de real
  i, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
atual <- 0
  maior <- 0
  para i de 1 ate 8 faca
    escreva("Temperatura da medição ", i, ": ")
    leia(temperatura[i])
    se i > 1 entao
      se temperatura[i] < temperatura[i - 1] entao
        se atual = 0 entao
          inicioAtual <- i - 1
          atual <- 2
        senao
          atual <- atual + 1
        fimse
        se atual > maior entao
          maior <- atual
          inicioMaior <- inicioAtual
        fimse
      senao
        atual <- 0
      fimse
    fimse
  fimpara
  se maior = 0 entao
    escreval("Nenhuma queda contínua")
  senao
    escreval("Maior queda contínua: medições ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, " leituras)")
  fimse
fimalgoritmo
```

O contador acompanha a sequência atual e preserva a maior, com seu início.
