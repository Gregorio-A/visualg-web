# Consumo consciente

**Data:** 20 de setembro · **Nível:** Simples

## Objetivo

Calcule porcentagem de redução de um consumo antigo para um novo.

## Como funciona

Use o consumo antigo como base da porcentagem.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Antigo 100, novo 80 → redução 20%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se o consumo novo aumentar, a redução é negativa.

## Dicas para resolução

1. Subtraia novo de antigo.
2. Divida por antigo.
3. Multiplique por cem.

## Solução

```visualg
algoritmo "Desafio0920S"
var
antigo, novo, reducao: real
inicio
escreva("Consumo antigo: ")
  leia(antigo)
  escreva("Consumo novo: ")
  leia(novo)
  se (antigo <= 0) ou (novo < 0) entao
    escreval("Dados inválidos")
  senao
    reducao <- 100 * (antigo - novo) / antigo
    escreval("Redução percentual: ", reducao, "%")
  fimse
fimalgoritmo
```

A diferença dividida pelo valor inicial mede a variação relativa.
