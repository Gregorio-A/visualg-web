# Convites juninos

**Data:** 27 de junho · **Nível:** Simples

## Objetivo

Calcule quantos convites faltam distribuir.

## Como funciona

Subtraia os convites já entregues do total disponível.

## Exemplo de execução

```text
20 convites, 7 entregues → faltam 13
```

**Como ler o exemplo:** a seta → significa "resulta em".

Entregues maior que total é inválido.

## Dicas para resolução

1. Leia total e entregues.
2. Verifique limites.
3. Subtraia.

## Solução

```visualg
algoritmo "Desafio0627S"
var
total, entregues: inteiro
inicio
escreva("Convites disponíveis: ")
  leia(total)
  escreva("Convites distribuídos: ")
  leia(entregues)
  se (total < 0) ou (entregues < 0) ou (entregues > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Faltam distribuir: ", total - entregues)
  fimse
fimalgoritmo
```

A diferença representa convites ainda em mãos.
