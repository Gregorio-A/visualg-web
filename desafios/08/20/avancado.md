# Gerenciador de downloads

**Data:** 20 de agosto · **Nível:** Avançado

## Objetivo

Distribua banda entre três tarefas e estime rodadas até conclusão.

## Como funciona

Três downloads disputam banda inteira em MB por rodada. Divida a banda igualmente entre tarefas ativas; cada uma recebe até sua cota, respeitando o total.

## Exemplo de execução

```text
Banda 6 MB, três tarefas ativas → até 2 MB por tarefa na primeira rodada
```

**Como ler o exemplo:** a seta → significa "resulta em".

Um limite de mil rodadas evita simulação infinita com entradas extremas.

## Dicas para resolução

1. Conte tarefas ativas.
2. Divida banda por essa contagem.
3. Desconte de cada tarefa sem ultrapassar a banda.

## Solução

```visualg
algoritmo "Desafio0820A"
var
restante: vetor[1..3] de inteiro
  i, banda, livre, rodadas, ativa, cota: inteiro
inicio
escreva("Banda disponível por rodada (MB): ")
  leia(banda)
  para i de 1 ate 3 faca
    escreva("MB restantes da tarefa ", i, ": ")
    leia(restante[i])
  fimpara
  se banda <= 0 entao
    escreval("Banda inválida")
  senao
    rodadas <- 0
    ativa <- 1
    enquanto (ativa > 0) e (rodadas < 1000) faca
      ativa <- 0
      para i de 1 ate 3 faca
        se restante[i] > 0 entao
          ativa <- ativa + 1
        fimse
      fimpara
      se ativa > 0 entao
        rodadas <- rodadas + 1
        cota <- banda div ativa
        se cota < 1 entao
          cota <- 1
        fimse
        livre <- banda
        para i de 1 ate 3 faca
          se (restante[i] > 0) e (livre > 0) entao
            se cota > livre entao
              cota <- livre
            fimse
            se restante[i] < cota entao
              livre <- livre - restante[i]
              restante[i] <- 0
            senao
              restante[i] <- restante[i] - cota
              livre <- livre - cota
            fimse
          fimse
        fimpara
        escreval("Após rodada ", rodadas, ": ", restante[1], ", ", restante[2], ", ", restante[3], " MB")
      fimse
    fimenquanto
    escreval("Rodadas realizadas: ", rodadas)
  fimse
fimalgoritmo
```

A cada rodada a contagem de tarefas ativas redefine a cota e os saldos restantes são reduzidos.
