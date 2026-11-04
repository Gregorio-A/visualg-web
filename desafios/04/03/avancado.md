# Chaves numeradas

**Data:** 3 de abril · **Nível:** Avançado

## Objetivo

Encontre pares de códigos cuja soma corresponde ao código do cadeado.

## Como funciona

Leia seis códigos inteiros e uma soma-alvo. Liste todos os pares de posições diferentes cujos códigos somem o alvo.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Códigos: 2, 3, 4, 5, 6, 7; alvo: 9
Pares: posições 1 e 6, 2 e 5, 3 e 4
```

Dois códigos iguais podem formar um par se estiverem em posições diferentes.

## Dicas para resolução

1. Guarde os códigos em vetor.
2. Compare cada posição com as posteriores.
3. Conte todos os pares válidos.

## Solução

```visualg
algoritmo "Desafio0403A"
var
codigos: vetor[1..6] de inteiro
  alvo, i, j, pares: inteiro
inicio
para i de 1 ate 6 faca
    escreva("Código ", i, ": ")
    leia(codigos[i])
  fimpara
  escreva("Código do cadeado: ")
  leia(alvo)
  pares <- 0
  para i de 1 ate 5 faca
    para j de i + 1 ate 6 faca
      se codigos[i] + codigos[j] = alvo entao
        escreval("Par: posições ", i, " e ", j)
        pares <- pares + 1
      fimse
    fimpara
  fimpara
  escreval("Pares encontrados: ", pares)
fimalgoritmo
```

O índice interno começa depois do externo para não repetir pares nem usar a mesma posição duas vezes.
