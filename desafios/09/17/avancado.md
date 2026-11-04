# Controle de safra

**Data:** 17 de setembro · **Nível:** Avançado

## Objetivo

Calcule produção por canteiro, perdas e receita líquida.

## Como funciona

Para quatro canteiros, calcule produção vendável = produção menos perda. Multiplique por preço por kg e some a receita.

## Exemplo de execução

```text
Produção 10 kg, perda 2 kg, preço R$ 5/kg → R$ 40
```

**Como ler o exemplo:** a seta → significa "resulta em".

Perda maior que produção invalida o canteiro.

## Dicas para resolução

1. Subtraia perdas.
2. Multiplique pelo preço.
3. Some canteiros válidos.

## Solução

```visualg
algoritmo "Desafio0917A"
var
producao, perda: vetor[1..4] de real
  i: inteiro
  preco, liquida, receita: real
inicio
escreva("Preço de venda por kg: ")
  leia(preco)
  receita <- 0
  para i de 1 ate 4 faca
    escreva("Produção do canteiro ", i, " (kg): ")
    leia(producao[i])
    escreva("Perda em kg: ")
    leia(perda[i])
    se (producao[i] >= 0) e (perda[i] >= 0) e (perda[i] <= producao[i]) e (preco >= 0) entao
      liquida <- producao[i] - perda[i]
      receita <- receita + liquida * preco
      escreval("Canteiro ", i, ": ", liquida, " kg vendáveis")
    senao
      escreval("Registro inválido")
    fimse
  fimpara
  escreval("Receita líquida estimada: R$ ", receita)
fimalgoritmo
```

A receita considera somente a massa efetivamente vendável.
