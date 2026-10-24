# Distribuição de fantasias

**Data:** 17 de fevereiro · **Nível:** Avançado

## Objetivo

Relacione tamanhos solicitados ao estoque e gere faltas por tamanho.

## Como funciona

Use códigos 1 P, 2 M e 3 G. Leia o estoque e os pedidos de cada tamanho; calcule a falta sem permitir saldo negativo.

## Exemplo de execução

```text
Estoque P/M/G: 2/4/1; pedidos: 3/2/1
Faltas: P 1, M 0, G 0
Saldos: P 0, M 2, G 0
```

Pedido igual ao estoque zera o saldo e não cria falta.

## Dicas para resolução

1. Armazene estoques por tamanho.
2. Compare demanda e disponibilidade em cada posição.
3. Calcule a falta antes de zerar um estoque insuficiente.

## Solução

```visualg
algoritmo "Desafio0217A"
var
estoque: vetor[1..3] de inteiro
  pedido, falta, i: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Estoque do tamanho ", i, " (1 P, 2 M, 3 G): ")
    leia(estoque[i])
  fimpara
  para i de 1 ate 3 faca
    escreva("Pedidos do tamanho ", i, ": ")
    leia(pedido)
    se pedido < 0 entao
      escreval("Pedido inválido.")
      falta <- 0
    senao
      se pedido > estoque[i] entao
      falta <- pedido - estoque[i]
      estoque[i] <- 0
      senao
        falta <- 0
        estoque[i] <- estoque[i] - pedido
      fimse
    fimse
    escreval("Tamanho ", i, ": falta ", falta, ", saldo ", estoque[i])
  fimpara
fimalgoritmo
```

A falta é o excesso de pedidos sobre o estoque; quando há excesso, o saldo disponível passa a zero.
