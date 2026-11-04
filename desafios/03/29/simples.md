# Data da prova

**Data:** 29 de março · **Nível:** Simples

## Objetivo

Apresente dia e mês digitados em formato DD/MM.

## Como funciona

Leia dia e mês numéricos e mostre dois dígitos em cada parte da data.

## Exemplo de execução

```text
Dia: 3
Mês: 9
03/09
```

O exercício valida faixas gerais, mas não verifica quantos dias cada mês realmente possui.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0329S"
var
dia, mes: inteiro
inicio
escreva("Dia: ")
  leia(dia)
  escreva("Mês: ")
  leia(mes)
  se (dia >= 1) e (dia <= 31) e (mes >= 1) e (mes <= 12) entao
    se dia < 10 entao
      escreva("0")
    fimse
    escreva(dia, "/")
    se mes < 10 entao
      escreva("0")
    fimse
    escreval(mes)
  senao
    escreval("Data inválida.")
  fimse
fimalgoritmo
```

`escreva` mantém as partes na mesma linha; o zero é adicionado quando o número tem um só dígito.
