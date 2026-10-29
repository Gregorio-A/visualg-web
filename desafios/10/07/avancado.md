# Corrida de vassouras

**Data:** 7 de outubro · **Nível:** Avançado

## Objetivo

Registre parciais por competidor e calcule classificação por tempo acumulado.

## Como funciona

Quatro competidores percorrem três trechos. Some parciais positivas e classifique os quatro pelo tempo acumulado crescente.

## Exemplo de execução

```text
Parciais 10, 20 e 15 s → total 45 s; quem tiver 40 s aparece antes.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Cada parcial deve ser positiva. Empates mantêm a ordem de cadastro.

## Dicas para resolução

1. Some três parciais por competidor.
2. Ordene os totais crescentemente.
3. Troque nomes com seus tempos.

## Solução

```visualg
algoritmo "Desafio1007A"
var
nome: vetor[1..4] de caractere
  tempo: vetor[1..4] de real
  i, j, trecho: inteiro
  parcial, auxTempo: real
  auxNome: caractere
inicio
para i de 1 ate 4 faca
    escreva("Competidor ", i, ": ")
    leia(nome[i])
    tempo[i] <- 0
    para trecho de 1 ate 3 faca
      repita
        escreva("Tempo da parcial ", trecho, " (s): ")
        leia(parcial)
      ate parcial > 0
      tempo[i] <- tempo[i] + parcial
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i+1 ate 4 faca
      se tempo[j] < tempo[i] entao
        auxTempo <- tempo[i]
        tempo[i] <- tempo[j]
        tempo[j] <- auxTempo
        auxNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", tempo[i]:0:2, " s")
  fimpara
fimalgoritmo
```

Somar trechos produz o tempo final; a ordenação troca nome e tempo juntos.
