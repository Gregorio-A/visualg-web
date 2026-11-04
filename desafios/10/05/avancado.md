# Ranking de caçadores

**Data:** 5 de outubro · **Nível:** Avançado

## Objetivo

Registre pontuações por rodada e classifique equipes com critério de desempate.

## Como funciona

Quatro equipes têm três rodadas. Classifique por pontos totais, desempate por número de rodadas com pontos positivos e depois por cadastro.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
A soma 10 supera 8; em empate de 10 pontos, vence quem pontuou em mais rodadas
```

Valor não positivo não aumenta pontuação nem rodadas pontuadas.

## Dicas para resolução

1. Acumule pontos e rodadas pontuadas.
2. Compare o total primeiro.
3. Use o segundo critério no empate.

## Solução

```visualg
algoritmo "Desafio1005A"
var
nome: vetor[1..4] de caractere
  pontos, vitorias, ordem: vetor[1..4] de inteiro
  equipe, rodada, valor, i, j, troca: inteiro
inicio
para equipe de 1 ate 4 faca
    escreva("Equipe ", equipe, ": ")
    leia(nome[equipe])
    pontos[equipe] <- 0
    vitorias[equipe] <- 0
    ordem[equipe] <- equipe
    para rodada de 1 ate 3 faca
      escreva("Pontos da rodada ", rodada, ": ")
      leia(valor)
      se valor > 0 entao
        pontos[equipe] <- pontos[equipe] + valor
        vitorias[equipe] <- vitorias[equipe] + 1
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
    escreval(i, "º ", nome[ordem[i]], ": ", pontos[ordem[i]], " pontos, ", vitorias[ordem[i]], " rodadas pontuadas")
  fimpara
fimalgoritmo
```

Ordenar índices preserva os atributos das equipes e aplica dois critérios.
