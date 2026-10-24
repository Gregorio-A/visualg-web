# Roupas para festa

**Data:** 18 de dezembro · **Nível:** Simples

## Objetivo

Calcule o total de peças de três categorias.

## Como funciona

Conte três categorias sem duplicar peças.

## Exemplo de execução

```text
2 camisas, 3 calças e 1 casaco → 6 peças
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma categoria pode estar vazia.

## Dicas para resolução

1. Guarde as contagens por categoria.
2. Rejeite quantidades negativas.
3. Some as três categorias.

## Solução

```visualg
algoritmo "Desafio1218S"
var
  camisas, calcas, casacos: inteiro
inicio
  escreva("Camisas: ")
  leia(camisas)
  escreva("Calças: ")
  leia(calcas)
  escreva("Casacos: ")
  leia(casacos)
  se (camisas < 0) ou (calcas < 0) ou (casacos < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de peças: ", camisas+calcas+casacos)
  fimse
fimalgoritmo
```

Some as quantidades das categorias.
