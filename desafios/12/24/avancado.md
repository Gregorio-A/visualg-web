# Checklist dependente

**Data:** 24 de dezembro · **Nível:** Avançado

## Objetivo

Mantenha tarefas com pré-requisitos e identifique quais estão liberadas.

## Como funciona

As dependências fixas são: tarefa 1 livre; 2 e 3 dependem da 1; 4 da 2; 5 da 3. Mostre concluídas, liberadas e bloqueadas.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Se apenas tarefa 1 está concluída, tarefas 2 e 3 ficam liberadas; 4 e 5 seguem bloqueadas.
```

Uma tarefa concluída não deve reaparecer como liberada.

## Dicas para resolução

1. Defina as dependências por índice.
2. Leia cinco estados.
3. Para cada pendente, consulte seu requisito.

## Solução

```visualg
algoritmo "Desafio1224A"
var
  feito: vetor[1..5] de inteiro
  requisito: vetor[1..5] de inteiro
  i, dep, concluidas: inteiro
inicio
  requisito[1] <- 0
  requisito[2] <- 1
  requisito[3] <- 1
  requisito[4] <- 2
  requisito[5] <- 3
  concluidas <- 0
  para i de 1 ate 5 faca
    repita
      escreva("Tarefa ", i, " concluída? (1 sim, 0 não): ")
      leia(feito[i])
    ate (feito[i] = 0) ou (feito[i] = 1)
    concluidas <- concluidas+feito[i]
  fimpara
  escreval("Concluídas: ", concluidas)
  para i de 1 ate 5 faca
    dep <- requisito[i]
    se feito[i] = 1 entao
      escreval("Tarefa ", i, ": concluída")
    senao
      se (dep = 0) ou (feito[dep] = 1) entao
        escreval("Tarefa ", i, ": liberada")
      senao
        escreval("Tarefa ", i, ": bloqueada pela ", dep)
      fimse
    fimse
  fimpara
fimalgoritmo
```

O vetor requisito aponta para a tarefa que precisa estar pronta antes da atual.
