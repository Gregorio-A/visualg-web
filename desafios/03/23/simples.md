# Contador de faltas

**Data:** 23 de março · **Nível:** Simples

## Objetivo

Some faltas de três meses.

## Como funciona

Leia três contagens mensais não negativas e apresente a soma.

## Exemplo de execução

```text
Faltas: 2, 1, 3
Total de faltas: 6
```

Três meses sem faltas produzem total zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0323S"
var
primeiro, segundo, terceiro, total: inteiro
inicio
escreva("Faltas do mês 1: ")
  leia(primeiro)
  escreva("Faltas do mês 2: ")
  leia(segundo)
  escreva("Faltas do mês 3: ")
  leia(terceiro)
  se (primeiro >= 0) e (segundo >= 0) e (terceiro >= 0) entao
    total <- primeiro + segundo + terceiro
    escreval("Total de faltas: ", total)
  senao
    escreval("Contagem inválida.")
  fimse
fimalgoritmo
```

A soma reúne as três contagens sem aplicar média.
