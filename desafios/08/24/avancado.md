# Diagnóstico de conexão

**Data:** 24 de agosto · **Nível:** Avançado

## Objetivo

Identifique picos e estime percentis simples a partir de amostras ordenadas.

## Como funciona

Leia dez latências, conte valores estritamente acima do limite e ordene as amostras. A mediana é a média das posições 5 e 6; P90 usa a 9ª posição.

## Exemplo de execução

```text
Amostras 1 a 10 ms → mediana 5,5 ms; P90 por posição 9 ms
```

**Como ler o exemplo:** a seta → significa "resulta em".

Este P90 usa a regra de posto mais próximo, sem interpolação.

## Dicas para resolução

1. Conte picos antes da ordenação.
2. Ordene crescente.
3. Leia as posições centrais e a nona.

## Solução

```visualg
algoritmo "Desafio0824A"
var
latencia: vetor[1..10] de real
  i, j, p90, p50, picos: inteiro
  troca, limite: real
inicio
escreva("Limite de pico em ms: ")
  leia(limite)
  picos <- 0
  para i de 1 ate 10 faca
    escreva("Latência ", i, " em ms: ")
    leia(latencia[i])
    se latencia[i] > limite entao
      picos <- picos + 1
    fimse
  fimpara
  para i de 1 ate 9 faca
    para j de i + 1 ate 10 faca
      se latencia[j] < latencia[i] entao
        troca <- latencia[i]
        latencia[i] <- latencia[j]
        latencia[j] <- troca
      fimse
    fimpara
  fimpara
  escreval("Picos acima do limite: ", picos)
  escreval("Mediana: ", (latencia[5] + latencia[6]) / 2, " ms")
  escreval("Percentil 90 por posição (9º de 10): ", latencia[9], " ms")
fimalgoritmo
```

Ordenar as dez amostras coloca mediana e percentil em posições conhecidas.
