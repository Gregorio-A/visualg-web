# Biscoitos do inverno

**Data:** 23 de julho · **Nível:** Simples

## Objetivo

Calcule quantos pacotes são necessários para uma quantidade de biscoitos.

## Como funciona

Compre pacotes inteiros suficientes para a quantidade desejada.

## Exemplo de execução

```text
11 biscoitos, pacote com 5 → 3 pacotes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero biscoito requer zero pacote.

## Dicas para resolução

1. Calcule a divisão inteira.
2. Confira o resto.
3. Arredonde para cima.

## Solução

```visualg
algoritmo "Desafio0723S"
var
biscoitos, porPacote, pacotes: inteiro
inicio
escreva("Biscoitos necessários: ")
  leia(biscoitos)
  escreva("Biscoitos por pacote: ")
  leia(porPacote)
  se (biscoitos < 0) ou (porPacote <= 0) entao
    escreval("Dados inválidos")
  senao
    pacotes <- biscoitos div porPacote
    se biscoitos mod porPacote <> 0 entao
      pacotes <- pacotes + 1
    fimse
    escreval("Pacotes necessários: ", pacotes)
  fimse
fimalgoritmo
```

Uma divisão com resto exige mais um pacote.
