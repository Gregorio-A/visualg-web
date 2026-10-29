# Relatório de tempos

**Data:** 24 de março · **Nível:** Avançado

## Objetivo

Calcule médias de duração por disciplina a partir de registros.

## Como funciona

Leia registros de aula para três disciplinas identificadas por códigos. A média de cada disciplina é a soma de suas durações dividida pela quantidade de registros dela.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Registros: disciplina 1, 40 min; disciplina 1, 60 min; disciplina 2, 45 min
Médias: disciplina 1 = 50; disciplina 2 = 45; disciplina 3 sem registros
```

Não divida por zero quando uma disciplina não tiver aulas cadastradas.

## Dicas para resolução

1. Use o código da disciplina como índice.
2. Guarde soma e contagem separadas.
3. Calcule apenas quando a contagem for positiva.

## Solução

```visualg
algoritmo "Desafio0324A"
var
total: vetor[1..3] de real
  contagem: vetor[1..3] de inteiro
  disciplina, registros, i, j: inteiro
  duracao: real
inicio
para j de 1 ate 3 faca
    total[j] <- 0
    contagem[j] <- 0
  fimpara
  escreva("Número de registros: ")
  leia(registros)
  para i de 1 ate registros faca
    escreva("Disciplina (1 a 3): ")
    leia(disciplina)
    escreva("Duração da aula (min): ")
    leia(duracao)
    se (disciplina >= 1) e (disciplina <= 3) e (duracao >= 0) entao
      total[disciplina] <- total[disciplina] + duracao
      contagem[disciplina] <- contagem[disciplina] + 1
    fimse
  fimpara
  para j de 1 ate 3 faca
    se contagem[j] > 0 entao
      escreval("Disciplina ", j, ": média ", total[j] / contagem[j], " min")
    senao
      escreval("Disciplina ", j, ": sem registros")
    fimse
  fimpara
fimalgoritmo
```

Os vetores guardam soma e contagem por disciplina para calcular três médias independentes.
