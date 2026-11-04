# Fila do salão

**Data:** 9 de fevereiro · **Nível:** Simples

## Objetivo

Leia o número de pessoas e estime o tempo com atendimento fixo.

## Como funciona

Estime o tempo para atender uma fila multiplicando pessoas pela duração fixa de cada atendimento.

## Exemplo de execução

```text
Pessoas na fila: 6
Minutos fixos por atendimento: 4
Tempo estimado (minutos): 24
```

Fila vazia tem tempo estimado zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0209S"
var
pessoas, minutosPorPessoa, total: inteiro
inicio
escreva("Pessoas na fila: ")
  leia(pessoas)
  escreva("Minutos fixos por atendimento: ")
  leia(minutosPorPessoa)
  se (pessoas >= 0) e (minutosPorPessoa >= 0) entao
    total <- pessoas * minutosPorPessoa
    escreval("Tempo estimado (minutos): ", total)
  senao
    escreval("Dados inválidos.")
  fimse
fimalgoritmo
```

A estimativa supõe que os atendimentos ocorram um após outro, sem intervalos.
