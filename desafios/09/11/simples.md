# Lixo recolhido

**Data:** 11 de setembro · **Nível:** Simples

## Objetivo

Some massas de três sacos.

## Como funciona

As três massas são medidas em quilogramas.

## Exemplo de execução

```text
2, 3 e 4 kg → 9 kg
```

**Como ler o exemplo:** a seta → significa "resulta em".

Saco vazio contribui com zero.

## Dicas para resolução

1. Leia três massas.
2. Some.
3. Mostre kg.

## Solução

```visualg
algoritmo "Desafio0911S"
var
a, b, c: real
inicio
escreva("Massas dos três sacos: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Massa inválida")
  senao
    escreval("Massa recolhida: ", a + b + c, " kg")
  fimse
fimalgoritmo
```

A massa total é a soma das três parcelas.
