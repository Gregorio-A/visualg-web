# Pôr do sol

**Data:** 11 de janeiro · **Nível:** Simples

## Objetivo

Leia dois horários inteiros em minutos e calcule o intervalo entre eles.

Calcule o tempo transcorrido entre dois horários expressos em minutos do mesmo dia.

## Como funciona

Leia início e fim como minutos desde meia-noite. Subtraia apenas se o fim não preceder o início.

## Exemplo de execução

```text
Horário inicial (minutos): 600
Horário final (minutos): 645
Intervalo: 45 minuto(s)
```

Horários iguais produzem intervalo de zero minuto.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0111S"
var
horarioInicial, horarioFinal, intervalo: inteiro
inicio
escreva("Horário inicial (minutos): ")
  leia(horarioInicial)
  escreva("Horário final (minutos): ")
  leia(horarioFinal)
  se horarioFinal >= horarioInicial entao
    intervalo <- horarioFinal - horarioInicial
    escreval("Intervalo: ", intervalo, " minuto(s)")
  senao
    escreval("O horário final deve ser posterior ao inicial no mesmo dia.")
  fimse
fimalgoritmo
```

A diferença `fim - inicio` fornece a duração sem precisar converter horas e minutos.
