# Contador semanal de passos

**Data:** 6 de janeiro · **Nível:** Avançado

## Objetivo

Leia sete totais diários e encontre a maior sequência de dias acima da meta.

Encontre a maior sequência de dias consecutivos em que a meta de passos foi ultrapassada.

## Como funciona

Leia a meta e os totais de sete dias. Um dia conta apenas se seus passos forem estritamente maiores que a meta. Quebre a sequência ao encontrar dia igual ou menor.

## Exemplo de execução

```text
Meta: 1000
Passos: 1200, 1300, 900, 1100, 1500, 1600, 800
Maior sequência: 3 dias
Do dia 4 ao dia 6
```

Se nenhum dia superar a meta, a maior sequência será zero.

## Dicas para resolução

1. Mantenha um contador de dias consecutivos.
2. Zere o contador ao encontrar um dia fora da meta.
3. Guarde a posição inicial quando começa uma nova sequência.

## Solução

```visualg
algoritmo "Desafio0106A"
var
passos: vetor[1..7] de inteiro
  meta, i, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
escreva("Meta diária de passos: ")
  leia(meta)
  atual <- 0
  maior <- 0
  inicioAtual <- 0
  inicioMaior <- 0
  para i de 1 ate 7 faca
    escreva("Passos do dia ", i, ": ")
    leia(passos[i])
    se passos[i] > meta entao
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Maior sequência: ", maior, " dia(s)")
  se maior > 0 entao
    escreval("Do dia ", inicioMaior, " ao dia ", inicioMaior + maior - 1)
  fimse
fimalgoritmo
```

`atual` mede a sequência em andamento e `maior` preserva o maior trecho encontrado.
