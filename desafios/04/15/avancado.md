# Equilíbrio de somas

**Data:** 15 de abril · **Nível:** Avançado

## Objetivo

Encontre um índice que divide o vetor em metades de soma igual.

## Como funciona

Leia sete inteiros. Encontre a primeira posição para a qual a soma dos elementos à esquerda é igual à soma dos elementos à direita, sem incluir a própria posição.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Vetor: 1,2,3,0,3,2,1
Índice de equilíbrio: 4
```

Extremos podem ser índices de equilíbrio se a soma do lado vazio, zero, coincidir com a soma do restante.

## Dicas para resolução

1. Calcule a soma total primeiro.
2. Mantenha um acumulador para o lado esquerdo.
3. Obtenha o lado direito por subtração.

## Solução

```visualg
algoritmo "Desafio0415A"
var
valores: vetor[1..7] de inteiro
  i, total, esquerda, indice: inteiro
inicio
total <- 0
  para i de 1 ate 7 faca
    escreva("Valor ", i, ": ")
    leia(valores[i])
    total <- total + valores[i]
  fimpara
  esquerda <- 0
  indice <- 0
  para i de 1 ate 7 faca
    se (indice = 0) e (esquerda = total - esquerda - valores[i]) entao
      indice <- i
    fimse
    esquerda <- esquerda + valores[i]
  fimpara
  se indice > 0 entao
    escreval("Índice de equilíbrio: ", indice)
  senao
    escreval("Nenhum índice de equilíbrio")
  fimse
fimalgoritmo
```

`total - esquerda - valores[i]` calcula o lado direito sem fazer uma soma inteira a cada posição.
