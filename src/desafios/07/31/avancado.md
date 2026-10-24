# Relatório do inverno

**Data:** 31 de julho · **Nível:** Avançado

## Objetivo

Analise medições por semana e local numa matriz e destaque extremos.

## Como funciona

Registre temperaturas de três locais em quatro semanas. Mostre média por local, mínima e máxima globais com a posição na matriz.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Local 1 tem 10, 12, 14, 16 °C → média 13 °C
```

**Como ler o exemplo:** a seta → significa "resulta em".

Temperaturas negativas são válidas; empates de extremos preservam a primeira ocorrência.

## Dicas para resolução

1. Use matriz local×semana.
2. Some cada linha.
3. Atualize mínimo e máximo globais.

## Solução

```visualg
algoritmo "Desafio0731A"
var
temperatura: vetor[1..3, 1..4] de real
  local, semana, melhorLocal, melhorSemana, piorLocal, piorSemana: inteiro
  menor, maior, soma: real
inicio
menor <- 999999999
  maior <- -999999999
  para local de 1 ate 3 faca
    soma <- 0
    para semana de 1 ate 4 faca
      escreva("Temperatura local ", local, " semana ", semana, ": ")
      leia(temperatura[local, semana])
      soma <- soma + temperatura[local, semana]
      se temperatura[local, semana] < menor entao
        menor <- temperatura[local, semana]
        piorLocal <- local
        piorSemana <- semana
      fimse
      se temperatura[local, semana] > maior entao
        maior <- temperatura[local, semana]
        melhorLocal <- local
        melhorSemana <- semana
      fimse
    fimpara
    escreval("Média do local ", local, ": ", soma / 4)
  fimpara
  escreval("Mínima: ", menor, " no local ", piorLocal, " semana ", piorSemana)
  escreval("Máxima: ", maior, " no local ", melhorLocal, " semana ", melhorSemana)
fimalgoritmo
```

O percurso da matriz permite acumular cada linha e comparar extremos de todas as células.
