# Boletim ponderado

**Data:** 10 de março · **Nível:** Avançado

## Objetivo

Calcule médias de alunos com pesos de avaliação configuráveis.

## Como funciona

Leia três pesos uma vez e notas de quatro alunos em três avaliações. Divida a soma dos produtos nota × peso pela soma dos pesos.

## Exemplo de execução

```text
Pesos: 2, 1, 1; notas de Ana: 8, 10, 10
Média ponderada de Ana: 9
```

Soma dos pesos igual a zero não permite média.

## Dicas para resolução

1. Some os pesos antes de percorrer os alunos.
2. Calcule a soma ponderada de cada aluno separadamente.
3. Divida pelo total de pesos.

## Solução

```visualg
algoritmo "Desafio0310A"
var
nome: vetor[1..4] de caractere
  peso, nota: vetor[1..3] de real
  somaPesos, media, total: real
  i, prova: inteiro
inicio
somaPesos <- 0
  para prova de 1 ate 3 faca
    escreva("Peso da avaliação ", prova, ": ")
    leia(peso[prova])
    somaPesos <- somaPesos + peso[prova]
  fimpara
  se somaPesos > 0 entao
    para i de 1 ate 4 faca
      escreva("Aluno ", i, ": ")
      leia(nome[i])
      total <- 0
      para prova de 1 ate 3 faca
        escreva("Nota ", prova, ": ")
        leia(nota[prova])
        total <- total + nota[prova] * peso[prova]
      fimpara
      media <- total / somaPesos
      escreval(nome[i], ": média ponderada ", media)
    fimpara
  senao
    escreval("A soma dos pesos deve ser positiva.")
  fimse
fimalgoritmo
```

Usar os mesmos pesos para todos os alunos torna as médias comparáveis.
