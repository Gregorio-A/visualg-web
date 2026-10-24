# Simulador de dados

**Data:** 10 de agosto · **Nível:** Avançado

## Objetivo

Processe uma sequência de lançamentos e calcule frequência e sequências de resultados.

## Como funciona

Leia doze resultados de um dado. Conte a frequência de cada face e a maior sequência consecutiva da mesma face.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Resultados 2,2,2,4 → face 2 três vezes; maior sequência 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resultado fora de 1–6 interrompe a sequência e não entra nas frequências.

## Dicas para resolução

1. Conte cada face por índice.
2. Compare com lançamento anterior.
3. Atualize o maior trecho.

## Solução

```visualg
algoritmo "Desafio0810A"
var
frequencia: vetor[1..6] de inteiro
  i, dado, atual, maior, anterior: inteiro
inicio
para i de 1 ate 6 faca
    frequencia[i] <- 0
  fimpara
  atual <- 0
  maior <- 0
  anterior <- 0
  para i de 1 ate 12 faca
    escreva("Lançamento ", i, " (1 a 6): ")
    leia(dado)
    se (dado >= 1) e (dado <= 6) entao
      frequencia[dado] <- frequencia[dado] + 1
      se dado = anterior entao
        atual <- atual + 1
      senao
        atual <- 1
      fimse
      anterior <- dado
      se atual > maior entao
        maior <- atual
      fimse
    senao
      atual <- 0
      anterior <- 0
    fimse
  fimpara
  para i de 1 ate 6 faca
    escreval("Face ", i, ": ", frequencia[i], " vez(es)")
  fimpara
  escreval("Maior sequência da mesma face: ", maior)
fimalgoritmo
```

O vetor conta faces; dois contadores acompanham sequência atual e máxima.
