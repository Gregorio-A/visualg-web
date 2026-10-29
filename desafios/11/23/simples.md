# Tempo de inicialização

**Data:** 23 de novembro · **Nível:** Simples

## Objetivo

Some durações de três etapas em segundos.

## Como funciona

Some os tempos de três etapas na mesma unidade.

## Exemplo de execução

```text
10, 20 e 30 s → 60 s
```

**Como ler o exemplo:** a seta → significa "resulta em".

Etapa de zero segundo é válida.

## Dicas para resolução

1. Leia três tempos.
2. Some.
3. Mostre segundos.

## Solução

```visualg
algoritmo "Desafio1123S"
var
a, b, c: inteiro
inicio
escreva("Durações das três etapas em segundos: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Duração inválida")
  senao
    escreval("Duração total: ", a + b + c, " s")
  fimse
fimalgoritmo
```

A duração total é a soma das parcelas.
