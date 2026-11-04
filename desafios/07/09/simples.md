# Aquecer o quarto

**Data:** 9 de julho · **Nível:** Simples

## Objetivo

Calcule custo estimado de um aparelho por horas de uso.

## Como funciona

Considere custo por hora constante para o aparelho.

## Exemplo de execução

```text
4 h a R$ 0,50/h → R$ 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero hora não gera custo.

## Dicas para resolução

1. Leia duração.
2. Leia taxa.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0709S"
var
horas, precoHora: real
inicio
escreva("Horas de uso: ")
  leia(horas)
  escreva("Custo estimado por hora (R$): ")
  leia(precoHora)
  se (horas < 0) ou (precoHora < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo estimado: R$ ", horas * precoHora)
  fimse
fimalgoritmo
```

O custo total é taxa horária multiplicada por tempo.
