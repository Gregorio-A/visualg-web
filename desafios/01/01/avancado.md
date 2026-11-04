# Roteiro de férias

**Data:** 1 de janeiro · **Nível:** Avançado

## Objetivo

Armazene cinco destinos com custos e exiba o mais barato e o mais caro.

Cadastre cinco destinos de férias com seus custos e identifique os extremos.

## Como funciona

Leia nome e custo de cada destino na mesma posição de dois vetores. Compare os custos, guardando o índice do menor e do maior. Em empate, conserve o primeiro cadastrado.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Destino 1: Praia
Custo: 500
Destino 2: Serra
Custo: 300
Destino 3: Campo
Custo: 450
Destino 4: Ilha
Custo: 800
Destino 5: Lago
Custo: 600
Mais barato: Serra (300)
Mais caro: Ilha (800)
```

Custos iguais são permitidos: o primeiro destino com aquele custo permanece escolhido.

## Dicas para resolução

1. Use vetores paralelos para relacionar nomes e preços.
2. Inicialize ambos os extremos na primeira posição.
3. Compare cada custo com os custos das posições extremas.

## Solução

```visualg
algoritmo "Desafio0101A"
var
destinos: vetor[1..5] de caractere
  custos: vetor[1..5] de real
  i, barato, caro: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Destino ", i, ": ")
    leia(destinos[i])
    escreva("Custo: ")
    leia(custos[i])
  fimpara
  barato <- 1
  caro <- 1
  para i de 2 ate 5 faca
    se custos[i] < custos[barato] entao
      barato <- i
    fimse
    se custos[i] > custos[caro] entao
      caro <- i
    fimse
  fimpara
  escreval("Mais barato: ", destinos[barato], " (", custos[barato], ")")
  escreval("Mais caro: ", destinos[caro], " (", custos[caro], ")")
fimalgoritmo
```

Os índices `barato` e `caro` apontam para posições dos vetores, evitando perder a associação entre destino e custo.
