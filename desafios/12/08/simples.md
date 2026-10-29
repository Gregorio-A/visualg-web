# Convites enviados

**Data:** 8 de dezembro · **Nível:** Simples

## Objetivo

Calcule quantos faltam distribuir.

## Como funciona

Convites enviados não podem superar o total.

## Exemplo de execução

```text
50 convites, 18 enviados → faltam 32
```

**Como ler o exemplo:** a seta → significa "resulta em".

Com todos enviados, faltam zero.

## Dicas para resolução

1. Leia total e enviados.
2. Verifique se enviados não excede o total.
3. Subtraia para achar os pendentes.

## Solução

```visualg
algoritmo "Desafio1208S"
var
  total, enviados: inteiro
inicio
  escreva("Total de convites: ")
  leia(total)
  escreva("Já enviados: ")
  leia(enviados)
  se (total < 0) ou (enviados < 0) ou (enviados > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Faltam: ", total - enviados)
  fimse
fimalgoritmo
```

Subtraia enviados do total.
