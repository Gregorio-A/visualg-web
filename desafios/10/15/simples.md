# Monstro faminto

**Data:** 15 de outubro · **Nível:** Simples

## Objetivo

Calcule energia restante após um ataque.

## Como funciona

Subtraia o custo do ataque sem permitir energia negativa.

## Exemplo de execução

```text
Energia 20, ataque 5 → 15
```

**Como ler o exemplo:** a seta → significa "resulta em".

Custo superior à energia deixa zero nesta simulação.

## Dicas para resolução

1. Leia os dois valores.
2. Subtraia.
3. Ajuste abaixo de zero.

## Solução

```visualg
algoritmo "Desafio1015S"
var
energia, ataque, restante: real
inicio
escreva("Energia inicial: ")
  leia(energia)
  escreva("Custo do ataque: ")
  leia(ataque)
  se (energia < 0) ou (ataque < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- energia - ataque
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Energia restante: ", restante)
  fimse
fimalgoritmo
```

O saldo é limitado a zero após a subtração.
