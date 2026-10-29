# Coral assombrado

**Data:** 22 de outubro · **Nível:** Avançado

## Objetivo

Programe uma sequência de vozes em turnos e imprima a grade de entradas.

## Como funciona

Em oito turnos, três vozes entram alternadamente. A cada quarto turno, todas cantam juntas. B marca entrada, ponto marca silêncio.

## Exemplo de execução

```text
Turnos 1,2,3 ativam vozes 1,2,3; turno 4 ativa as três
```

A grade fixa tem três linhas e oito colunas.

## Dicas para resolução

1. Inicialize a grade com pontos.
2. Marque a voz do turno.
3. Sobrescreva múltiplos de quatro.

## Solução

```visualg
algoritmo "Desafio1022A"
var
grade: vetor[1..3, 1..8] de caractere
  voz, turno: inteiro
inicio
para voz de 1 ate 3 faca
    para turno de 1 ate 8 faca
      grade[voz, turno] <- "."
    fimpara
  fimpara
  para turno de 1 ate 8 faca
    voz <- ((turno - 1) mod 3) + 1
    grade[voz, turno] <- "B"
    se turno mod 4 = 0 entao
      grade[1, turno] <- "B"
      grade[2, turno] <- "B"
      grade[3, turno] <- "B"
    fimse
  fimpara
  para voz de 1 ate 3 faca
    escreva("Voz ", voz, ": ")
    para turno de 1 ate 8 faca
      escreva(grade[voz, turno], " ")
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

Módulo três alterna a voz solo; a regra do quarto turno sobrescreve a coluna para canto coletivo.
