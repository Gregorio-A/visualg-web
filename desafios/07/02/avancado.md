# Ranking de cidades frias

**Data:** 2 de julho · **Nível:** Avançado

## Objetivo

Cadastre temperaturas de localidades e ordene da mais fria à mais quente.

## Como funciona

Cadastre cinco cidades e ordene suas temperaturas em ordem crescente, da mais fria para a mais quente.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
A: 4 °C, B: -2 °C → B aparece antes de A
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate mantém a ordem de cadastro.

## Dicas para resolução

1. Guarde nomes e valores no mesmo índice.
2. Compare temperaturas.
3. Troque os dois campos juntos.

## Solução

```visualg
algoritmo "Desafio0702A"
var
cidade: vetor[1..5] de caractere
  temperatura: vetor[1..5] de real
  i, j: inteiro
  trocaT: real
  trocaN: caractere
inicio
para i de 1 ate 5 faca
    escreva("Cidade ", i, ": ")
    leia(cidade[i])
    escreva("Temperatura: ")
    leia(temperatura[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se temperatura[j] < temperatura[i] entao
        trocaT <- temperatura[i]
        temperatura[i] <- temperatura[j]
        temperatura[j] <- trocaT
        trocaN <- cidade[i]
        cidade[i] <- cidade[j]
        cidade[j] <- trocaN
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º ", cidade[i], ": ", temperatura[i], " °C")
  fimpara
fimalgoritmo
```

A ordenação move cidade e temperatura juntas para preservar a associação.
