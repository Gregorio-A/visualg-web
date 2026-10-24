# Trilhas nas férias

**Data:** 24 de julho · **Nível:** Simples

## Objetivo

Calcule distância total de ida e volta.

## Como funciona

Assuma retorno pelo mesmo caminho, com a mesma distância da ida.

## Exemplo de execução

```text
Trilha de 7 km na ida → 14 km no total
```

**Como ler o exemplo:** a seta → significa "resulta em".

Ida de zero km dá total zero.

## Dicas para resolução

1. Leia a ida.
2. Multiplique por 2.
3. Mostre km.

## Solução

```visualg
algoritmo "Desafio0724S"
var
ida: real
inicio
escreva("Distância da ida (km): ")
  leia(ida)
  se ida < 0 entao
    escreval("Distância inválida")
  senao
    escreval("Ida e volta: ", 2 * ida, " km")
  fimse
fimalgoritmo
```

A viagem percorre a distância duas vezes.
