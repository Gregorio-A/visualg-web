# Agenda de estudos

**Data:** 4 de março · **Nível:** Avançado

## Objetivo

Distribua disciplinas em blocos de tempo, respeitando a carga máxima diária.

## Como funciona

Leia cinco disciplinas com duração de seus blocos. Na ordem informada, aceite somente blocos positivos que caibam na carga máxima diária.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Limite 120 min; Matemática 60, História 45, Arte 30
Matemática 0–60; História 60–105; Arte não cabe
```

Um bloco que termina exatamente no limite cabe. Blocos rejeitados não ocupam tempo.

## Dicas para resolução

1. Use minutos para todas as durações.
2. Compare `ocupada + bloco` com o limite antes de aceitar.
3. Mostre início e fim de cada bloco aceito.

## Solução

```visualg
algoritmo "Desafio0304A"
var
disciplina: vetor[1..5] de caractere
  minutos: vetor[1..5] de inteiro
  cargaMaxima, ocupada, i: inteiro
inicio
escreva("Carga máxima diária (min): ")
  leia(cargaMaxima)
  ocupada <- 0
  para i de 1 ate 5 faca
    escreva("Disciplina ", i, ": ")
    leia(disciplina[i])
    escreva("Duração do bloco (min): ")
    leia(minutos[i])
    se (minutos[i] > 0) e (ocupada + minutos[i] <= cargaMaxima) entao
      escreval(disciplina[i], ": do minuto ", ocupada, " ao ", ocupada + minutos[i])
      ocupada <- ocupada + minutos[i]
    senao
      escreval(disciplina[i], " não cabe no dia.")
    fimse
  fimpara
  escreval("Carga usada: ", ocupada)
fimalgoritmo
```

O acumulador `ocupada` indica o começo do próximo bloco aceito.
