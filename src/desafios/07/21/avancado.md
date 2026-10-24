# Planejamento de barracas

**Data:** 21 de julho · **Nível:** Avançado

## Objetivo

Distribua grupos em capacidades variadas preservando integridade das famílias.

## Como funciona

Cadastre três barracas de capacidades variadas e cinco famílias. Na ordem de chegada, coloque cada família inteira na menor barraca com vagas suficientes.

## Exemplo de execução

```text
Barracas de 4 e 6 vagas; família de 3 pessoas → barraca de 4 vagas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se nenhuma barraca comportar toda a família, informe que não foi alocada.

## Dicas para resolução

1. Compare capacidade com tamanho do grupo.
2. Escolha a menor capacidade suficiente.
3. Desconte todas as pessoas do grupo juntas.

## Solução

```visualg
algoritmo "Desafio0721A"
var
grupo: vetor[1..5] de inteiro
  capacidade: vetor[1..3] de inteiro
  i, j, escolhido, livres: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Capacidade da barraca ", i, ": ")
    leia(capacidade[i])
  fimpara
  para i de 1 ate 5 faca
    escreva("Pessoas da família ", i, ": ")
    leia(grupo[i])
    escolhido <- 0
    para j de 1 ate 3 faca
      se (grupo[i] > 0) e (capacidade[j] >= grupo[i]) entao
        se escolhido = 0 entao
          escolhido <- j
        senao
          se capacidade[j] < capacidade[escolhido] entao
            escolhido <- j
          fimse
        fimse
      fimse
    fimpara
    se escolhido = 0 entao
      escreval("Família ", i, " não alocada")
    senao
      capacidade[escolhido] <- capacidade[escolhido] - grupo[i]
      escreval("Família ", i, " na barraca ", escolhido)
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Vagas livres na barraca ", i, ": ", capacidade[i])
  fimpara
fimalgoritmo
```

A escolha da menor barraca compatível preserva barracas maiores para grupos posteriores.
