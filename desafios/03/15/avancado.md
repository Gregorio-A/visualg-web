# Estatísticas da turma

**Data:** 15 de março · **Nível:** Avançado

## Objetivo

Calcule mínima, máxima, média e mediana de notas em vetor.

## Como funciona

Leia sete notas e calcule mínimo, máximo, média aritmética e mediana. Como há sete valores, a mediana é o quarto após ordenação.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Notas: 1, 2, 3, 4, 5, 6, 7
Mínima: 1; máxima: 7; média: 4; mediana: 4
```

Notas repetidas permanecem na ordenação e entram normalmente na média e mediana.

## Dicas para resolução

1. Calcule a soma durante a leitura.
2. Ordene as sete notas.
3. A quarta posição é a mediana para quantidade ímpar de sete.

## Solução

```visualg
algoritmo "Desafio0315A"
var
notas: vetor[1..7] de real
  i, j: inteiro
  soma, minimo, maximo, mediana, aux: real
inicio
soma <- 0
  para i de 1 ate 7 faca
    escreva("Nota ", i, ": ")
    leia(notas[i])
    soma <- soma + notas[i]
    se (i = 1) ou (notas[i] < minimo) entao
      minimo <- notas[i]
    fimse
    se (i = 1) ou (notas[i] > maximo) entao
      maximo <- notas[i]
    fimse
  fimpara
  para i de 1 ate 6 faca
    para j de i + 1 ate 7 faca
      se notas[j] < notas[i] entao
        aux <- notas[i]
        notas[i] <- notas[j]
        notas[j] <- aux
      fimse
    fimpara
  fimpara
  mediana <- notas[4]
  escreval("Mínima: ", minimo)
  escreval("Máxima: ", maximo)
  escreval("Média: ", soma / 7)
  escreval("Mediana: ", mediana)
fimalgoritmo
```

A soma é feita antes da ordenação; mínimo e máximo são observados na leitura; a mediana vem da posição central do vetor ordenado.
