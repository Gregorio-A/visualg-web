# Caça aos fantasmas

**Data:** 5 de outubro · **Nível:** Simples

## Objetivo

Diga se uma pontuação alcança o recorde informado.

## Como funciona

Alcançar ou superar o recorde conta como sucesso.

## Exemplo de execução

```text
Pontos 20, recorde 20 → alcançado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade é suficiente.

## Dicas para resolução

1. Leia dois números.
2. Use >=.
3. Calcule a falta quando necessário.

## Solução

```visualg
algoritmo "Desafio1005S"
var
pontos, recorde: inteiro
inicio
escreva("Pontuação atual: ")
  leia(pontos)
  escreva("Recorde informado: ")
  leia(recorde)
  se (pontos < 0) ou (recorde < 0) entao
    escreval("Dados inválidos")
  senao
    se pontos >= recorde entao
      escreval("Recorde alcançado")
    senao
      escreval("Faltam ", recorde - pontos, " pontos")
    fimse
  fimse
fimalgoritmo
```

A comparação >= inclui o limite do recorde.
