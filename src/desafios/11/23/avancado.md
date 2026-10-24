# Perfil de inicialização

**Data:** 23 de novembro · **Nível:** Avançado

## Objetivo

Analise tempos por processo, identifique gargalo e custo acumulado.

## Como funciona

Cinco processos iniciam sequencialmente. Some tempos, mostre custo acumulado e identifique o processo individual mais lento.

## Exemplo de execução

```text
Tempos 2, 5 e 3 s → total 10 s, gargalo no processo de 5 s
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tempo negativo é ignorado. Empate preserva o primeiro gargalo.

## Dicas para resolução

1. Acumule tempos.
2. Compare cada processo com o maior.
3. Mostre ambos.

## Solução

```visualg
algoritmo "Desafio1123A"
var
processo: vetor[1..5] de caractere
  tempo: vetor[1..5] de real
  i, gargalo: inteiro
  soma, maior: real
inicio
soma <- 0
  maior <- -1
  para i de 1 ate 5 faca
    escreva("Processo ", i, ": ")
    leia(processo[i])
    escreva("Tempo de inicialização (s): ")
    leia(tempo[i])
    se tempo[i] >= 0 entao
      soma <- soma + tempo[i]
      escreval("Tempo acumulado até aqui: ", soma, " s")
      se tempo[i] > maior entao
        maior <- tempo[i]
        gargalo <- i
      fimse
    fimse
  fimpara
  se maior >= 0 entao
    escreval("Gargalo: ", processo[gargalo], " com ", maior, " s")
  fimse
  escreval("Inicialização total sequencial: ", soma, " s")
fimalgoritmo
```

A soma representa o tempo sequencial e o máximo localiza o gargalo individual.
