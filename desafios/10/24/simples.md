# Adivinhação da caveira

**Data:** 24 de outubro · **Nível:** Simples

## Objetivo

Verifique se um número possui três dígitos.

## Como funciona

Considere apenas os algarismos do valor absoluto; o sinal negativo não conta como dígito.

## Exemplo de execução

```text
-321 → possui três dígitos; 99 → não possui
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero tem um dígito. 1000 tem quatro.

## Dicas para resolução

1. Identifique a faixa 100–999.
2. Inclua a faixa negativa equivalente.
3. Use ou para juntar as condições.

## Solução

```visualg
algoritmo "Desafio1024S"
var
numero: inteiro
inicio
escreva("Número da caveira: ")
  leia(numero)
  se ((numero >= 100) e (numero <= 999)) ou ((numero <= -100) e (numero >= -999)) entao
    escreval("Possui três dígitos")
  senao
    escreval("Não possui três dígitos")
  fimse
fimalgoritmo
```

As duas faixas contemplam números positivos e negativos de três algarismos.
