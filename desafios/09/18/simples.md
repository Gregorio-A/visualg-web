# Separando resíduos

**Data:** 18 de setembro · **Nível:** Simples

## Objetivo

Verifique se a quantidade reciclada alcança uma meta.

## Como funciona

A meta é alcançada quando a quantidade reciclada é maior ou igual a ela.

## Exemplo de execução

```text
Reciclada 9, meta 10 → falta 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade alcança a meta.

## Dicas para resolução

1. Compare >=.
2. Subtraia no caso incompleto.
3. Mostre o estado.

## Solução

```visualg
algoritmo "Desafio0918S"
var
reciclada, meta: real
inicio
escreva("Quantidade reciclada: ")
  leia(reciclada)
  escreva("Meta: ")
  leia(meta)
  se (reciclada < 0) ou (meta < 0) entao
    escreval("Dados inválidos")
  senao
    se reciclada >= meta entao
      escreval("Meta alcançada")
    senao
      escreval("Faltam ", meta - reciclada)
    fimse
  fimse
fimalgoritmo
```

A diferença calcula a pendência.
