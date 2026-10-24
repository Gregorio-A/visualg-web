# Quadro de tarefas

**Data:** 6 de março · **Nível:** Avançado

## Objetivo

Cadastre atividades com prazo numérico, status e filtro por atrasos.

## Como funciona

Cadastre cinco atividades com dia numérico de prazo e status concluída/pendente. Considere atrasada uma tarefa pendente cujo prazo já passou.

## Exemplo de execução

```text
Hoje é dia 10; tarefa A tem prazo 9 e está pendente; tarefa B tem prazo 9 e foi concluída
Atrasada: tarefa A
```

Uma tarefa que vence hoje ainda não está atrasada.

## Dicas para resolução

1. Guarde prazo e status junto ao nome da atividade.
2. Compare prazos na mesma escala de dias.
3. Não mostre atividade já concluída como atrasada.

## Solução

```visualg
algoritmo "Desafio0306A"
var
tarefa: vetor[1..5] de caractere
  prazo, concluida: vetor[1..5] de inteiro
  hoje, i: inteiro
inicio
escreva("Dia atual: ")
  leia(hoje)
  para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(tarefa[i])
    escreva("Dia do prazo: ")
    leia(prazo[i])
    escreva("Concluída? (1 sim, 0 não): ")
    leia(concluida[i])
  fimpara
  para i de 1 ate 5 faca
    se (concluida[i] = 0) e (prazo[i] < hoje) entao
      escreval("Atrasada: ", tarefa[i], " (dia ", prazo[i], ")")
    fimse
  fimpara
fimalgoritmo
```

O filtro combina duas condições: não concluída e prazo menor que o dia atual.
