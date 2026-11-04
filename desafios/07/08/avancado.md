# Histórico noturno

**Data:** 8 de julho · **Nível:** Avançado

## Objetivo

Identifique a maior sequência de temperaturas abaixo de um limite.

## Como funciona

Em dez noites, encontre a maior sequência consecutiva com temperatura estritamente abaixo do limite informado.

## Exemplo de execução

```text
Limite 10; leituras 8,7,11,9 → maior sequência de 2 nas noites 1–2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor igual ao limite interrompe a sequência.

## Dicas para resolução

1. Compare cada leitura ao limite.
2. Conte valores consecutivos.
3. Guarde o maior trecho.

## Solução

```visualg
algoritmo "Desafio0708A"
var
temperatura: vetor[1..10] de real
  limite: real
  i, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
escreva("Limite de frio: ")
  leia(limite)
  atual <- 0
  maior <- 0
  para i de 1 ate 10 faca
    escreva("Temperatura da noite ", i, ": ")
    leia(temperatura[i])
    se temperatura[i] < limite entao
      se atual = 0 entao
        inicioAtual <- i
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
  se maior = 0 entao
    escreval("Nenhuma noite abaixo do limite")
  senao
    escreval("Maior sequência: noites ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, ")")
  fimse
fimalgoritmo
```

O contador atual zera fora da faixa; o máximo conserva início e duração da melhor sequência.
