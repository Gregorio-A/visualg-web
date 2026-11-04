# Preparativos finais

**Data:** 24 de dezembro · **Nível:** Simples

## Objetivo

Conte quantas de cinco tarefas foram marcadas como concluídas.

## Como funciona

Leia cinco marcas binárias, uma por tarefa.

## Exemplo de execução

```text
1, 0, 1, 1, 0 → 3 concluídas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Todas desmarcadas produzem zero.

## Dicas para resolução

1. Percorra as cinco tarefas.
2. Aceite 1 para concluída e 0 para pendente.
3. Acumule as marcações positivas.

## Solução

```visualg
algoritmo "Desafio1224S"
var
  i, marcada, concluidas: inteiro
inicio
  concluidas <- 0
  para i de 1 ate 5 faca
    escreva("Tarefa ", i, " concluída (1 sim, 0 não): ")
    leia(marcada)
    se (marcada = 0) ou (marcada = 1) entao
      concluidas <- concluidas + marcada
    senao
      escreval("Resposta inválida; não contada")
    fimse
  fimpara
  escreval("Concluídas: ", concluidas, " de 5")
fimalgoritmo
```

Conte as respostas iguais a um.
