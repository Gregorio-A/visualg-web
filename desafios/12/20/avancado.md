# Agenda noturna

**Data:** 20 de dezembro · **Nível:** Avançado

## Objetivo

Organize atrações e calcule horários de término atravessando a virada do dia.

## Como funciona

Cadastre cinco atrações com início no dia 1 e duração em minutos; mostre dia relativo e horário de término, inclusive após meia-noite.

### Palavras úteis

- **Quociente:** É o resultado de uma divisão.
- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
23:30 + 90 minutos → dia 2 às 01:00.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Duração zero termina no mesmo instante.

## Dicas para resolução

1. Converta horário em minutos.
2. Some a duração.
3. Separe dia e horário usando div e mod.

## Solução

```visualg
algoritmo "Desafio1220A"
var
  horario, duracao, termino: vetor[1..5] de inteiro
  i, hora, minuto: inteiro
inicio
  para i de 1 ate 5 faca
    repita
      escreva("Início da atração ", i, " (hora e minuto): ")
      leia(hora, minuto)
      escreva("Duração em minutos: ")
      leia(duracao[i])
    ate (hora >= 0) e (hora < 24) e (minuto >= 0) e (minuto < 60) e (duracao[i] >= 0)
    horario[i] <- hora*60+minuto
    termino[i] <- horario[i]+duracao[i]
    hora <- (termino[i] mod 1440) div 60
    minuto <- (termino[i] mod 1440) mod 60
    escreva("Atração ", i, " termina no dia ", 1+termino[i] div 1440, " às ")
    se hora < 10 entao
      escreva("0")
    fimse
    escreva(hora, ":")
    se minuto < 10 entao
      escreva("0")
    fimse
    escreval(minuto)
  fimpara
fimalgoritmo
```

Converta para minutos absolutos; quociente por 1440 indica o dia e resto indica hora/minuto.
