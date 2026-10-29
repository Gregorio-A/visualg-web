# Mesa de jantar

**Data:** 15 de dezembro · **Nível:** Simples

## Objetivo

Calcule quantos lugares faltam para N convidados.

## Como funciona

Cada convidado ocupa um lugar.

## Exemplo de execução

```text
12 convidados, 9 lugares → faltam 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se quantidades iguais, faltam zero.

## Dicas para resolução

1. Leia convidados e lugares.
2. Calcule a diferença.
3. Mostre falta somente quando convidados superarem lugares.

## Solução

```visualg
algoritmo "Desafio1215S"
var
  convidados, lugares: inteiro
inicio
  escreva("Convidados: ")
  leia(convidados)
  escreva("Lugares: ")
  leia(lugares)
  se (convidados < 0) ou (lugares < 0) entao
    escreval("Dados inválidos")
  senao
    se convidados > lugares entao
      escreval("Faltam ", convidados-lugares)
    senao
      escreval("Faltam 0; livres: ", lugares-convidados)
    fimse
  fimse
fimalgoritmo
```

A falta é a diferença positiva entre demanda e capacidade.
