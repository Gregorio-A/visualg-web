# Aula mais longa

**Data:** 24 de março · **Nível:** Simples

## Objetivo

Compare a duração de duas aulas.

## Como funciona

Leia as durações de duas aulas em minutos e informe qual é maior ou se há empate.

## Exemplo de execução

```text
Aula A: 50; aula B: 45
A aula A é mais longa.
```

Durações iguais devem produzir mensagem de empate.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0324S"
var
aulaA, aulaB: inteiro
inicio
escreva("Duração da aula A (min): ")
  leia(aulaA)
  escreva("Duração da aula B (min): ")
  leia(aulaB)
  se aulaA > aulaB entao
    escreval("A aula A é mais longa.")
  senao
    se aulaB > aulaA entao
      escreval("A aula B é mais longa.")
    senao
      escreval("As aulas têm a mesma duração.")
    fimse
  fimse
fimalgoritmo
```

As duas comparações estritas deixam a igualdade para o último ramo.
