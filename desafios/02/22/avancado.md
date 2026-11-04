# Traçado do bloco

**Data:** 22 de fevereiro · **Nível:** Avançado

## Objetivo

Registre trechos em vetor e calcule distância acumulada e maior intervalo.

## Como funciona

Leia seis distâncias de trechos. Após cada leitura, mostre a distância acumulada; ao final, destaque o trecho mais longo.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Trechos: 2, 5, 1, 1, 1, 1
Acumulado após o segundo: 7
Maior trecho: 2 com 5
Distância total: 11
```

Em empate de maior distância, o primeiro trecho com esse valor é preservado.

## Dicas para resolução

1. Some cada trecho ao total à medida que é lido.
2. Guarde o índice do maior valor.
3. Não confunda maior trecho com distância total.

## Solução

```visualg
algoritmo "Desafio0222A"
var
trecho: vetor[1..6] de real
  i, maiorIndice: inteiro
  total: real
inicio
total <- 0
  maiorIndice <- 1
  para i de 1 ate 6 faca
    escreva("Distância do trecho ", i, ": ")
    leia(trecho[i])
    total <- total + trecho[i]
    escreval("Distância acumulada: ", total)
    se (i = 1) ou (trecho[i] > trecho[maiorIndice]) entao
      maiorIndice <- i
    fimse
  fimpara
  escreval("Maior trecho: ", maiorIndice, " com ", trecho[maiorIndice])
  escreval("Distância total: ", total)
fimalgoritmo
```

O vetor conserva as distâncias; o acumulador soma o trajeto e o índice aponta para a maior distância individual.
