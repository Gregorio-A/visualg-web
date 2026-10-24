# Analisador de texto

**Data:** 23 de agosto · **Nível:** Avançado

## Objetivo

Conte caracteres por classe e construa histograma de letras de A a Z.

## Como funciona

Leia texto sem espaços. Conte letras A–Z, dígitos 0–9 e demais caracteres; mostre histograma das letras encontradas.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
A1A! → letras 2, dígitos 1, outros 1; A aparece 2 vezes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Letras acentuadas entram em outros nesta classificação ASCII.

## Dicas para resolução

1. Converta letra para maiúscula.
2. Use intervalos ASCII.
3. Conte cada letra no índice correspondente.

## Solução

```visualg
algoritmo "Desafio0823A"
var
frequencia: vetor[1..26] de inteiro
  textoEntrada, letra: caractere
  i, codigo, digitos, letras, outros, maior, indiceMaior: inteiro
inicio
para i de 1 ate 26 faca
    frequencia[i] <- 0
  fimpara
  escreva("Texto sem espaços: ")
  leia(textoEntrada)
  digitos <- 0
  letras <- 0
  outros <- 0
  para i de 1 ate compr(textoEntrada) faca
    letra <- maiusc(copia(textoEntrada, i, 1))
    codigo <- asc(letra)
    se (codigo >= 65) e (codigo <= 90) entao
      frequencia[codigo - 64] <- frequencia[codigo - 64] + 1
      letras <- letras + 1
    senao
      se (codigo >= 48) e (codigo <= 57) entao
        digitos <- digitos + 1
      senao
        outros <- outros + 1
      fimse
    fimse
  fimpara
  escreval("Letras: ", letras, "; dígitos: ", digitos, "; outros: ", outros)
  para i de 1 ate 26 faca
    se frequencia[i] > 0 entao
      escreval(carac(i + 64), ": ", frequencia[i])
    fimse
  fimpara
fimalgoritmo
```

O código ASCII da letra maiúscula determina seu índice no vetor de 26 frequências.
