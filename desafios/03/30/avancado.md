# Painel de desempenho

**Data:** 30 de março · **Nível:** Avançado

## Objetivo

Registre exercícios por aluno e semana e calcule evolução percentual.

## Como funciona

Leia exercícios feitos por três alunos em quatro semanas. Compare a quarta semana com a primeira usando variação percentual.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Aluno: semanas 5, 6, 7, 10
Evolução da primeira à quarta: 100%
```

Se a primeira semana tiver zero exercícios, a variação percentual é indefinida; evite divisão por zero.

## Dicas para resolução

1. Guarde semanas em colunas de uma matriz.
2. Use a primeira como base.
3. Trate base zero separadamente.

## Solução

```visualg
algoritmo "Desafio0330A"
var
exercicios: vetor[1..3, 1..4] de inteiro
  aluno, semana: inteiro
  evolucao: real
inicio
para aluno de 1 ate 3 faca
    para semana de 1 ate 4 faca
      escreva("Aluno ", aluno, ", semana ", semana, ": ")
      leia(exercicios[aluno, semana])
    fimpara
    se exercicios[aluno, 1] > 0 entao
      evolucao <- (exercicios[aluno, 4] - exercicios[aluno, 1]) * 100 / exercicios[aluno, 1]
      escreval("Aluno ", aluno, ": evolução ", evolucao, "%")
    senao
      escreval("Aluno ", aluno, ": evolução percentual indefinida (primeira semana zero)")
    fimse
  fimpara
fimalgoritmo
```

A fórmula `(final - inicial) / inicial × 100` mede o crescimento relativo ao ponto de partida.
