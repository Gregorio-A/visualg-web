# Café da manhã

**Data:** 28 de julho · **Nível:** Simples

## Objetivo

Calcule custo de N pães iguais.

## Como funciona

Todos os pães têm o mesmo preço unitário.

## Exemplo de execução

```text
8 pães a R$ 1,50 → R$ 12
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pão custa zero.

## Dicas para resolução

1. Leia quantidade.
2. Leia preço.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0728S"
var
paes: inteiro
  preco: real
inicio
escreva("Número de pães: ")
  leia(paes)
  escreva("Preço por pão: ")
  leia(preco)
  se (paes < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", paes * preco)
  fimse
fimalgoritmo
```

Multiplicação produz o custo total.
