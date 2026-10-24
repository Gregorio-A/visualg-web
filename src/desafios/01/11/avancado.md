# Registro solar

**Data:** 11 de janeiro · **Nível:** Avançado

## Objetivo

Leia horários de sete dias e identifique o dia com maior duração entre nascer e pôr do sol.

Encontre, entre sete dias, aquele com maior tempo de luz solar.

## Como funciona

Informe nascer e pôr do sol como minutos desde meia-noite. Descarte intervalos com hora inválida ou pôr anterior ao nascer. Se houver empate, conserve o primeiro dia.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Dia 1: 360–1080 (720 min); dia 2: 350–1100 (750 min); demais dias: 360–1080
Maior duração: dia 2 com 750 minuto(s)
```

Se os sete intervalos forem inválidos, mostre que não há dia válido.

## Dicas para resolução

1. Converta cada horário para minutos desde meia-noite.
2. Calcule a diferença somente para intervalos válidos.
3. Atualize o índice de maior duração quando encontrar valor estritamente maior.

## Solução

```visualg
algoritmo "Desafio0111A"
var
nascer, porDoSol: vetor[1..7] de inteiro
  i, diaMaisLongo, duracao, maior: inteiro
inicio
diaMaisLongo <- 0
  maior <- -1
  para i de 1 ate 7 faca
    escreva("Nascer do sol do dia ", i, " (minutos): ")
    leia(nascer[i])
    escreva("Pôr do sol do dia ", i, " (minutos): ")
    leia(porDoSol[i])
    duracao <- porDoSol[i] - nascer[i]
    se (nascer[i] >= 0) e (porDoSol[i] <= 1440) e (duracao >= 0) entao
      se duracao > maior entao
        maior <- duracao
        diaMaisLongo <- i
      fimse
    senao
      escreval("Horários inválidos no dia ", i)
    fimse
  fimpara
  se diaMaisLongo > 0 entao
    escreval("Maior duração: dia ", diaMaisLongo, " com ", maior, " minuto(s)")
  senao
    escreval("Nenhum dia válido foi informado.")
  fimse
fimalgoritmo
```

A duração de cada dia é a diferença dos horários; `maior` e `diaMaisLongo` guardam o melhor resultado.
