# Lista de chamada

**Data:** 27 de março · **Nível:** Simples

## Objetivo

Repita uma saudação para N alunos.

## Como funciona

Leia N e mostre uma saudação numerada para cada aluno de 1 a N.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Alunos a saudar: 2
Olá, aluno 1!
Olá, aluno 2!
```

Com N zero, nenhuma saudação aparece.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0327S"
var
quantidade, i: inteiro
inicio
escreva("Alunos a saudar: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    escreval("Olá, aluno ", i, "!")
  fimpara
fimalgoritmo
```

A variável do laço indica para qual aluno cada mensagem foi emitida.
