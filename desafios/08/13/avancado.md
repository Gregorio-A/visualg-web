# Autonomia do controle

**Data:** 13 de agosto · **Nível:** Avançado

## Objetivo

Simule sessões com consumo variável e encontre quando será necessário recarregar.

## Como funciona

Leia carga inicial e consumo de cinco sessões. Execute em ordem sem recarga automática e informe a primeira sessão que exigiria recarregar.

## Exemplo de execução

```text
Carga 30%; sessões gastam 10%, 15%, 10% → recarga antes da terceira
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumo negativo é tratado como zero; carga inicial deve estar entre 0 e 100.

## Dicas para resolução

1. Guarde carga restante.
2. Compare com consumo da próxima sessão.
3. Registre a primeira insuficiente.

## Solução

```visualg
algoritmo "Desafio0813A"
var
consumo: vetor[1..5] de inteiro
  sessao, carga, primeiro: inteiro
inicio
escreva("Carga inicial (0 a 100): ")
  leia(carga)
  primeiro <- 0
  para sessao de 1 ate 5 faca
    escreva("Consumo previsto da sessão ", sessao, " em pontos percentuais: ")
    leia(consumo[sessao])
    se consumo[sessao] < 0 entao
      consumo[sessao] <- 0
    fimse
    se primeiro = 0 entao
      se carga < consumo[sessao] entao
        primeiro <- sessao
        escreval("Recarregar antes da sessão ", sessao)
      senao
        carga <- carga - consumo[sessao]
        escreval("Carga após sessão ", sessao, ": ", carga, "%")
      fimse
    fimse
  fimpara
  se primeiro = 0 entao
    escreval("Todas as sessões concluídas; carga final ", carga, "%")
  fimse
fimalgoritmo
```

O saldo diminui por sessão até não cobrir o consumo previsto.
