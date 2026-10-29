# Hora do descanso

**Data:** 11 de julho · **Nível:** Simples

## Objetivo

Calcule a duração do sono em minutos entre dois horários, inclusive atravessando meia-noite.

## Como funciona

Considere um sono de até 24 horas. Quando o horário de acordar não supera o de dormir, some um dia ao término.

## Exemplo de execução

```text
23:00 até 07:00 → 480 min
```

**Como ler o exemplo:** a seta → significa "resulta em".

Horários iguais representam 24 horas nesta atividade.

## Dicas para resolução

1. Converta horas em minutos.
2. Subtraia.
3. Some 1440 se o resultado não for positivo.

## Solução

```visualg
algoritmo "Desafio0711S"
var
h1, m1, h2, m2, inicioMin, fimMin, duracao: inteiro
inicio
escreva("Hora e minuto de dormir: ")
  leia(h1, m1)
  escreva("Hora e minuto de acordar: ")
  leia(h2, m2)
  se (h1 < 0) ou (h1 > 23) ou (h2 < 0) ou (h2 > 23) ou (m1 < 0) ou (m1 > 59) ou (m2 < 0) ou (m2 > 59) entao
    escreval("Horário inválido")
  senao
    inicioMin <- h1 * 60 + m1
    fimMin <- h2 * 60 + m2
    duracao <- fimMin - inicioMin
    se duracao <= 0 entao
      duracao <- duracao + 1440
    fimse
    escreval("Sono: ", duracao, " min")
  fimse
fimalgoritmo
```

Converter ambos os horários para minutos facilita ajustar a travessia da meia-noite.
