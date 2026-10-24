# Série de marés

**Data:** 29 de setembro · **Nível:** Avançado

## Objetivo

Identifique máximos e mínimos locais num vetor de leituras.

## Como funciona

Leia dez níveis de maré. Uma leitura interna é máximo local se supera os dois vizinhos; mínimo local se fica abaixo dos dois.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Níveis 1,3,2 → leitura central é máximo local
```

**Como ler o exemplo:** a seta → significa "resulta em".

Extremos da série não têm dois vizinhos e não são avaliados. Empate não forma extremo estrito.

## Dicas para resolução

1. Percorra posições 2–9.
2. Compare com ambos os vizinhos.
3. Conte máximos e mínimos.

## Solução

```visualg
algoritmo "Desafio0929A"
var
leitura: vetor[1..10] de real
  i, maximos, minimos: inteiro
inicio
para i de 1 ate 10 faca
    escreva("Nível da maré na leitura ", i, ": ")
    leia(leitura[i])
  fimpara
  maximos <- 0
  minimos <- 0
  para i de 2 ate 9 faca
    se (leitura[i] > leitura[i - 1]) e (leitura[i] > leitura[i + 1]) entao
      maximos <- maximos + 1
      escreval("Máximo local na leitura ", i, ": ", leitura[i])
    fimse
    se (leitura[i] < leitura[i - 1]) e (leitura[i] < leitura[i + 1]) entao
      minimos <- minimos + 1
      escreval("Mínimo local na leitura ", i, ": ", leitura[i])
    fimse
  fimpara
  escreval("Máximos locais: ", maximos, "; mínimos locais: ", minimos)
fimalgoritmo
```

Comparar a leitura anterior e a posterior identifica picos e vales locais.
