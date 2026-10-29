# Monitor de volume

**Data:** 19 de fevereiro · **Nível:** Avançado

## Objetivo

Leia medições por horário e destaque períodos consecutivos acima do limite.

## Como funciona

Leia oito medições em ordem temporal. Um período de alerta contém horários consecutivos com valores estritamente acima do limite.

## Exemplo de execução

```text
Limite: 80; medições: 70, 90, 95, 80, 85, 60, 60, 60
Períodos: horários 2 a 3; horário 5 a 5
```

Valor igual ao limite encerra um período de alerta.

## Dicas para resolução

1. Guarde o início da sequência quando entrar em alerta.
2. Finalize ao encontrar um valor no limite ou abaixo.
3. Trate o caso em que a sequência chega ao último horário.

## Solução

```visualg
algoritmo "Desafio0219A"
var
medidas: vetor[1..8] de real
  limite: real
  i, comeco: inteiro
  aberto: logico
inicio
escreva("Limite de volume: ")
  leia(limite)
  aberto <- falso
  para i de 1 ate 8 faca
    escreva("Medição no horário ", i, ": ")
    leia(medidas[i])
    se medidas[i] > limite entao
      se nao aberto entao
        comeco <- i
        aberto <- verdadeiro
      fimse
    senao
      se aberto entao
        escreval("Período acima do limite: horários ", comeco, " a ", i - 1)
        aberto <- falso
      fimse
    fimse
  fimpara
  se aberto entao
    escreval("Período acima do limite: horários ", comeco, " a 8")
  fimse
fimalgoritmo
```

`aberto` indica se existe uma sequência ativa; ela é fechada no primeiro valor não alto ou ao fim das oito medições.
