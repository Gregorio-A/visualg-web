# Biscoitos preparados

**Data:** 7 de dezembro · **Nível:** Simples

## Objetivo

Calcule quantas unidades resultam de N fornadas.

## Como funciona

Cada fornada tem o mesmo rendimento.

## Exemplo de execução

```text
3 fornadas de 12 → 36 biscoitos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem fornadas, nenhum biscoito foi feito.

## Dicas para resolução

1. Leia o número de fornadas.
2. Leia o rendimento de uma fornada.
3. Multiplique para obter o total.

## Solução

```visualg
algoritmo "Desafio1207S"
var
  fornadas, unidades: inteiro
inicio
  escreva("Fornadas: ")
  leia(fornadas)
  escreva("Biscoitos por fornada: ")
  leia(unidades)
  se (fornadas < 0) ou (unidades < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Biscoitos: ", fornadas * unidades)
  fimse
fimalgoritmo
```

Multiplique rendimento por fornadas.
