# Controle de ponto

**Data:** 1 de maio · **Nível:** Avançado

## Objetivo

Registre entrada e saída de funcionários e calcule horas extras e atrasos.

## Como funciona

Leia jornada contratada e entrada padrão, ambos em minutos. Para quatro funcionários, calcule tempo trabalhado, extra acima da jornada e atraso em relação à entrada padrão.

## Exemplo de execução

```text
Padrão 480, jornada 480; Ana entrou 490 e saiu 1000
Trabalhou 510 min, fez 30 min extras e atrasou 10 min
```

Horário de saída anterior ao de entrada é inválido neste modelo de mesmo dia.

## Dicas para resolução

1. Use minutos como escala comum.
2. Calcule saída menos entrada.
3. Compare separadamente jornada trabalhada e horário de chegada.

## Solução

```visualg
algoritmo "Desafio0501A"
var
nome: vetor[1..4] de caractere
  entrada, saida, contratada, tolerancia, trabalhado, extras, atraso, i: inteiro
inicio
escreva("Jornada contratada (min): ")
  leia(contratada)
  escreva("Horário padrão de entrada (min): ")
  leia(tolerancia)
  para i de 1 ate 4 faca
    escreva("Funcionário ", i, ": ")
    leia(nome[i])
    escreva("Entrada (min): ")
    leia(entrada)
    escreva("Saída (min): ")
    leia(saida)
    se saida >= entrada entao
      trabalhado <- saida - entrada
      extras <- trabalhado - contratada
      se extras < 0 entao
        extras <- 0
      fimse
      atraso <- entrada - tolerancia
      se atraso < 0 entao
        atraso <- 0
      fimse
      escreval(nome[i], ": trabalhado ", trabalhado, ", extra ", extras, ", atraso ", atraso, " min")
    senao
      escreval("Horários inválidos para ", nome[i])
    fimse
  fimpara
fimalgoritmo
```

As duas diferenças são limitadas a zero quando não há extra nem atraso.
