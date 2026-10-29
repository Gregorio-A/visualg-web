# Avaliação por critérios

**Data:** 13 de fevereiro · **Nível:** Avançado

## Objetivo

Aplique pesos configuráveis a notas de cinco fantasias e ordene resultados.

## Como funciona

Leia três pesos e as três notas de cada uma de cinco fantasias. Calcule a média ponderada e ordene as fantasias por pontuação decrescente.

### Palavras úteis

- **Média ponderada:** É uma média em que algumas notas têm mais importância, definida pelos pesos.

## Exemplo de execução

```text
Pesos: 2, 1, 1
Fantasia A: notas 8, 10, 10 → média 9
Fantasia B: notas 10, 10, 10 → média 10
B aparece antes de A no ranking
```

**Como ler o exemplo:** a seta → significa "resulta em".

Com soma dos pesos igual a zero não há média válida. Empates mantêm a ordem inicial.

## Dicas para resolução

1. Valide a soma dos pesos.
2. Calcule a média de cada fantasia antes de ordenar.
3. Ordene média e nome juntos.

## Solução

```visualg
algoritmo "Desafio0213A"
var
fantasia: vetor[1..5] de caractere
  media: vetor[1..5] de real
  peso1, peso2, peso3, nota1, nota2, nota3, temp: real
  tempNome: caractere
  i, j: inteiro
inicio
escreva("Peso do critério 1: ")
  leia(peso1)
  escreva("Peso do critério 2: ")
  leia(peso2)
  escreva("Peso do critério 3: ")
  leia(peso3)
  se peso1 + peso2 + peso3 > 0 entao
    para i de 1 ate 5 faca
      escreva("Fantasia ", i, ": ")
      leia(fantasia[i])
      escreva("Nota 1: ")
      leia(nota1)
      escreva("Nota 2: ")
      leia(nota2)
      escreva("Nota 3: ")
      leia(nota3)
      media[i] <- (nota1 * peso1 + nota2 * peso2 + nota3 * peso3) / (peso1 + peso2 + peso3)
    fimpara
    para i de 1 ate 4 faca
      para j de i + 1 ate 5 faca
        se media[j] > media[i] entao
          temp <- media[i]
          media[i] <- media[j]
          media[j] <- temp
          tempNome <- fantasia[i]
          fantasia[i] <- fantasia[j]
          fantasia[j] <- tempNome
        fimse
      fimpara
    fimpara
    para i de 1 ate 5 faca
      escreval(i, "º: ", fantasia[i], " — ", media[i])
    fimpara
  senao
    escreval("A soma dos pesos deve ser positiva.")
  fimse
fimalgoritmo
```

A soma ponderada é dividida pela soma dos pesos; nome e média são trocados juntos na ordenação.
