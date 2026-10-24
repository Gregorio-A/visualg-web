# Espaço no disco

**Data:** 12 de agosto · **Nível:** Simples

## Objetivo

Converta gigabytes para megabytes usando base binária.

## Como funciona

Use 1 GB = 1024 MB, conforme a convenção binária adotada neste exercício.

## Exemplo de execução

```text
2 GB → 2048 MB
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero GB corresponde a zero MB.

## Dicas para resolução

1. Leia GB.
2. Multiplique por 1024.
3. Mostre MB.

## Solução

```visualg
algoritmo "Desafio0812S"
var
gigabytes: real
inicio
escreva("Espaço em GB: ")
  leia(gigabytes)
  se gigabytes < 0 entao
    escreval("Espaço inválido")
  senao
    escreval("Espaço em MB: ", gigabytes * 1024)
  fimse
fimalgoritmo
```

Multiplicar por 1024 muda a unidade mantendo a quantidade de dados.
