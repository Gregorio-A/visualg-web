# Planejador de fornadas

**Data:** 7 de junho · **Nível:** Avançado

## Objetivo

Distribua receitas com tempos diferentes em um cronograma de forno único.

## Como funciona

Programe até cinco receitas em ordem de cadastro num forno único. Cada receita começa quando a anterior termina.

## Exemplo de execução

```text
Início 60 min; receitas de 20 e 15 min → 60–80 e 80–95
```

**Como ler o exemplo:** a seta → significa "resulta em".

Duração negativa é tratada como zero; nenhuma receita deixa o horário de liberação igual ao inicial.

## Dicas para resolução

1. Guarde duração de cada receita.
2. Mostre início e fim atuais.
3. Avance o relógio ao fim de cada lote.

## Solução

```visualg
algoritmo "Desafio0607A"
var
nome: vetor[1..5] de caractere
  duracao: vetor[1..5] de inteiro
  i, n, horario, tempo: inteiro
inicio
escreva("Quantidade de receitas (0 a 5): ")
  leia(n)
  escreva("Início do forno em minutos: ")
  leia(horario)
  se (n < 0) ou (n > 5) ou (horario < 0) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate n faca
      escreva("Nome da receita ", i, ": ")
      leia(nome[i])
      escreva("Duração em minutos: ")
      leia(duracao[i])
    fimpara
    para i de 1 ate n faca
      tempo <- duracao[i]
      se tempo < 0 entao
        tempo <- 0
      fimse
      escreval(nome[i], ": de ", horario, " a ", horario + tempo, " min")
      horario <- horario + tempo
    fimpara
    escreval("Forno livre em ", horario, " min")
  fimse
fimalgoritmo
```

O relógio acumulado nunca sobrepõe duas receitas no mesmo forno.
