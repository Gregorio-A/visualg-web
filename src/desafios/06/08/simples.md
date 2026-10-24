# Chapéu de palha

**Data:** 8 de junho · **Nível:** Simples

## Objetivo

Aplique desconto a um acessório.

## Como funciona

Aplique um desconto percentual sobre o preço original.

## Exemplo de execução

```text
R$ 20 com 10% → R$ 18
```

**Como ler o exemplo:** a seta → significa "resulta em".

Desconto de 100% torna o item gratuito.

## Dicas para resolução

1. Divida o percentual por 100.
2. Subtraia a fração de 1.
3. Multiplique pelo preço.

## Solução

```visualg
algoritmo "Desafio0608S"
var
preco, desconto: real
inicio
escreva("Preço do chapéu: ")
  leia(preco)
  escreva("Desconto em %: ")
  leia(desconto)
  se (preco < 0) ou (desconto < 0) ou (desconto > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço final: R$ ", preco * (1 - desconto / 100))
  fimse
fimalgoritmo
```

A fração restante do preço é um menos a taxa de desconto.
