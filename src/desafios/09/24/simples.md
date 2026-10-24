# Biodiversidade

**Data:** 24 de setembro · **Nível:** Simples

## Objetivo

Some exemplares de três espécies.

## Como funciona

Some as contagens de três espécies sem confundi-las.

## Exemplo de execução

```text
2, 3 e 4 indivíduos → 9 exemplares
```

**Como ler o exemplo:** a seta → significa "resulta em".

Espécie não observada contribui com zero.

## Dicas para resolução

1. Leia três números.
2. Some.
3. Mostre exemplares.

## Solução

```visualg
algoritmo "Desafio0924S"
var
primeira, segunda, terceira: inteiro
inicio
escreva("Exemplares das três espécies: ")
  leia(primeira, segunda, terceira)
  se (primeira < 0) ou (segunda < 0) ou (terceira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Exemplares observados: ", primeira + segunda + terceira)
  fimse
fimalgoritmo
```

O total de indivíduos é a soma das três contagens.
