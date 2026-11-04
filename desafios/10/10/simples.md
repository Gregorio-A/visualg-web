# Esqueleto desmontado

**Data:** 10 de outubro · **Nível:** Simples

## Objetivo

Calcule quantos ossos restam após perder alguns.

## Como funciona

Subtraia os ossos perdidos e limite o saldo a zero.

## Exemplo de execução

```text
10 ossos, perde 3 → restam 7
```

**Como ler o exemplo:** a seta → significa "resulta em".

Perda maior que a quantidade deixa zero.

## Dicas para resolução

1. Subtraia.
2. Compare com zero.
3. Ajuste o saldo.

## Solução

```visualg
algoritmo "Desafio1010S"
var
ossos, perdidos, restante: inteiro
inicio
escreva("Ossos iniciais: ")
  leia(ossos)
  escreva("Ossos perdidos: ")
  leia(perdidos)
  se (ossos < 0) ou (perdidos < 0) entao
    escreval("Quantidade inválida")
  senao
    restante <- ossos - perdidos
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Ossos restantes: ", restante)
  fimse
fimalgoritmo
```

O limite evita quantidade negativa.
