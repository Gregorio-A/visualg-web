# Resfriamento automático

**Data:** 13 de novembro · **Nível:** Avançado

## Objetivo

Simule curva de ventoinha por faixas e registre mudanças de velocidade.

## Como funciona

Use curva de 20% abaixo de 40 °C, 50% de 40 até menos de 60 °C e 100% a partir de 60 °C. Registre mudanças ao longo de dez leituras.

## Exemplo de execução

```text
Temperaturas 35,45,65 °C → 20%,50%,100%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Leitura exatamente 40 entra na faixa de 50%; 60 entra em 100%.

## Dicas para resolução

1. Defina três faixas.
2. Calcule velocidade de cada leitura.
3. Conte mudanças.

## Solução

```visualg
algoritmo "Desafio1113A"
var
temperatura: vetor[1..10] de real
  i, velocidade, anterior, mudancas: inteiro
inicio
velocidade <- 0
  mudancas <- 0
  para i de 1 ate 10 faca
    escreva("Temperatura ", i, " (°C): ")
    leia(temperatura[i])
    anterior <- velocidade
    se temperatura[i] < 40 entao
      velocidade <- 20
    senao
      se temperatura[i] < 60 entao
        velocidade <- 50
      senao
        velocidade <- 100
      fimse
    fimse
    se velocidade <> anterior entao
      mudancas <- mudancas + 1
      escreval("Ventoinha mudou de ", anterior, "% para ", velocidade, "%")
    fimse
  fimpara
  escreval("Mudanças de velocidade: ", mudancas)
fimalgoritmo
```

A faixa determina a nova velocidade; compará-la à anterior detecta transições.
