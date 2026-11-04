# Júri de decoração

**Data:** 19 de dezembro · **Nível:** Avançado

## Objetivo

Ordene apresentações pela média ponderada de notas de jurados.

## Como funciona

Avalie quatro apresentações por três jurados, com pesos 2, 3 e 5; classifique pela média ponderada decrescente.

### Palavras úteis

- **Média ponderada:** É uma média em que algumas notas têm mais importância, definida pelos pesos.
- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Notas 10, 10, 10 → média 10; notas 0, 0, 10 → média 5.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Em empate, mantenha a ordem original de cadastro.

## Dicas para resolução

1. Leia a matriz de notas.
2. Calcule médias com pesos 2, 3 e 5.
3. Ordene preservando cada nome.

## Solução

```visualg
algoritmo "Desafio1219A"
var
  nome: vetor[1..4] de caractere
  nota: vetor[1..4,1..3] de real
  media: vetor[1..4] de real
  i, j, k: inteiro
  aux: real
  auxNome: caractere
inicio
  para i de 1 ate 4 faca
    escreva("Apresentação ", i, ": ")
    leia(nome[i])
    media[i] <- 0
    para j de 1 ate 3 faca
      repita
        escreva("Nota do jurado ", j, " (0 a 10): ")
        leia(nota[i,j])
      ate (nota[i,j] >= 0) e (nota[i,j] <= 10)
    fimpara
    media[i] <- (nota[i,1]*2+nota[i,2]*3+nota[i,3]*5)/10
  fimpara
  para i de 1 ate 3 faca
    para j de i+1 ate 4 faca
      se media[j] > media[i] entao
        aux <- media[i]
        media[i] <- media[j]
        media[j] <- aux
        auxNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", media[i]:0:2)
  fimpara
fimalgoritmo
```

A média é a soma nota×peso dividida por 10; ordene nome e média juntos.
