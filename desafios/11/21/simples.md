# Alarme programado

**Data:** 21 de novembro · **Nível:** Simples

## Objetivo

Compare hora em minutos com hora de alarme.

## Como funciona

Compare dois horários do mesmo dia representados em minutos desde a meia-noite.

## Exemplo de execução

```text
Atual 480, alarme 540 → faltam 60 min
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade significa que o alarme chegou.

## Dicas para resolução

1. Use minutos 0–1439.
2. Compare horários.
3. Subtraia se ainda não chegou.

## Solução

```visualg
algoritmo "Desafio1121S"
var
atual, alarme: inteiro
inicio
escreva("Minuto atual desde 00:00: ")
  leia(atual)
  escreva("Minuto do alarme desde 00:00: ")
  leia(alarme)
  se (atual < 0) ou (atual > 1439) ou (alarme < 0) ou (alarme > 1439) entao
    escreval("Horário inválido")
  senao
    se atual >= alarme entao
      escreval("Alarme já chegou")
    senao
      escreval("Faltam ", alarme - atual, " minutos")
    fimse
  fimse
fimalgoritmo
```

A subtração mede o intervalo quando o alarme está no futuro do mesmo dia.
