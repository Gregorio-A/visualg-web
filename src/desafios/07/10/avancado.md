# Cozinha solidária

**Data:** 10 de julho · **Nível:** Avançado

## Objetivo

Distribua porções entre equipes, respeitando volumes e número de pessoas.

## Como funciona

Atenda três equipes em ordem com um estoque total de porções. Cada pessoa precisa da mesma quantidade; reporte servido e déficit por equipe.

## Exemplo de execução

```text
10 porções, 2 por pessoa; equipes de 3 e 3 pessoas → servidas 6 e 4; segunda fica com falta 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Equipe com zero pessoa não consome.

## Dicas para resolução

1. Calcule demanda da equipe.
2. Sirva até o estoque restante.
3. Mostre a diferença como falta.

## Solução

```visualg
algoritmo "Desafio0710A"
var
equipe: vetor[1..3] de inteiro
  i, pessoas, porPessoa, disponivel, necessario, servido, falta: inteiro
inicio
escreva("Porções disponíveis: ")
  leia(disponivel)
  escreva("Porções planejadas por pessoa: ")
  leia(porPessoa)
  se (disponivel < 0) ou (porPessoa <= 0) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate 3 faca
      escreva("Pessoas da equipe ", i, ": ")
      leia(equipe[i])
      se equipe[i] < 0 entao
        equipe[i] <- 0
      fimse
      necessario <- equipe[i] * porPessoa
      servido <- necessario
      se servido > disponivel entao
        servido <- disponivel
      fimse
      falta <- necessario - servido
      disponivel <- disponivel - servido
      escreval("Equipe ", i, ": ", servido, " porção(ões); faltam ", falta)
    fimpara
    escreval("Sobra na cozinha: ", disponivel)
  fimse
fimalgoritmo
```

O estoque diminui após cada atendimento e nunca fica negativo.
