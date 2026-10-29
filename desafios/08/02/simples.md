# Vidas restantes

**Data:** 2 de agosto · **Nível:** Simples

## Objetivo

Subtraia vidas perdidas das iniciais sem permitir resultado negativo.

## Como funciona

Subtraia as vidas perdidas e limite o resultado inferior a zero.

## Exemplo de execução

```text
3 vidas, 5 perdidas → 0 restantes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Perder zero vida mantém o saldo.

## Dicas para resolução

1. Subtraia.
2. Compare com zero.
3. Ajuste se necessário.

## Solução

```visualg
algoritmo "Desafio0802S"
var
iniciais, perdidas, restantes: inteiro
inicio
escreva("Vidas iniciais: ")
  leia(iniciais)
  escreva("Vidas perdidas: ")
  leia(perdidas)
  se (iniciais < 0) ou (perdidas < 0) entao
    escreval("Dados inválidos")
  senao
    restantes <- iniciais - perdidas
    se restantes < 0 entao
      restantes <- 0
    fimse
    escreval("Vidas restantes: ", restantes)
  fimse
fimalgoritmo
```

O limite inferior evita uma quantidade impossível de vidas.
