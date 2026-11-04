# Painel de avaliações

**Data:** 3 de março · **Nível:** Avançado

## Objetivo

Registre notas de cinco alunos em três provas e gere médias e ranking.

## Como funciona

Registre cinco alunos e três notas por aluno. Calcule a média aritmética de cada um e atribua posições por média decrescente, com empate na mesma posição.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Ana: notas 6, 6, 6 → média 6; Bia: 9, 9, 9 → média 9
Bia fica antes de Ana no ranking
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se todos tiverem a mesma média, todos aparecem em primeiro lugar.

## Dicas para resolução

1. Use matriz aluno × prova.
2. Calcule a média de cada linha.
3. Conte quantas médias são estritamente maiores para obter a posição.

## Solução

```visualg
algoritmo "Desafio0303A"
var
aluno: vetor[1..5] de caractere
  notas: vetor[1..5, 1..3] de real
  media: vetor[1..5] de real
  i, prova, j, posicao: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Aluno ", i, ": ")
    leia(aluno[i])
    media[i] <- 0
    para prova de 1 ate 3 faca
      escreva("Nota da prova ", prova, ": ")
      leia(notas[i, prova])
      media[i] <- media[i] + notas[i, prova]
    fimpara
    media[i] <- media[i] / 3
  fimpara
  para i de 1 ate 5 faca
    posicao <- 1
    para j de 1 ate 5 faca
      se media[j] > media[i] entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(aluno[i], ": média ", media[i], ", posição ", posicao)
  fimpara
fimalgoritmo
```

A linha da matriz representa um aluno; a posição é um mais o número de médias superiores.
