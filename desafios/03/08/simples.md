# Tempo de recreio

**Data:** 8 de março · **Nível:** Simples

## Objetivo

Calcule o fim de um intervalo a partir do início em minutos.

## Como funciona

Leia início e duração em minutos desde uma mesma referência e some os valores.

## Exemplo de execução

```text
Início: 600
Duração: 20
Fim: 620
```

Duração zero produz fim igual ao início.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0308S"
var
inicioMin, duracao, fimMin: inteiro
inicio
escreva("Início (minutos): ")
  leia(inicioMin)
  escreva("Duração do recreio (minutos): ")
  leia(duracao)
  se (inicioMin >= 0) e (duracao >= 0) entao
    fimMin <- inicioMin + duracao
    escreval("Fim (minutos): ", fimMin)
  senao
    escreval("Horário inválido.")
  fimse
fimalgoritmo
```

A adição resulta no horário final na mesma escala de minutos.
