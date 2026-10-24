# Desconto especial

**Data:** 10 de dezembro · **Nível:** Simples

## Objetivo

Aplique desconto de fim de ano a um produto.

## Como funciona

A taxa de desconto deve ficar entre 0% e 100%.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
R$ 80 com 25% → R$ 60
```

**Como ler o exemplo:** a seta → significa "resulta em".

100% produz preço zero.

## Dicas para resolução

1. Transforme a taxa percentual dividindo por 100.
2. Calcule o valor descontado.
3. Subtraia do preço original.

## Solução

```visualg
algoritmo "Desafio1210S"
var
  preco, taxa: real
inicio
  escreva("Preço: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(taxa)
  se (preco < 0) ou (taxa < 0) ou (taxa > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço final: R$ ", preco * (1 - taxa/100):0:2)
  fimse
fimalgoritmo
```

Transforme porcentagem em fração e desconte do preço.
