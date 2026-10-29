# Planejador de transporte

**Data:** 8 de janeiro · **Nível:** Avançado

## Objetivo

Compare três rotas com tarifa e duração e identifique a mais barata e a mais rápida.

Compare três rotas e identifique separadamente a menor tarifa e a menor duração.

## Como funciona

Leia nome, preço e duração de cada rota. Calcule dois índices independentes, pois a rota mais barata pode não ser a mais rápida.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Rotas: A R$ 10/40 min; B R$ 12/25 min; C R$ 15/30 min
Mais barata: A — 10
Mais rápida: B — 25 minutos
```

Em empate, mantenha a primeira rota cadastrada para aquele critério.

## Dicas para resolução

1. Use vetores paralelos para cada atributo.
2. Comece com a primeira rota como referência.
3. Faça comparações independentes para tarifa e duração.

## Solução

```visualg
algoritmo "Desafio0108A"
var
nome: vetor[1..3] de caractere
  tarifa, duracao: vetor[1..3] de real
  i, barata, rapida: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Rota ", i, ": ")
    leia(nome[i])
    escreva("Tarifa: ")
    leia(tarifa[i])
    escreva("Duração (minutos): ")
    leia(duracao[i])
  fimpara
  barata <- 1
  rapida <- 1
  para i de 2 ate 3 faca
    se tarifa[i] < tarifa[barata] entao
      barata <- i
    fimse
    se duracao[i] < duracao[rapida] entao
      rapida <- i
    fimse
  fimpara
  escreval("Mais barata: ", nome[barata], " — ", tarifa[barata])
  escreval("Mais rápida: ", nome[rapida], " — ", duracao[rapida], " minutos")
fimalgoritmo
```

Dois índices evitam confundir os critérios preço e tempo.
