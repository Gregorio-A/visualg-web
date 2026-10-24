# Campeonato de cartas

**Data:** 16 de julho · **Nível:** Avançado

## Objetivo

Leia resultados de rodadas e compute pontos e desempates dos jogadores.

## Como funciona

Quatro jogadores disputam seis partidas. Vitória vale 3 pontos, empate vale 1 a cada jogador. Mostre classificação por pontos e, como desempate, vitórias.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
A vence B → A ganha 3 pontos e uma vitória; B não pontua
```

**Como ler o exemplo:** a seta → significa "resulta em".

Partida com mesmo jogador nos dois lados é ignorada.

## Dicas para resolução

1. Guarde pontos e vitórias.
2. Atualize os dois jogadores no empate.
3. Compare pontos e vitórias no ranking.

## Solução

```visualg
algoritmo "Desafio0716A"
var
nome: vetor[1..4] de caractere
  vitorias, empates, pontos, ordem: vetor[1..4] de inteiro
  i, j, rodada, a, b, troca: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    vitorias[i] <- 0
    empates[i] <- 0
    pontos[i] <- 0
    ordem[i] <- i
  fimpara
  para rodada de 1 ate 6 faca
    escreva("Índice do jogador A e B: ")
    leia(a, b)
    escreva("Resultado (1 A vence, 2 B vence, 3 empate): ")
    leia(i)
    se (a >= 1) e (a <= 4) e (b >= 1) e (b <= 4) e (a <> b) entao
      se i = 1 entao
        pontos[a] <- pontos[a] + 3
        vitorias[a] <- vitorias[a] + 1
      senao
        se i = 2 entao
          pontos[b] <- pontos[b] + 3
          vitorias[b] <- vitorias[b] + 1
        senao
          se i = 3 entao
            pontos[a] <- pontos[a] + 1
            pontos[b] <- pontos[b] + 1
            empates[a] <- empates[a] + 1
            empates[b] <- empates[b] + 1
          fimse
        fimse
      fimse
    fimse
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
    escreval(i, "º ", nome[ordem[i]], ": ", pontos[ordem[i]], " ponto(s), ", vitorias[ordem[i]], " vitória(s), ", empates[ordem[i]], " empate(s)")
  fimpara
fimalgoritmo
```

Vetores acumulam estatísticas por jogador; um vetor de índices forma a classificação.
