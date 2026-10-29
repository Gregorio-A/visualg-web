# Linha do tempo

**Data:** 29 de julho · **Nível:** Avançado

## Objetivo

Ordene eventos por dia e horário e calcule intervalos entre atividades.

## Como funciona

Cadastre cinco eventos do mesmo mês com dia e minuto do dia. Ordene cronologicamente e calcule o intervalo em minutos entre eventos consecutivos.

## Exemplo de execução

```text
Dia 2 às 60 min e dia 3 às 30 min → intervalo de 1410 min
```

**Como ler o exemplo:** a seta → significa "resulta em".

Dia deve estar entre 1 e 31, minuto entre 0 e 1439; a atividade pressupõe entradas válidas.

## Dicas para resolução

1. Ordene primeiro por dia e depois por minuto.
2. Mantenha nome junto.
3. Converta ambos para minutos absolutos.

## Solução

```visualg
algoritmo "Desafio0729A"
var
nome: vetor[1..5] de caractere
  dia, minuto: vetor[1..5] de inteiro
  i, j, trocaI, instanteAnterior, instanteAtual: inteiro
  trocaNome: caractere
inicio
para i de 1 ate 5 faca
    escreva("Evento ", i, ": ")
    leia(nome[i])
    escreva("Dia de julho: ")
    leia(dia[i])
    escreva("Minuto do dia (0 a 1439): ")
    leia(minuto[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (dia[j] < dia[i]) ou ((dia[j] = dia[i]) e (minuto[j] < minuto[i])) entao
        trocaI <- dia[i]
        dia[i] <- dia[j]
        dia[j] <- trocaI
        trocaI <- minuto[i]
        minuto[i] <- minuto[j]
        minuto[j] <- trocaI
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(nome[i], ": dia ", dia[i], ", minuto ", minuto[i])
    se i > 1 entao
      instanteAnterior <- dia[i - 1] * 1440 + minuto[i - 1]
      instanteAtual <- dia[i] * 1440 + minuto[i]
      escreval("Intervalo desde o anterior: ", instanteAtual - instanteAnterior, " min")
    fimse
  fimpara
fimalgoritmo
```

Transformar dia e minuto num único instante em minutos permite subtrair eventos de dias diferentes.
