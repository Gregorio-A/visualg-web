# Registro de ondas

**Data:** 22 de janeiro · **Nível:** Avançado

## Objetivo

Analise 12 medições e identifique picos locais superiores aos vizinhos.

Identifique picos locais em uma sequência de 12 alturas de onda.

## Como funciona

Uma medição é pico somente se supera estritamente a imediatamente anterior e a posterior. As posições 1 e 12 não têm dois vizinhos e ficam fora da busca.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Medições: 1, 3, 2, 4, 1, 1, 2, 1, 0, 0, 1, 0
Picos locais: posições 2, 4, 7 e 11
Total de picos: 4
```

Um platô de alturas iguais não é pico porque a comparação é estrita.

## Dicas para resolução

1. Armazene as 12 medições antes de percorrê-las.
2. Percorra apenas índices com vizinho à esquerda e à direita.
3. Use `>` nas duas comparações.

## Solução

```visualg
algoritmo "Desafio0122A"
var
altura: vetor[1..12] de real
  i, picos: inteiro
inicio
para i de 1 ate 12 faca
    escreva("Altura da onda ", i, ": ")
    leia(altura[i])
  fimpara
  picos <- 0
  para i de 2 ate 11 faca
    se (altura[i] > altura[i - 1]) e (altura[i] > altura[i + 1]) entao
      escreval("Pico local na medição ", i, ": ", altura[i])
      picos <- picos + 1
    fimse
  fimpara
  escreval("Total de picos: ", picos)
fimalgoritmo
```

O vetor permite comparar cada medição interior com seus dois vizinhos sem perder valores já lidos.
