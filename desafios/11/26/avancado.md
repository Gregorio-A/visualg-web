# Escalonador simples

**Data:** 26 de novembro · **Nível:** Avançado

## Objetivo

Execute tarefas por prioridade e duração com relatório de espera.

## Como funciona

Cinco tarefas chegam no instante zero. Execute por prioridade crescente, sem preempção; empate segue cadastro. Mostre espera e conclusão.

## Exemplo de execução

```text
Tarefa A dura 3 e executa primeiro; tarefa B espera 3 antes de iniciar
```

Duração negativa invalida a tarefa.

## Dicas para resolução

1. Selecione prioridade mais alta ainda pendente.
2. Mostre relógio como espera.
3. Avance pelo tempo da tarefa.

## Solução

```visualg
algoritmo "Desafio1126A"
var
nome: vetor[1..5] de caractere
  prioridade, duracao, estado: vetor[1..5] de inteiro
  i, j, escolhido, relogio, esperaTotal: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Tarefa ", i, ": ")
    leia(nome[i])
    escreva("Prioridade (1 mais alta): ")
    leia(prioridade[i])
    escreva("Duração: ")
    leia(duracao[i])
    estado[i] <- 0
  fimpara
  relogio <- 0
  esperaTotal <- 0
  para i de 1 ate 5 faca
    escolhido <- 0
    para j de 1 ate 5 faca
      se (estado[j] = 0) e (duracao[j] >= 0) entao
        se escolhido = 0 entao
          escolhido <- j
        senao
          se prioridade[j] < prioridade[escolhido] entao
            escolhido <- j
          fimse
        fimse
      fimse
    fimpara
    se escolhido > 0 entao
      estado[escolhido] <- 1
      escreval(nome[escolhido], ": espera ", relogio, ", termina em ", relogio + duracao[escolhido])
      esperaTotal <- esperaTotal + relogio
      relogio <- relogio + duracao[escolhido]
    fimse
  fimpara
  escreval("Espera total: ", esperaTotal, "; duração total: ", relogio)
fimalgoritmo
```

O relógio acumulado antes da execução de cada tarefa é seu tempo de espera.
