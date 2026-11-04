# Duração da celebração

**Data:** 20 de dezembro · **Nível:** Simples

## Objetivo

Calcule diferença de tempo entre dois horários, mesmo após meia-noite.

## Como funciona

Se o horário final precede o inicial, considere o dia seguinte; horários iguais duram zero.

## Exemplo de execução

```text
23:30 a 01:00 → 1 h e 30 min
```

**Como ler o exemplo:** a seta → significa "resulta em".

23:59 a 00:01 dura 2 minutos.

## Dicas para resolução

1. Converta cada horário para minutos.
2. Some 1440 ao fim se houver virada.
3. Subtraia e decomponha em horas e minutos.

## Solução

```visualg
algoritmo "Desafio1220S"
var
  hi, mi, hf, mf, inicioMin, fimMin, duracao: inteiro
inicio
  escreva("Hora inicial: ")
  leia(hi)
  escreva("Minuto inicial: ")
  leia(mi)
  escreva("Hora final: ")
  leia(hf)
  escreva("Minuto final: ")
  leia(mf)
  se (hi < 0) ou (hi > 23) ou (hf < 0) ou (hf > 23) ou (mi < 0) ou (mi > 59) ou (mf < 0) ou (mf > 59) entao
    escreval("Horário inválido")
  senao
    inicioMin <- hi*60+mi
    fimMin <- hf*60+mf
    se fimMin < inicioMin entao
      fimMin <- fimMin+1440
    fimse
    duracao <- fimMin-inicioMin
    escreval("Duração: ", duracao div 60, " h e ", duracao mod 60, " min")
  fimse
fimalgoritmo
```

Converta em minutos e acrescente um dia ao fim após a virada.
