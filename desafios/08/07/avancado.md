# Teste de cliques

**Data:** 7 de agosto · **Nível:** Avançado

## Objetivo

Analise contagens por segundo e identifique a melhor janela consecutiva.

## Como funciona

Leia dez contagens por segundo. Encontre a janela consecutiva de três segundos com maior soma de cliques.

## Exemplo de execução

```text
Contagens 1, 5, 4, 0... → janela 1–3 soma 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate preserva a janela mais cedo. Contagem negativa é tratada como zero.

## Dicas para resolução

1. Guarde dez contagens.
2. Some três posições consecutivas.
3. Guarde o melhor início.

## Solução

```visualg
algoritmo "Desafio0807A"
var
cliques: vetor[1..10] de inteiro
  i, janela, soma, melhor, inicioMelhor: inteiro
inicio
para i de 1 ate 10 faca
    escreva("Cliques no segundo ", i, ": ")
    leia(cliques[i])
    se cliques[i] < 0 entao
      cliques[i] <- 0
    fimse
  fimpara
  melhor <- -1
  para janela de 1 ate 8 faca
    soma <- cliques[janela] + cliques[janela + 1] + cliques[janela + 2]
    se soma > melhor entao
      melhor <- soma
      inicioMelhor <- janela
    fimse
  fimpara
  escreval("Melhor janela de 3 segundos: ", inicioMelhor, " a ", inicioMelhor + 2, "; ", melhor, " cliques")
fimalgoritmo
```

A janela desliza uma posição por vez e compara as oito somas possíveis.
