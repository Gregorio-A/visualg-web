# Fila de entrega

**Data:** 17 de março · **Nível:** Simples

## Objetivo

Numere os alunos de 1 até N.

## Como funciona

Leia N e imprima uma numeração de alunos de 1 até N.

## Exemplo de execução

```text
Número de alunos: 3
Aluno 1
Aluno 2
Aluno 3
```

Com zero alunos, nenhuma linha numerada é impressa.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0317S"
var
quantidade, aluno: inteiro
inicio
escreva("Número de alunos: ")
  leia(quantidade)
  para aluno de 1 ate quantidade faca
    escreval("Aluno ", aluno)
  fimpara
fimalgoritmo
```

A variável de controle fornece automaticamente o próximo número.
