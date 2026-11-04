# Despedida do arraial

**Data:** 30 de junho · **Nível:** Simples

## Objetivo

Calcule arrecadação de duas barracas.

## Como funciona

Some as arrecadações de duas barracas.

## Exemplo de execução

```text
R$ 120 e R$ 80 → R$ 200
```

**Como ler o exemplo:** a seta → significa "resulta em".

Barraca sem vendas contribui com zero.

## Dicas para resolução

1. Leia as receitas.
2. Some.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0630S"
var
primeira, segunda: real
inicio
escreva("Arrecadação da primeira barraca: ")
  leia(primeira)
  escreva("Arrecadação da segunda barraca: ")
  leia(segunda)
  se (primeira < 0) ou (segunda < 0) entao
    escreval("Arrecadação inválida")
  senao
    escreval("Arrecadação conjunta: R$ ", primeira + segunda)
  fimse
fimalgoritmo
```

O resultado é a soma das duas receitas informadas.
