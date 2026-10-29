# Monitor de transferência

**Data:** 7 de novembro · **Nível:** Avançado

## Objetivo

Estime tempos de várias tarefas compartilhando uma banda total limitada.

## Como funciona

Três transferências compartilham banda por rodadas. Divida igualmente entre tarefas ainda ativas em cada rodada e reporte quando todas terminarem.

## Exemplo de execução

```text
Banda 6 MB, três tarefas ativas → cota 2 MB na primeira rodada
```

**Como ler o exemplo:** a seta → significa "resulta em".

Mil rodadas são o limite didático de simulação.

## Dicas para resolução

1. Conte tarefas com tamanho positivo.
2. Divida banda por essa contagem.
3. Reduza cada tarefa até zero.

## Solução

```visualg
algoritmo "Desafio1107A"
var
tamanho: vetor[1..3] de real
  i, rodada, ativas: inteiro
  banda, cota, gasto: real
inicio
escreva("Banda total por rodada (MB): ")
  leia(banda)
  para i de 1 ate 3 faca
    escreva("Tamanho restante da tarefa ", i, " (MB): ")
    leia(tamanho[i])
  fimpara
  se banda <= 0 entao
    escreval("Banda inválida")
  senao
    rodada <- 0
    ativas <- 1
    enquanto (ativas > 0) e (rodada < 1000) faca
      ativas <- 0
      para i de 1 ate 3 faca
        se tamanho[i] > 0 entao
          ativas <- ativas + 1
        fimse
      fimpara
      se ativas > 0 entao
        rodada <- rodada + 1
        cota <- banda / ativas
        para i de 1 ate 3 faca
          se tamanho[i] > 0 entao
            gasto <- cota
            se gasto > tamanho[i] entao
              gasto <- tamanho[i]
            fimse
            tamanho[i] <- tamanho[i] - gasto
          fimse
        fimpara
        escreval("Rodada ", rodada, ": restantes ", tamanho[1], ", ", tamanho[2], ", ", tamanho[3], " MB")
      fimse
    fimenquanto
    escreval("Rodadas necessárias: ", rodada)
  fimse
fimalgoritmo
```

A contagem de ativas redefine a cota quando uma tarefa termina.
