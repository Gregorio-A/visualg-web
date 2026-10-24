# Dia de cinema

**Data:** 17 de julho · **Nível:** Simples

## Objetivo

Calcule total de pipocas e entradas.

## Como funciona

Cada pessoa compra um ingresso e uma pipoca de preços iguais para todos.

## Exemplo de execução

```text
2 pessoas; ingresso R$ 10 e pipoca R$ 5 → R$ 30
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pessoas não gera custo.

## Dicas para resolução

1. Some ingresso e pipoca.
2. Multiplique pelo público.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0717S"
var
pessoas: inteiro
  ingresso, pipoca: real
inicio
escreva("Pessoas: ")
  leia(pessoas)
  escreva("Preço do ingresso: ")
  leia(ingresso)
  escreva("Preço da pipoca: ")
  leia(pipoca)
  se (pessoas < 0) ou (ingresso < 0) ou (pipoca < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Total: R$ ", pessoas * (ingresso + pipoca))
  fimse
fimalgoritmo
```

O custo por pessoa é a soma das duas compras e se repete para o grupo.
