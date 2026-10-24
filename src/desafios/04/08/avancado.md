# Investigador de pares

**Data:** 8 de abril · **Nível:** Avançado

## Objetivo

Encontre todas as duplas com soma-alvo em um vetor sem repetir posições.

## Como funciona

Leia seis inteiros e uma soma-alvo. Encontre todas as duplas de posições distintas, sem repetir a dupla invertida.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Vetor 1,2,3,4,5,6; alvo 7
Duplas 1/6, 2/5, 3/4
```

Valores repetidos em posições diferentes podem formar duplas diferentes.

## Dicas para resolução

1. Percorra pares de índices, não apenas valores.
2. Comece o segundo índice após o primeiro.
3. Conte cada dupla válida.

## Solução

```visualg
algoritmo "Desafio0408A"
var
numeros: vetor[1..6] de inteiro
  alvo, i, j, quantidade: inteiro
inicio
para i de 1 ate 6 faca
    escreva("Número ", i, ": ")
    leia(numeros[i])
  fimpara
  escreva("Soma-alvo: ")
  leia(alvo)
  quantidade <- 0
  para i de 1 ate 5 faca
    para j de i + 1 ate 6 faca
      se numeros[i] + numeros[j] = alvo entao
        escreval("Dupla ", i, "/", j, ": ", numeros[i], "+", numeros[j])
        quantidade <- quantidade + 1
      fimse
    fimpara
  fimpara
  escreval("Duplas encontradas: ", quantidade)
fimalgoritmo
```

O índice interno sempre começa em `i + 1`, evitando usar a mesma posição duas vezes.
