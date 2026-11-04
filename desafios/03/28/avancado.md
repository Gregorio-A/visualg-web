# Pedido de apostilas

**Data:** 28 de março · **Nível:** Avançado

## Objetivo

Consolide pedidos de turmas e distribua lotes respeitando estoque.

## Como funciona

Leia estoque e pedidos de quatro turmas. Atenda na ordem informada, até acabar o estoque. Para cada turma, mostre unidades entregues e faltantes.

## Exemplo de execução

```text
Estoque 5; pedidos 3, 4, 1, 1
Entregas 3, 2, 0, 0; faltas 0, 2, 1, 1
```

Pedido igual ao saldo disponível é atendido integralmente e deixa estoque zero.

## Dicas para resolução

1. Mantenha o estoque restante.
2. Atenda cada turma em ordem.
3. Calcule falta como pedido menos entrega.

## Solução

```visualg
algoritmo "Desafio0328A"
var
pedido: vetor[1..4] de inteiro
  estoque, entregue, faltante, i: inteiro
inicio
escreva("Apostilas em estoque: ")
  leia(estoque)
  para i de 1 ate 4 faca
    escreva("Pedido da turma ", i, ": ")
    leia(pedido[i])
  fimpara
  para i de 1 ate 4 faca
    entregue <- pedido[i]
    se entregue > estoque entao
      entregue <- estoque
    fimse
    se entregue < 0 entao
      entregue <- 0
    fimse
    estoque <- estoque - entregue
    faltante <- pedido[i] - entregue
    escreval("Turma ", i, ": entregue ", entregue, ", falta ", faltante)
  fimpara
  escreval("Estoque final: ", estoque)
fimalgoritmo
```

A quantidade entregue é o menor valor entre pedido e estoque restante.
