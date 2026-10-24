# Pluviômetro

**Data:** 7 de setembro · **Nível:** Avançado

## Objetivo

Analise chuva de 30 dias, encontre recordes e maiores sequências secas.

## Como funciona

Leia chuva de trinta dias. Encontre o maior valor e o maior bloco de dias consecutivos sem precipitação.

## Exemplo de execução

```text
Chuva 0,0,5 → maior seca de 2 dias
```

**Como ler o exemplo:** a seta → significa "resulta em".

Chuva negativa é tratada como zero. Empates preservam a primeira ocorrência.

## Dicas para resolução

1. Atualize recorde por comparação.
2. Conte zeros consecutivos.
3. Guarde o maior bloco.

## Solução

```visualg
algoritmo "Desafio0907A"
var
chuva: vetor[1..30] de real
  i, atual, maior, inicioAtual, inicioMaior, diaRecorde: inteiro
  recorde: real
inicio
atual <- 0
  maior <- 0
  recorde <- -1
  para i de 1 ate 30 faca
    escreva("Chuva do dia ", i, " em mm: ")
    leia(chuva[i])
    se chuva[i] < 0 entao
      chuva[i] <- 0
    fimse
    se chuva[i] > recorde entao
      recorde <- chuva[i]
      diaRecorde <- i
    fimse
    se chuva[i] = 0 entao
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Recorde de chuva: ", recorde, " mm no dia ", diaRecorde)
  se maior > 0 entao
    escreval("Maior seca: dias ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, " dias)")
  senao
    escreval("Nenhum dia seco")
  fimse
fimalgoritmo
```

Um máximo guarda o recorde e contadores rastreiam a sequência seca corrente.
