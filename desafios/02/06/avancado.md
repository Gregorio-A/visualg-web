# Concurso de fantasias

**Data:** 6 de fevereiro · **Nível:** Avançado

## Objetivo

Guarde notas de jurados e calcule classificação descartando maior e menor.

## Como funciona

Para cada uma de três fantasias, leia cinco notas. Descarte exatamente uma maior e uma menor nota; calcule a média das três restantes e classifique as fantasias da maior média para a menor.

## Exemplo de execução

```text
Fantasia A: 1, 8, 8, 8, 10 → média 8
Fantasia B: 1, 9, 9, 9, 10 → média 9
Fantasia C: 1, 7, 7, 7, 10 → média 7
Ranking: B, A, C
```

**Como ler o exemplo:** a seta → significa "resulta em".

Extremos empatados ainda são descartados uma única vez cada.

## Dicas para resolução

1. Some as cinco notas enquanto procura extremos.
2. Divida a soma restante por três.
3. Na ordenação, mantenha o nome ligado à média.

## Solução

```visualg
algoritmo "Desafio0206A"
var
nome: vetor[1..3] de caractere
  media: vetor[1..3] de real
  nota, soma, menor, maior, temp: real
  i, j, avaliador: inteiro
  tempNome: caractere
inicio
para i de 1 ate 3 faca
    escreva("Fantasia ", i, ": ")
    leia(nome[i])
    soma <- 0
    para avaliador de 1 ate 5 faca
      escreva("Nota do jurado ", avaliador, ": ")
      leia(nota)
      soma <- soma + nota
      se (avaliador = 1) ou (nota < menor) entao
        menor <- nota
      fimse
      se (avaliador = 1) ou (nota > maior) entao
        maior <- nota
      fimse
    fimpara
    media[i] <- (soma - menor - maior) / 3
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se media[j] > media[i] entao
        temp <- media[i]
        media[i] <- media[j]
        media[j] <- temp
        tempNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- tempNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º: ", nome[i], " — média ", media[i])
  fimpara
fimalgoritmo
```

Subtrair maior e menor da soma de cinco notas deixa três avaliações; o ranking troca nomes junto com médias.
