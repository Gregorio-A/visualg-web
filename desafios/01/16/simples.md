# Dias de viagem

**Data:** 16 de janeiro · **Nível:** Simples

## Objetivo

Informe quantas noites há entre dois números de dia do mesmo mês.

Calcule quantas noites de hospedagem há entre dois dias do mesmo mês.

## Como funciona

Leia dia de entrada e dia de saída. A diferença é o número de noites quando a saída vem depois.

## Exemplo de execução

```text
Dia de entrada: 10
Dia de saída: 13
Noites: 3
```

Entrada no dia 10 e saída no dia 11 representam uma noite.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0116S"
var
entrada, saida, noites: inteiro
inicio
escreva("Dia de entrada: ")
  leia(entrada)
  escreva("Dia de saída: ")
  leia(saida)
  se (entrada >= 1) e (saida > entrada) e (saida <= 31) entao
    noites <- saida - entrada
    escreval("Noites: ", noites)
  senao
    escreval("Informe dias válidos do mesmo mês, com saída posterior.")
  fimse
fimalgoritmo
```

A subtração exclui naturalmente o dia de saída da contagem de pernoites.
