# Monitor de desempenho

**Data:** 4 de agosto · **Nível:** Avançado

## Objetivo

Analise série de FPS e calcule média, mínima e percentual abaixo de 30.

## Como funciona

Leia dez medições de FPS. Calcule média, mínimo e a porcentagem de amostras estritamente abaixo de 30.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Três amostras abaixo de 30 em dez → 30%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor negativo é tratado como zero nesta simulação.

## Dicas para resolução

1. Some leituras para a média.
2. Guarde o menor valor.
3. Conte as leituras abaixo de 30.

## Solução

```visualg
algoritmo "Desafio0804A"
var
fps: vetor[1..10] de real
  i, baixos: inteiro
  soma, menor: real
inicio
soma <- 0
  menor <- 999999999
  baixos <- 0
  para i de 1 ate 10 faca
    escreva("FPS da medição ", i, ": ")
    leia(fps[i])
    se fps[i] < 0 entao
      fps[i] <- 0
    fimse
    soma <- soma + fps[i]
    se fps[i] < menor entao
      menor <- fps[i]
    fimse
    se fps[i] < 30 entao
      baixos <- baixos + 1
    fimse
  fimpara
  escreval("Média: ", soma / 10, " FPS")
  escreval("Mínima: ", menor, " FPS")
  escreval("Abaixo de 30 FPS: ", baixos * 10, "%")
fimalgoritmo
```

Com dez amostras, cada ocorrência abaixo de 30 equivale a dez pontos percentuais.
