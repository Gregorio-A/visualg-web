# Rateio do evento

**Data:** 16 de fevereiro · **Nível:** Avançado

## Objetivo

Distribua custos conforme consumo individual e despesas comuns.

## Como funciona

Cada uma de quatro pessoas paga o próprio consumo mais um quarto das despesas comuns.

## Exemplo de execução

```text
Ana consome 10; Bia 20; Caio 0; Davi 0; despesa comum 40
Pagamentos: 20, 30, 10, 10
Total do evento: 70
```

Uma pessoa com consumo zero ainda paga sua parte da despesa comum.

## Dicas para resolução

1. Some os consumos para conferir o total.
2. Divida a despesa comum por quatro.
3. Adicione a cota ao consumo de cada pessoa.

## Solução

```visualg
algoritmo "Desafio0216A"
var
nome: vetor[1..4] de caractere
  consumo: vetor[1..4] de real
  comum, somaConsumo, individual, cota: real
  i: inteiro
inicio
somaConsumo <- 0
  para i de 1 ate 4 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    escreva("Consumo individual: ")
    leia(consumo[i])
    somaConsumo <- somaConsumo + consumo[i]
  fimpara
  escreva("Despesa comum: ")
  leia(comum)
  cota <- comum / 4
  para i de 1 ate 4 faca
    individual <- consumo[i] + cota
    escreval(nome[i], " paga ", individual)
  fimpara
  escreval("Total do evento: ", somaConsumo + comum)
fimalgoritmo
```

A cota comum é igual para todos, enquanto o consumo individual permanece diferente.
