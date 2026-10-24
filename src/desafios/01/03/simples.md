# Dividindo o sorvete

**Data:** 3 de janeiro · **Nível:** Simples

## Objetivo

Calcule quanto cada pessoa paga por uma compra dividida igualmente.

Calcule a parcela individual de uma compra compartilhada igualmente.

## Como funciona

Leia o valor total e a quantidade de participantes. Divida somente se a quantidade for maior que zero.

## Exemplo de execução

```text
Valor total: 60
Número de pessoas: 3
Cada pessoa paga: 20
```

Com zero participantes, apresente a mensagem de erro e evite divisão por zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0103S"
var
total, parcela: real
  pessoas: inteiro
inicio
escreva("Valor total: ")
  leia(total)
  escreva("Número de pessoas: ")
  leia(pessoas)
  se pessoas > 0 entao
    parcela <- total / pessoas
    escreval("Cada pessoa paga: ", parcela)
  senao
    escreval("O número de pessoas deve ser positivo.")
  fimse
fimalgoritmo
```

A validação protege a divisão; a parcela é o valor total dividido pelo número de pessoas.
