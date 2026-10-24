# Placar de torneio

**Data:** 25 de julho · **Nível:** Avançado

## Objetivo

Gerencie quatro jogadores e classificação após várias rodadas.

## Como funciona

Quatro jogadores disputam três rodadas. Exiba o placar acumulado após cada rodada e, ao final, classifique por pontos decrescentes.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Ana faz 3, 2, 4 → placares 3, 5 e 9
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pontuação negativa de uma rodada é ignorada; empate conserva cadastro.

## Dicas para resolução

1. Acumule pontos por índice.
2. Mostre após cada rodada.
3. Ordene os totais ao fim.

## Solução

```visualg
algoritmo "Desafio0725A"
var
nome: vetor[1..4] de caractere
  pontos: vetor[1..4] de inteiro
  i, rodada, valor, j, troca: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
  fimpara
  para rodada de 1 ate 3 faca
    escreval("Rodada ", rodada)
    para i de 1 ate 4 faca
      escreva("Pontos de ", nome[i], ": ")
      leia(valor)
      se valor >= 0 entao
        pontos[i] <- pontos[i] + valor
      fimse
    fimpara
    para i de 1 ate 4 faca
      escreval(nome[i], ": ", pontos[i], " ponto(s) acumulados")
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara
fimalgoritmo
```

O total por jogador é atualizado em cada rodada antes da ordenação final.
