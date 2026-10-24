# Fases concluídas

**Data:** 16 de agosto · **Nível:** Simples

## Objetivo

Calcule quantas faltam para terminar um jogo.

## Como funciona

Subtraia as fases concluídas do total do jogo.

## Exemplo de execução

```text
10 fases, 6 concluídas → faltam 4
```

**Como ler o exemplo:** a seta → significa "resulta em".

Concluiu todas → faltam zero.

## Dicas para resolução

1. Leia total e concluídas.
2. Valide o intervalo.
3. Subtraia.

## Solução

```visualg
algoritmo "Desafio0816S"
var
total, concluidas: inteiro
inicio
escreva("Fases totais: ")
  leia(total)
  escreva("Fases concluídas: ")
  leia(concluidas)
  se (total < 0) ou (concluidas < 0) ou (concluidas > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Faltam ", total - concluidas, " fase(s)")
  fimse
fimalgoritmo
```

A diferença representa o progresso ainda necessário.
