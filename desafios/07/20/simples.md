# Lista de malas

**Data:** 20 de julho · **Nível:** Simples

## Objetivo

Leia três pesos e calcule o total.

## Como funciona

Some os pesos de três malas na mesma unidade.

## Exemplo de execução

```text
2 kg, 3 kg e 4 kg → 9 kg
```

**Como ler o exemplo:** a seta → significa "resulta em".

Mala vazia pode pesar zero nesta simplificação.

## Dicas para resolução

1. Leia três pesos.
2. Some.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0720S"
var
a, b, c: real
inicio
escreva("Peso da mala 1: ")
  leia(a)
  escreva("Peso da mala 2: ")
  leia(b)
  escreva("Peso da mala 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Peso inválido")
  senao
    escreval("Peso total: ", a + b + c)
  fimse
fimalgoritmo
```

O peso total é a soma das três medidas.
