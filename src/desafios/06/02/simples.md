# Barraca do milho

**Data:** 2 de junho · **Nível:** Simples

## Objetivo

Calcule o custo de N espigas a preço fixo.

## Como funciona

Considere um preço igual para todas as espigas.

## Exemplo de execução

```text
4 espigas a R$ 3 → R$ 12
```

**Como ler o exemplo:** a seta → significa "resulta em".

Quantidade zero custa R$ 0.

## Dicas para resolução

1. Leia quantidade e preço.
2. Multiplique.
3. Exiba o total em reais.

## Solução

```visualg
algoritmo "Desafio0602S"
var
espigas: inteiro
  preco: real
inicio
escreva("Espigas: ")
  leia(espigas)
  escreva("Preço unitário: ")
  leia(preco)
  se (espigas < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", espigas * preco)
  fimse
fimalgoritmo
```

O total é a quantidade comprada multiplicada pelo preço de uma unidade.
