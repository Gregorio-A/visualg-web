# Abóboras na porta

**Data:** 2 de outubro · **Nível:** Simples

## Objetivo

Calcule custo de N abóboras iguais.

## Como funciona

Todas as abóboras têm o mesmo preço.

## Exemplo de execução

```text
4 abóboras a R$ 5 → R$ 20
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero abóbora custa zero.

## Dicas para resolução

1. Leia quantidade.
2. Leia preço.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio1002S"
var
aboboras: inteiro
  preco: real
inicio
escreva("Abóboras: ")
  leia(aboboras)
  escreva("Preço unitário: ")
  leia(preco)
  se (aboboras < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", aboboras * preco)
  fimse
fimalgoritmo
```

Multiplique quantidade pelo custo unitário.
