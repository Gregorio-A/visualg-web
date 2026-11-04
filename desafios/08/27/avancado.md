# Histórico de ranking

**Data:** 27 de agosto · **Nível:** Avançado

## Objetivo

Registre rodadas em matriz e compute ranking acumulado com desempates.

## Como funciona

Registre quatro jogadores em três rodadas. Classifique por pontos acumulados, desempate pelo número de rodadas com pontos positivos e depois pela ordem de cadastro.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Ana soma 20 com duas rodadas pontuadas; Beto soma 20 com três → Beto à frente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pontuação não positiva não aumenta pontos nem rodadas pontuadas.

## Dicas para resolução

1. Some cada linha da matriz.
2. Conte rodadas positivas.
3. Ordene índices por dois critérios.

## Solução

```visualg
algoritmo "Desafio0827A"
var
nome: vetor[1..4] de caractere
  rodada: vetor[1..4, 1..3] de inteiro
  pontos, vitorias, ordem: vetor[1..4] de inteiro
  i, j, r, troca: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    vitorias[i] <- 0
    ordem[i] <- i
    para r de 1 ate 3 faca
      escreva("Pontos da rodada ", r, ": ")
      leia(rodada[i, r])
      se rodada[i, r] > 0 entao
        pontos[i] <- pontos[i] + rodada[i, r]
        vitorias[i] <- vitorias[i] + 1
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se (pontos[ordem[j]] > pontos[ordem[i]]) ou ((pontos[ordem[j]] = pontos[ordem[i]]) e (vitorias[ordem[j]] > vitorias[ordem[i]])) entao
        troca <- ordem[i]
        ordem[i] <- ordem[j]
        ordem[j] <- troca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[ordem[i]], ": ", pontos[ordem[i]], " pontos; ", vitorias[ordem[i]], " rodadas pontuadas")
  fimpara
fimalgoritmo
```

O vetor de ordem permite classificar sem perder os índices da matriz de rodadas.
