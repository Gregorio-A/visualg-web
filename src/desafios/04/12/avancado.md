# Jogo de pistas

**Data:** 12 de abril · **Nível:** Avançado

## Objetivo

Reduza intervalos possíveis de um número secreto com comparações sucessivas.

## Como funciona

Pense em um número secreto de 1 a 100. O programa escolhe o meio do intervalo e recebe pistas: número maior, menor ou acerto. Atualize os limites até acertar ou esvaziar o intervalo.

## Exemplo de execução

```text
Primeiro palpite 50; resposta “maior”
Novo intervalo: 51 a 100
```

Pistas contraditórias podem produzir um intervalo vazio.

## Dicas para resolução

1. Guarde limites mínimo e máximo.
2. Calcule palpite pelo ponto médio inteiro.
3. Substitua apenas o limite correspondente à pista.

## Solução

```visualg
algoritmo "Desafio0412A"
var
minimo, maximo, palpite, resposta, tentativas: inteiro
inicio
minimo <- 1
  maximo <- 100
  tentativas <- 0
  resposta <- 0
  enquanto (minimo <= maximo) e (resposta <> 3) faca
    palpite <- (minimo + maximo) div 2
    escreval("Palpite: ", palpite)
    escreva("Resposta (1 maior, 2 menor, 3 acertou): ")
    leia(resposta)
    tentativas <- tentativas + 1
    se resposta = 1 entao
      minimo <- palpite + 1
    fimse
    se resposta = 2 entao
      maximo <- palpite - 1
    fimse
    escreval("Intervalo possível: ", minimo, " a ", maximo)
  fimenquanto
  se resposta = 3 entao
    escreval("Encontrado em ", tentativas, " tentativa(s).")
  senao
    escreval("Pistas incompatíveis: intervalo vazio.")
  fimse
fimalgoritmo
```

Cada comparação descarta aproximadamente metade dos candidatos possíveis.
