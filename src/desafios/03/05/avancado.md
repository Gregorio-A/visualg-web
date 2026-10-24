# Frequência por aluno

**Data:** 5 de março · **Nível:** Avançado

## Objetivo

Registre presenças em matriz aluno × dia e emita alertas por limite.

## Como funciona

Registre presença (1) ou ausência (0) de quatro alunos em cinco dias. Conte faltas por aluno e emita alerta quando atingir o limite informado.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Limite 2; aluno 1: 1, 0, 1, 0, 1
Aluno 1: 2 faltas
Alerta de frequência
```

Igualdade com o limite já gera alerta.

## Dicas para resolução

1. Use linhas para alunos e colunas para dias.
2. Zere o contador antes de cada aluno.
3. Compare o total de faltas com o limite depois de ler os cinco dias.

## Solução

```visualg
algoritmo "Desafio0305A"
var
presenca: vetor[1..4, 1..5] de inteiro
  faltas, limite, aluno, dia: inteiro
inicio
escreva("Limite de faltas para alerta: ")
  leia(limite)
  para aluno de 1 ate 4 faca
    faltas <- 0
    para dia de 1 ate 5 faca
      escreva("Aluno ", aluno, ", dia ", dia, " (1 presente, 0 ausente): ")
      leia(presenca[aluno, dia])
      se presenca[aluno, dia] = 0 entao
        faltas <- faltas + 1
      fimse
    fimpara
    escreval("Aluno ", aluno, ": ", faltas, " falta(s)")
    se faltas >= limite entao
      escreval("Alerta de frequência para aluno ", aluno)
    fimse
  fimpara
fimalgoritmo
```

Cada linha da matriz contém os cinco dias de um aluno; os zeros são contados como faltas.
