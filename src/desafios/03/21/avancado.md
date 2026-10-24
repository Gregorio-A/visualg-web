# Analisador de prova

**Data:** 21 de março · **Nível:** Avançado

## Objetivo

Compare gabarito e respostas de vários alunos e mostre acertos por questão.

## Como funciona

Leia gabarito de cinco questões e as respostas de três alunos. Mostre acertos por aluno e, depois, quantos alunos acertaram cada questão.

## Exemplo de execução

```text
Se os três alunos acertarem a questão 1, o relatório mostra “Questão 1: 3 acertos”.
```

Nenhum acerto em uma questão produz contagem zero.

## Dicas para resolução

1. Inicie uma contagem por questão.
2. Zere o total antes de cada aluno.
3. Atualize os dois contadores no mesmo acerto.

## Solução

```visualg
algoritmo "Desafio0321A"
var
gabarito: vetor[1..5] de caractere
  acertosQuestao: vetor[1..5] de inteiro
  resposta: caractere
  aluno, questao, acertos: inteiro
inicio
para questao de 1 ate 5 faca
    escreva("Gabarito da questão ", questao, ": ")
    leia(gabarito[questao])
    acertosQuestao[questao] <- 0
  fimpara
  para aluno de 1 ate 3 faca
    acertos <- 0
    para questao de 1 ate 5 faca
      escreva("Aluno ", aluno, ", questão ", questao, ": ")
      leia(resposta)
      se resposta = gabarito[questao] entao
        acertos <- acertos + 1
        acertosQuestao[questao] <- acertosQuestao[questao] + 1
      fimse
    fimpara
    escreval("Aluno ", aluno, ": ", acertos, "/5")
  fimpara
  para questao de 1 ate 5 faca
    escreval("Questão ", questao, ": ", acertosQuestao[questao], " acerto(s)")
  fimpara
fimalgoritmo
```

A cada resposta correta são atualizados o total do aluno e a contagem daquela questão.
