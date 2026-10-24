# Fila de impressão

**Data:** 8 de novembro · **Nível:** Avançado

## Objetivo

Gerencie trabalhos por prioridade, páginas e estado de conclusão.

## Como funciona

Cinco trabalhos possuem nome, páginas e prioridade. Imprima primeiro menor número de prioridade; empate segue cadastro. Marque cada trabalho concluído.

## Exemplo de execução

```text
A prioridade 1 imprime antes da prioridade 3
```

Páginas negativas invalidam o trabalho.

## Dicas para resolução

1. Guarde estado de conclusão.
2. Procure menor prioridade pendente.
3. Marque e some páginas.

## Solução

```visualg
algoritmo "Desafio1108A"
var
paginas, prioridade, estado: vetor[1..5] de inteiro
  nome: vetor[1..5] de caractere
  i, j, escolhido, total: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Trabalho ", i, ": ")
    leia(nome[i])
    escreva("Páginas: ")
    leia(paginas[i])
    escreva("Prioridade (1 mais alta): ")
    leia(prioridade[i])
    estado[i] <- 0
  fimpara
  total <- 0
  para i de 1 ate 5 faca
    escolhido <- 0
    para j de 1 ate 5 faca
      se (estado[j] = 0) e (paginas[j] >= 0) entao
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
      total <- total + paginas[escolhido]
      escreval("Concluído: ", nome[escolhido], " (", paginas[escolhido], " página(s))")
    fimse
  fimpara
  escreval("Páginas impressas: ", total)
fimalgoritmo
```

A cada passo, a fila escolhe o melhor trabalho ainda pendente.
