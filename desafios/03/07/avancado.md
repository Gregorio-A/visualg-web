# Organizador de disciplinas

**Data:** 7 de março · **Nível:** Avançado

## Objetivo

Cadastre cinco matérias e ordene por carga horária.

## Como funciona

Cadastre cinco matérias e cargas horárias. Ordene do maior número de horas para o menor, conservando a associação entre nome e carga.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Matérias: Matemática 6h, História 3h, Arte 2h, Inglês 4h, Ciências 5h
Ordem: Matemática, Ciências, Inglês, História, Arte
```

Em empate, a ordem de cadastro é mantida.

## Dicas para resolução

1. Guarde nomes e cargas em vetores paralelos.
2. Compare cargas em ordem decrescente.
3. Troque os nomes quando trocar cargas.

## Solução

```visualg
algoritmo "Desafio0307A"
var
materia: vetor[1..5] de caractere
  carga: vetor[1..5] de inteiro
  i, j, aux: inteiro
  auxNome: caractere
inicio
para i de 1 ate 5 faca
    escreva("Matéria ", i, ": ")
    leia(materia[i])
    escreva("Carga horária: ")
    leia(carga[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se carga[j] > carga[i] entao
        aux <- carga[i]
        carga[i] <- carga[j]
        carga[j] <- aux
        auxNome <- materia[i]
        materia[i] <- materia[j]
        materia[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", materia[i], " — ", carga[i], " hora(s)")
  fimpara
fimalgoritmo
```

A cada troca por carga horária, o nome correspondente também troca de posição.
