# Frequência de letras

**Data:** 14 de abril · **Nível:** Avançado

## Objetivo

Conte ocorrências das letras A a Z e apresente as três mais frequentes.

## Como funciona

Leia uma frase com letras maiúsculas A–Z. Conte cada letra, ignore espaços e sinais e mostre as três letras mais frequentes.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Frase: ABACA
1º A (3), 2º B (1), 3º C (1)
```

Empates usam a ordem alfabética porque a varredura escolhe o primeiro máximo.

## Dicas para resolução

1. Crie um contador para cada letra.
2. Converta letras em índices.
3. Procure o maior contador três vezes, removendo o escolhido.

## Solução

```visualg
algoritmo "Desafio0414A"
var
texto, letra: caractere
  frequencia: vetor[1..26] de inteiro
  i, j, codigo, melhor, primeira, segunda, terceira: inteiro
inicio
escreva("Frase com letras maiúsculas A a Z: ")
  leia(texto)
  para i de 1 ate 26 faca
    frequencia[i] <- 0
  fimpara
  para i de 1 ate compr(texto) faca
    letra <- copia(texto, i, 1)
    codigo <- asc(letra)
    se (codigo >= 65) e (codigo <= 90) entao
      frequencia[codigo - 64] <- frequencia[codigo - 64] + 1
    fimse
  fimpara
  para j de 1 ate 3 faca
    melhor <- 1
    para i de 2 ate 26 faca
      se frequencia[i] > frequencia[melhor] entao
        melhor <- i
      fimse
    fimpara
    escreval(j, "º: ", carac(melhor + 64), " (", frequencia[melhor], ")")
    frequencia[melhor] <- -1
  fimpara
fimalgoritmo
```

O código ASCII da letra fornece o índice de 1 a 26. Após mostrar uma letra, sua contagem é marcada para não ser escolhida de novo.
