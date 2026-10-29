# Alerta de disco

**Data:** 27 de novembro · **Nível:** Simples

## Objetivo

Verifique se espaço livre está abaixo do mínimo.

## Como funciona

O espaço fica insuficiente quando está estritamente abaixo do mínimo.

## Exemplo de execução

```text
Livre 4, mínimo 5 → insuficiente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade é suficiente.

## Dicas para resolução

1. Leia valores.
2. Compare <.
3. Mostre o resultado.

## Solução

```visualg
algoritmo "Desafio1127S"
var
livre, minimo: real
inicio
escreva("Espaço livre: ")
  leia(livre)
  escreva("Mínimo necessário: ")
  leia(minimo)
  se (livre < 0) ou (minimo < 0) entao
    escreval("Dados inválidos")
  senao
    se livre < minimo entao
      escreval("Espaço insuficiente")
    senao
      escreval("Espaço suficiente")
    fimse
  fimse
fimalgoritmo
```

A comparação < verifica a falta.
