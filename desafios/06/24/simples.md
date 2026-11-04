# Pratinhos de comida

**Data:** 24 de junho · **Nível:** Simples

## Objetivo

Calcule N pessoas vezes pratos por pessoa.

## Como funciona

Multiplique o público pelo número de pratos planejados por pessoa.

## Exemplo de execução

```text
15 pessoas, 2 pratos cada → 30 pratos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pessoas exige zero pratos.

## Dicas para resolução

1. Leia pessoas.
2. Leia pratos por pessoa.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0624S"
var
pessoas, pratosPorPessoa: inteiro
inicio
escreva("Pessoas: ")
  leia(pessoas)
  escreva("Pratos por pessoa: ")
  leia(pratosPorPessoa)
  se (pessoas < 0) ou (pratosPorPessoa < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Pratos necessários: ", pessoas * pratosPorPessoa)
  fimse
fimalgoritmo
```

O consumo individual igual permite obter o total diretamente.
