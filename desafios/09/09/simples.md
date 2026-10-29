# Vento forte

**Data:** 9 de setembro · **Nível:** Simples

## Objetivo

Informe se uma velocidade supera um limite informado.

## Como funciona

Considere vento forte apenas quando a velocidade superar estritamente o limite.

## Exemplo de execução

```text
Vento 30, limite 20 → acima
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade não supera o limite.

## Dicas para resolução

1. Leia velocidade e limite.
2. Use >.
3. Mostre o caso correto.

## Solução

```visualg
algoritmo "Desafio0909S"
var
vento, limite: real
inicio
escreva("Velocidade do vento: ")
  leia(vento)
  escreva("Limite de vento forte: ")
  leia(limite)
  se (vento < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    se vento > limite entao
      escreval("Vento acima do limite")
    senao
      escreval("Vento no limite ou abaixo")
    fimse
  fimse
fimalgoritmo
```

A relação > distingue os dois estados.
