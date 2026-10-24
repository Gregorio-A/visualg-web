# Festa no orçamento

**Data:** 23 de dezembro · **Nível:** Simples

## Objetivo

Compare o custo da festa com o orçamento disponível.

## Como funciona

Custo igual ao limite cabe no orçamento.

## Exemplo de execução

```text
R$ 120 contra R$ 100 → excede R$ 20
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valores iguais deixam sobra zero.

## Dicas para resolução

1. Leia custo e limite.
2. Compare os dois valores.
3. Mostre sobra ou excesso conforme o caso.

## Solução

```visualg
algoritmo "Desafio1223S"
var
  custo, limite: real
inicio
  escreva("Custo: ")
  leia(custo)
  escreva("Orçamento: ")
  leia(limite)
  se (custo < 0) ou (limite < 0) entao
    escreval("Valor inválido")
  senao
    se custo <= limite entao
      escreval("Dentro do orçamento; sobra R$ ", limite-custo:0:2)
    senao
      escreval("Acima do orçamento em R$ ", custo-limite:0:2)
    fimse
  fimse
fimalgoritmo
```

Compare custo com limite e mostre a diferença.
