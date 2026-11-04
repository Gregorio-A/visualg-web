# Pulseiras vendidas

**Data:** 23 de fevereiro · **Nível:** Simples

## Objetivo

Calcule arrecadação a partir de unidades e preço.

## Como funciona

Multiplique o número de unidades vendidas pelo preço de cada uma.

## Exemplo de execução

```text
Pulseiras vendidas: 12
Preço unitário: 5
Arrecadação: 60
```

Sem vendas, a arrecadação é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0223S"
var
unidades: inteiro
  preco, total: real
inicio
escreva("Pulseiras vendidas: ")
  leia(unidades)
  escreva("Preço unitário: ")
  leia(preco)
  se unidades >= 0 entao
    total <- unidades * preco
    escreval("Arrecadação: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse
fimalgoritmo
```

O produto unidades × preço calcula o valor total recebido.
