# Dança das cadeiras

**Data:** 13 de junho · **Nível:** Simples

## Objetivo

Calcule quantas cadeiras restam após retirar uma por rodada.

## Como funciona

Retire uma cadeira por rodada, sem permitir quantidade negativa.

## Exemplo de execução

```text
8 cadeiras, 3 rodadas → 5 restantes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Mais rodadas que cadeiras deixam zero cadeira.

## Dicas para resolução

1. Subtraia rodadas.
2. Compare com zero.
3. Mostre o restante.

## Solução

```visualg
algoritmo "Desafio0613S"
var
cadeiras, rodadas, restantes: inteiro
inicio
escreva("Cadeiras iniciais: ")
  leia(cadeiras)
  escreva("Rodadas: ")
  leia(rodadas)
  se (cadeiras < 0) ou (rodadas < 0) entao
    escreval("Dados inválidos")
  senao
    restantes <- cadeiras - rodadas
    se restantes < 0 entao
      restantes <- 0
    fimse
    escreval("Cadeiras restantes: ", restantes)
  fimse
fimalgoritmo
```

A subtração calcula o saldo e um limite inferior evita resultado impossível.
