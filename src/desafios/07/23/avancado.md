# Produção de biscoitos

**Data:** 23 de julho · **Nível:** Avançado

## Objetivo

Organize pedidos e calcule lotes de receitas com capacidades diferentes.

## Como funciona

Some quatro pedidos de duas receitas de biscoitos. Cada receita tem capacidade por lote distinta; calcule lotes inteiros e sobras para cada tipo.

## Exemplo de execução

```text
Pedidos A totalizam 11; lote A rende 5 → três lotes, sobra 4
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pedido não positivo não acrescenta produção.

## Dicas para resolução

1. Some pedidos por receita.
2. Divida cada soma pela capacidade.
3. Arredonde para cima e calcule sobra.

## Solução

```visualg
algoritmo "Desafio0723A"
var
pedido: vetor[1..4] de inteiro
  i, capacidadeA, capacidadeB, lotesA, lotesB, totalA, totalB: inteiro
inicio
escreva("Biscoitos por lote da receita A: ")
  leia(capacidadeA)
  escreva("Biscoitos por lote da receita B: ")
  leia(capacidadeB)
  se (capacidadeA <= 0) ou (capacidadeB <= 0) entao
    escreval("Capacidades inválidas")
  senao
    totalA <- 0
    totalB <- 0
    para i de 1 ate 4 faca
      escreva("Pedido ", i, " de biscoitos A: ")
      leia(pedido[i])
      se pedido[i] > 0 entao
        totalA <- totalA + pedido[i]
      fimse
      escreva("Pedido ", i, " de biscoitos B: ")
      leia(pedido[i])
      se pedido[i] > 0 entao
        totalB <- totalB + pedido[i]
      fimse
    fimpara
    lotesA <- totalA div capacidadeA
    se totalA mod capacidadeA <> 0 entao
      lotesA <- lotesA + 1
    fimse
    lotesB <- totalB div capacidadeB
    se totalB mod capacidadeB <> 0 entao
      lotesB <- lotesB + 1
    fimse
    escreval("Receita A: ", lotesA, " lote(s), sobra ", lotesA * capacidadeA - totalA)
    escreval("Receita B: ", lotesB, " lote(s), sobra ", lotesB * capacidadeB - totalB)
  fimse
fimalgoritmo
```

Consolidar os pedidos antes de arredondar evita produzir lotes extras desnecessários.
