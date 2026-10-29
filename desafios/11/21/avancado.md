# Agenda de alarmes

**Data:** 21 de novembro · **Nível:** Avançado

## Objetivo

Armazene horários e recorrências e liste disparos para um dia informado.

## Como funciona

Cadastre cinco alarmes com horário e recorrência: único no dia 1, diário ou dias pares. Consulte os disparos ainda futuros de um dia numérico.

## Exemplo de execução

```text
Alarme diário às 600 min, consulta dia 3 às 500 min → aparecerá
```

**Como ler o exemplo:** a seta → significa "resulta em".

Alarme no minuto atual ainda aparece; horários fora de 0–1439 são ignorados.

## Dicas para resolução

1. Guarde horário e recorrência.
2. Teste se vale para o dia.
3. Mostre apenas horários futuros.

## Solução

```visualg
algoritmo "Desafio1121A"
var
horario, recorrencia: vetor[1..5] de inteiro
  nome: vetor[1..5] de caractere
  i, dia, agora: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Alarme ", i, ": ")
    leia(nome[i])
    escreva("Horário em minutos desde 00:00: ")
    leia(horario[i])
    escreva("Recorrência (0 único, 1 todos os dias, 2 dias pares): ")
    leia(recorrencia[i])
  fimpara
  escreva("Dia a consultar: ")
  leia(dia)
  escreva("Minuto atual desse dia: ")
  leia(agora)
  para i de 1 ate 5 faca
    se (horario[i] >= agora) e (horario[i] <= 1439) e (horario[i] >= 0) entao
      se (recorrencia[i] = 1) ou ((recorrencia[i] = 2) e (dia mod 2 = 0)) ou ((recorrencia[i] = 0) e (dia = 1)) entao
        escreval(nome[i], " disparará no minuto ", horario[i])
      fimse
    fimse
  fimpara
fimalgoritmo
```

A recorrência filtra o dia e a comparação de minutos filtra o que ainda não passou.
