# Cronograma da festa

**Data:** 1 de dezembro · **Nível:** Avançado

## Objetivo

Organize atividades por horário e duração, detectando conflitos.

## Como funciona

Cadastre cinco atividades com início entre 0 e 1439 minutos e duração positiva. Intervalos são [início, fim); atividades que apenas se tocam não conflitam.

## Exemplo de execução

```text
10:00–11:00 e 10:30–11:30 → conflito; 11:00–12:00 não conflita com a primeira.
```

**Como ler o exemplo:** a seta → significa "resulta em".

A duração pode levar uma atividade além da meia-noite; compare minutos absolutos.

## Dicas para resolução

1. Converta horários para minutos.
2. Guarde início e fim.
3. Compare cada par uma única vez.

## Solução

```visualg
algoritmo "Desafio1201A"
var
  horario, duracao, termino: vetor[1..5] de inteiro
  i, j, conflitos: inteiro
inicio
  para i de 1 ate 5 faca
    repita
      escreva("Atividade ", i, ": início em minutos após 00:00: ")
      leia(horario[i])
      escreva("Duração em minutos: ")
      leia(duracao[i])
    ate (horario[i] >= 0) e (horario[i] < 1440) e (duracao[i] > 0)
    termino[i] <- horario[i] + duracao[i]
  fimpara
  conflitos <- 0
  para i de 1 ate 4 faca
    para j de i+1 ate 5 faca
      se (horario[i] < termino[j]) e (horario[j] < termino[i]) entao
        escreval("Conflito entre atividades ", i, " e ", j)
        conflitos <- conflitos + 1
      fimse
    fimpara
  fimpara
  escreval("Pares em conflito: ", conflitos)
fimalgoritmo
```

Dois intervalos se cruzam quando cada um começa antes do término do outro.
