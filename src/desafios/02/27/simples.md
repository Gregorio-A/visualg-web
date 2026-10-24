# Prêmio da festa

**Data:** 27 de fevereiro · **Nível:** Simples

## Objetivo

Leia quatro notas e informe a maior.

## Como funciona

Leia quatro notas e acompanhe o maior valor encontrado.

## Exemplo de execução

```text
Notas: 5, 9, 7, 8
Maior nota: 9
```

Mesmo se todas as notas forem negativas, a maior é identificada corretamente porque a primeira inicializa a referência.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0227S"
var
nota, maior: real
  i: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Nota ", i, ": ")
    leia(nota)
    se (i = 1) ou (nota > maior) entao
      maior <- nota
    fimse
  fimpara
  escreval("Maior nota: ", maior)
fimalgoritmo
```

Cada nota após a primeira substitui `maior` somente se for superior.
