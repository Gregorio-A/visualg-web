# Orçamento da decoração

**Data:** 28 de junho · **Nível:** Avançado

## Objetivo

Monte itens por prioridade e sinalize excesso do teto disponível.

## Como funciona

Cadastre cinco itens com custo e prioridade numérica. Considere primeiro a menor prioridade numérica e aprove itens que caibam no teto restante.

## Exemplo de execução

```text
Teto R$ 10; item prioritário custa R$ 7 e próximo R$ 5 → primeiro aprovado, segundo fora do orçamento
```

**Como ler o exemplo:** a seta → significa "resulta em".

Custo negativo é recusado. Empate na prioridade conserva ordem de cadastro.

## Dicas para resolução

1. Ordene custo, prioridade e nome juntos.
2. Mantenha gasto acumulado.
3. Aprove só se não exceder teto.

## Solução

```visualg
algoritmo "Desafio0628A"
var
nome: vetor[1..5] de caractere
  custo: vetor[1..5] de real
  prioridade: vetor[1..5] de inteiro
  i, j, trocaI: inteiro
  trocaR, teto, gasto: real
  trocaNome: caractere
inicio
escreva("Teto disponível: ")
  leia(teto)
  para i de 1 ate 5 faca
    escreva("Item ", i, ": ")
    leia(nome[i])
    escreva("Custo: ")
    leia(custo[i])
    escreva("Prioridade (1 mais alta): ")
    leia(prioridade[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se prioridade[j] < prioridade[i] entao
        trocaI <- prioridade[i]
        prioridade[i] <- prioridade[j]
        prioridade[j] <- trocaI
        trocaR <- custo[i]
        custo[i] <- custo[j]
        custo[j] <- trocaR
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  gasto <- 0
  para i de 1 ate 5 faca
    se (custo[i] >= 0) e (gasto + custo[i] <= teto) entao
      gasto <- gasto + custo[i]
      escreval("Aprovado: ", nome[i], "; gasto R$ ", gasto)
    senao
      escreval("Fora do orçamento: ", nome[i])
    fimse
  fimpara
  escreval("Saldo: R$ ", teto - gasto)
fimalgoritmo
```

A ordenação define precedência; cada aprovação reduz o orçamento disponível.
