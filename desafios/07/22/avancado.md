# Alertas de geada

**Data:** 22 de julho · **Nível:** Avançado

## Objetivo

Identifique períodos de risco em uma lista e conte sua duração.

## Como funciona

Leia dez medições horárias. Uma hora está em risco quando a temperatura é menor ou igual ao limiar. Conte blocos consecutivos e a duração do maior.

## Exemplo de execução

```text
Limiar 0; medições -1, -2, 2, 0 → dois períodos; maior com 2 medições
```

**Como ler o exemplo:** a seta → significa "resulta em".

Temperatura exatamente igual ao limiar conta como risco.

## Dicas para resolução

1. Marque leituras em risco.
2. Conte uma abertura de período.
3. Acompanhe o maior bloco.

## Solução

```visualg
algoritmo "Desafio0722A"
var
risco: vetor[1..10] de inteiro
  i, limite, temperatura, atual, maior, inicioAtual, inicioMaior, periodos: inteiro
inicio
escreva("Limiar de geada em °C: ")
  leia(limite)
  atual <- 0
  maior <- 0
  periodos <- 0
  para i de 1 ate 10 faca
    escreva("Temperatura da hora ", i, ": ")
    leia(temperatura)
    risco[i] <- 0
    se temperatura <= limite entao
      risco[i] <- 1
      se atual = 0 entao
        inicioAtual <- i
        periodos <- periodos + 1
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Períodos de risco: ", periodos)
  se maior > 0 entao
    escreval("Maior período: horas ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, " medições)")
  fimse
fimalgoritmo
```

Um novo período começa na transição de sem risco para risco.
