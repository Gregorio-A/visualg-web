# Conversor de unidades

**Data:** 24 de novembro · **Nível:** Simples

## Objetivo

Transforme kilobytes em bytes usando fator 1024.

## Como funciona

Use o fator binário 1 KB = 1024 bytes.

## Exemplo de execução

```text
2 KB → 2048 bytes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero KB é zero byte.

## Dicas para resolução

1. Leia KB.
2. Multiplique por 1024.
3. Mostre bytes.

## Solução

```visualg
algoritmo "Desafio1124S"
var
kilobytes: real
inicio
escreva("Tamanho em kilobytes: ")
  leia(kilobytes)
  se kilobytes < 0 entao
    escreval("Tamanho inválido")
  senao
    escreval("Bytes: ", kilobytes * 1024)
  fimse
fimalgoritmo
```

A conversão multiplica o valor por 1024.
