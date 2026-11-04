# Agenda de rega

**Data:** 15 de setembro · **Nível:** Avançado

## Objetivo

Guarde últimos dias de rega e avise quais plantas venceram intervalo configurado.

## Como funciona

Use dias numéricos de uma mesma linha do tempo. Para cinco plantas, compare hoje menos último dia de rega ao intervalo configurado.

## Exemplo de execução

```text
Hoje 10, última rega 7, intervalo 3 → rega vencida
```

**Como ler o exemplo:** a seta → significa "resulta em".

Intervalo zero ou último dia no futuro invalida a agenda da planta.

## Dicas para resolução

1. Guarde último dia e intervalo.
2. Calcule dias decorridos.
3. Compare com intervalo.

## Solução

```visualg
algoritmo "Desafio0915A"
var
nome: vetor[1..5] de caractere
  ultimoDia, intervalo: vetor[1..5] de inteiro
  i, hoje: inteiro
inicio
escreva("Dia atual do planejamento: ")
  leia(hoje)
  para i de 1 ate 5 faca
    escreva("Planta ", i, ": ")
    leia(nome[i])
    escreva("Último dia de rega: ")
    leia(ultimoDia[i])
    escreva("Intervalo entre regas (dias): ")
    leia(intervalo[i])
    se (intervalo[i] > 0) e (hoje >= ultimoDia[i]) entao
      se hoje - ultimoDia[i] >= intervalo[i] entao
        escreval(nome[i], ": rega vencida")
      senao
        escreval(nome[i], ": próxima rega em ", intervalo[i] - (hoje - ultimoDia[i]), " dia(s)")
      fimse
    senao
      escreval("Agenda inválida para ", nome[i])
    fimse
  fimpara
fimalgoritmo
```

A diferença de dias mede quanto tempo se passou desde a última rega.
