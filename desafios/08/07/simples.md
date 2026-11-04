# Contador de cliques

**Data:** 7 de agosto · **Nível:** Simples

## Objetivo

Mostre os números de 1 até N.

## Como funciona

Conte de 1 até a quantidade de cliques informada.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N=3 → 1, 2, 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero clique não imprime números.

## Dicas para resolução

1. Leia N.
2. Use para.
3. Imprima o contador.

## Solução

```visualg
algoritmo "Desafio0807S"
var
cliques, i: inteiro
inicio
escreva("Quantidade de cliques: ")
  leia(cliques)
  se cliques < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate cliques faca
      escreval(i)
    fimpara
  fimse
fimalgoritmo
```

O contador do laço representa cada clique.
