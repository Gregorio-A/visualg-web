# Organizador do desfile

**Data:** 11 de fevereiro · **Nível:** Avançado

## Objetivo

Ordene blocos por horário e avise quando houver conflitos de duração.

## Como funciona

Leia nome, início e duração de cinco blocos. Ordene por horário inicial e mostre avisos quando um bloco começar antes do término do anterior.

## Exemplo de execução

```text
Bloco A: 600–660; Bloco B: 640–700; demais após 700
Conflito entre A e B
```

Blocos adjacentes, como 600–660 e 660–700, não conflitam.

## Dicas para resolução

1. Mova nome, início e duração juntos na ordenação.
2. Compare o início atual com o fim anterior.
3. Use comparação estrita para permitir horários adjacentes.

## Solução

```visualg
algoritmo "Desafio0211A"
var
bloco: vetor[1..5] de caractere
  inicioMin, duracao: vetor[1..5] de inteiro
  i, j, tempInteiro: inteiro
  tempNome: caractere
inicio
para i de 1 ate 5 faca
    escreva("Bloco ", i, ": ")
    leia(bloco[i])
    escreva("Início em minutos: ")
    leia(inicioMin[i])
    escreva("Duração em minutos: ")
    leia(duracao[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se inicioMin[j] < inicioMin[i] entao
        tempInteiro <- inicioMin[i]
        inicioMin[i] <- inicioMin[j]
        inicioMin[j] <- tempInteiro
        tempInteiro <- duracao[i]
        duracao[i] <- duracao[j]
        duracao[j] <- tempInteiro
        tempNome <- bloco[i]
        bloco[i] <- bloco[j]
        bloco[j] <- tempNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(bloco[i], ": ", inicioMin[i], " a ", inicioMin[i] + duracao[i])
    se i > 1 entao
      se inicioMin[i] < inicioMin[i - 1] + duracao[i - 1] entao
        escreval("Conflito com ", bloco[i - 1])
      fimse
    fimse
  fimpara
fimalgoritmo
```

A ordenação põe os inícios em ordem. Após isso, o término do bloco anterior é suficiente para detectar um conflito imediato.
