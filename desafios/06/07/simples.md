# Forno de pamonha

**Data:** 7 de junho · **Nível:** Simples

## Objetivo

Calcule quantas fornadas são necessárias para N unidades.

## Como funciona

Cada fornada comporta até a capacidade informada. A última pode ficar parcialmente ocupada.

## Exemplo de execução

```text
11 pamonhas, capacidade 5 → 3 fornadas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pamonhas exige zero fornadas.

## Dicas para resolução

1. Divida unidades por capacidade.
2. Olhe o resto.
3. Some uma fornada se houver resto.

## Solução

```visualg
algoritmo "Desafio0607S"
var
unidades, capacidade, fornadas: inteiro
inicio
escreva("Pamonhas: ")
  leia(unidades)
  escreva("Capacidade por fornada: ")
  leia(capacidade)
  se (unidades < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    fornadas <- unidades div capacidade
    se unidades mod capacidade <> 0 entao
      fornadas <- fornadas + 1
    fimse
    escreval("Fornadas necessárias: ", fornadas)
  fimse
fimalgoritmo
```

Uma divisão com resto indica a necessidade de mais uma fornada.
