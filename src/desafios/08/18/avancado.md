# Campeonato eliminatório

**Data:** 18 de agosto · **Nível:** Avançado

## Objetivo

Simule chaves de oito jogadores com entrada de vencedores por partida.

## Como funciona

Oito jogadores competem em eliminação simples. Em cada partida, informe 1 para o primeiro nome ou 2 para o segundo; vencedores avançam.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Oito jogadores geram quatro partidas, depois duas semifinais e uma final
```

Entrada diferente de 2 é tratada como vitória do primeiro; use apenas 1 ou 2.

## Dicas para resolução

1. Agrupe jogadores de dois em dois.
2. Copie vencedores para o início.
3. Repita até restar um.

## Solução

```visualg
algoritmo "Desafio0818A"
var
nome: vetor[1..8] de caractere
  fase: vetor[1..8] de inteiro
  rodada, partida, a, b, vencedor, destino, i, numeroJogadores: inteiro
inicio
para i de 1 ate 8 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
  fimpara
  numeroJogadores <- 8
  rodada <- 1
  enquanto numeroJogadores > 1 faca
    destino <- 0
    escreval("Rodada ", rodada)
    para partida de 1 ate numeroJogadores div 2 faca
      a <- 2 * partida - 1
      b <- 2 * partida
      escreval(partida, ": ", nome[a], " x ", nome[b])
      escreva("Vencedor (1 primeiro, 2 segundo): ")
      leia(vencedor)
      destino <- destino + 1
      se vencedor = 2 entao
        nome[destino] <- nome[b]
      senao
        nome[destino] <- nome[a]
      fimse
    fimpara
    numeroJogadores <- destino
    rodada <- rodada + 1
  fimenquanto
  escreval("Campeão: ", nome[1])
fimalgoritmo
```

Após cada rodada, os vencedores substituem as primeiras posições do vetor.
