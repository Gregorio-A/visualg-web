# Editor de coordenadas

**Data:** 10 de novembro · **Nível:** Avançado

## Objetivo

Armazene pontos, calcule distâncias entre consecutivos e comprimento da rota.

## Como funciona

Cadastre cinco pontos no plano. Use distância euclidiana entre pontos consecutivos e some os quatro trechos.

## Exemplo de execução

```text
(0,0) para (3,4) → trecho de 5 unidades
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pontos coincidentes produzem trecho de comprimento zero.

## Dicas para resolução

1. Subtraia coordenadas.
2. Some quadrados.
3. Use raiz quadrada e acumule.

## Solução

```visualg
algoritmo "Desafio1110A"
var
x, y: vetor[1..5] de real
  i: inteiro
  dx, dy, distancia, total: real
inicio
para i de 1 ate 5 faca
    escreva("Ponto ", i, " X e Y: ")
    leia(x[i], y[i])
  fimpara
  total <- 0
  para i de 2 ate 5 faca
    dx <- x[i] - x[i - 1]
    dy <- y[i] - y[i - 1]
    distancia <- raizq(dx * dx + dy * dy)
    total <- total + distancia
    escreval("Trecho ", i - 1, "–", i, ": ", distancia)
  fimpara
  escreval("Comprimento total da rota: ", total)
fimalgoritmo
```

Pitágoras calcula cada trecho a partir das diferenças em X e Y.
