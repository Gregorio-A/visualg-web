# Sensor de luz

**Data:** 6 de novembro · **Nível:** Simples

## Objetivo

Avise quando uma leitura for menor que o limite.

## Como funciona

Avise apenas se a leitura for estritamente menor que o limite.

## Exemplo de execução

```text
Leitura 4, limite 5 → aviso
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade não está abaixo.

## Dicas para resolução

1. Leia valor e limite.
2. Use <.
3. Mostre o resultado.

## Solução

```visualg
algoritmo "Desafio1106S"
var
leitura, limite: real
inicio
escreva("Leitura: ")
  leia(leitura)
  escreva("Limite mínimo: ")
  leia(limite)
  se leitura < limite entao
    escreval("Abaixo do limite")
  senao
    escreval("No limite ou acima")
  fimse
fimalgoritmo
```

A comparação < separa os dois casos.
