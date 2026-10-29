# Desafio das moedas

**Data:** 16 de abril · **Nível:** Simples

## Objetivo

Calcule quantas moedas de R$ 1 formam um valor inteiro.

## Como funciona

Leia um valor inteiro não negativo em reais. Cada moeda de R$ 1 cobre exatamente uma unidade.

## Exemplo de execução

```text
Valor: 7
Moedas de R$ 1 necessárias: 7
```

Valor zero exige zero moeda.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0416S"
var
valor: inteiro
inicio
escreva("Valor inteiro em reais: ")
  leia(valor)
  se valor >= 0 entao
    escreval("Moedas de R$ 1 necessárias: ", valor)
  senao
    escreval("Valor inválido")
  fimse
fimalgoritmo
```

A quantidade de moedas é numericamente igual ao valor inteiro.
