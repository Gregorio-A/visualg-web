# Diário do sono

**Data:** 11 de julho · **Nível:** Avançado

## Objetivo

Calcule duração e média de sete noites com horários de início e fim.

## Como funciona

Registre início e fim de sete noites no relógio de 24 horas. Horário de despertar menor ou igual ao de dormir pertence ao dia seguinte.

## Exemplo de execução

```text
23:00–07:00 → 480 minutos nessa noite
```

**Como ler o exemplo:** a seta → significa "resulta em".

Horários iguais representam 24 horas. Horário inválido conta como zero na média das sete noites.

## Dicas para resolução

1. Converta horários em minutos.
2. Ajuste travessia da meia-noite.
3. Some e divida por sete.

## Solução

```visualg
algoritmo "Desafio0711A"
var
i, h1, m1, h2, m2, inicioMin, fimMin, duracao, total: inteiro
inicio
total <- 0
  para i de 1 ate 7 faca
    escreva("Noite ", i, ": hora e minuto de dormir: ")
    leia(h1, m1)
    escreva("Hora e minuto de acordar: ")
    leia(h2, m2)
    se (h1 < 0) ou (h1 > 23) ou (h2 < 0) ou (h2 > 23) ou (m1 < 0) ou (m1 > 59) ou (m2 < 0) ou (m2 > 59) entao
      escreval("Horário inválido; noite contada como zero")
    senao
      inicioMin <- h1 * 60 + m1
      fimMin <- h2 * 60 + m2
      duracao <- fimMin - inicioMin
      se duracao <= 0 entao
        duracao <- duracao + 1440
      fimse
      total <- total + duracao
      escreval("Sono da noite: ", duracao, " min")
    fimse
  fimpara
  escreval("Total semanal: ", total, " min; média por noite: ", total / 7, " min")
fimalgoritmo
```

Cada duração é convertida para minutos e somada antes de dividir por sete.
