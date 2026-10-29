# Cachorro-quente

**Data:** 6 de junho · **Nível:** Simples

## Objetivo

Some preços de lanche e bebida.

## Como funciona

Some o preço de um lanche e de uma bebida.

## Exemplo de execução

```text
R$ 8 e R$ 3 → R$ 11
```

**Como ler o exemplo:** a seta → significa "resulta em".

Preço zero é permitido.

## Dicas para resolução

1. Leia dois preços.
2. Some.
3. Recuse preços negativos.

## Solução

```visualg
algoritmo "Desafio0606S"
var
lanche, bebida: real
inicio
escreva("Preço do lanche: ")
  leia(lanche)
  escreva("Preço da bebida: ")
  leia(bebida)
  se (lanche < 0) ou (bebida < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Total: R$ ", lanche + bebida)
  fimse
fimalgoritmo
```

As duas parcelas compõem o valor total do pedido.
