# Balanço do arraial

**Data:** 30 de junho · **Nível:** Avançado

## Objetivo

Consolide receitas e despesas das barracas e determine lucro de cada uma.

## Como funciona

Para três barracas, calcule receita menos despesa. Some os resultados para obter o balanço geral.

## Exemplo de execução

```text
Barraca A: receita R$ 100, despesa R$ 40 → lucro R$ 60
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resultado negativo representa prejuízo e continua entrando na soma geral.

## Dicas para resolução

1. Subtraia despesa da receita.
2. Permita lucro negativo.
3. Some os três resultados.

## Solução

```visualg
algoritmo "Desafio0630A"
var
nome: vetor[1..3] de caractere
  receita, despesa: vetor[1..3] de real
  i: inteiro
  lucro, total: real
inicio
total <- 0
  para i de 1 ate 3 faca
    escreva("Barraca ", i, ": ")
    leia(nome[i])
    escreva("Receita: ")
    leia(receita[i])
    escreva("Despesa: ")
    leia(despesa[i])
    se (receita[i] >= 0) e (despesa[i] >= 0) entao
      lucro <- receita[i] - despesa[i]
      total <- total + lucro
      escreval(nome[i], ": resultado R$ ", lucro)
    senao
      escreval("Dados inválidos ignorados")
    fimse
  fimpara
  escreval("Resultado geral: R$ ", total)
fimalgoritmo
```

O resultado de cada barraca é calculado separadamente e depois consolidado.
