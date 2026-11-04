# Meta de leitura

**Data:** 11 de março · **Nível:** Avançado

## Objetivo

Registre páginas lidas por dia e identifique a maior sequência de progresso.

## Como funciona

Leia páginas lidas em sete dias. Um dia de progresso tem pelo menos uma página; encontre a maior sequência de dias consecutivos de progresso.

## Exemplo de execução

```text
Páginas: 2, 3, 0, 1, 5, 2, 0
Maior sequência: 3 dias, do dia 4 ao 6
```

Se ninguém leu páginas na semana, a sequência é zero.

## Dicas para resolução

1. Defina progresso como páginas > 0.
2. Conte dias consecutivos com progresso.
3. Guarde o começo da sequência mais longa.

## Solução

```visualg
algoritmo "Desafio0311A"
var
paginas: vetor[1..7] de inteiro
  i, atual, maior, inicioAtual, inicioMaior: inteiro
inicio
atual <- 0
  maior <- 0
  para i de 1 ate 7 faca
    escreva("Páginas lidas no dia ", i, ": ")
    leia(paginas[i])
    se paginas[i] > 0 entao
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
  escreval("Maior sequência de leitura: ", maior, " dia(s)")
  se maior > 0 entao
    escreval("Dias ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse
fimalgoritmo
```

O contador atual zera quando aparecem zero páginas e o maior guarda a melhor sequência.
