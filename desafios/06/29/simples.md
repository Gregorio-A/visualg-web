# Última dança

**Data:** 29 de junho · **Nível:** Simples

## Objetivo

Leia um número de pares e calcule o total de dançarinos.

## Como funciona

Cada par é formado por duas pessoas.

## Exemplo de execução

```text
7 pares → 14 dançarinos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pares produz zero dançarinos.

## Dicas para resolução

1. Leia os pares.
2. Multiplique por 2.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0629S"
var
pares: inteiro
inicio
escreva("Número de pares: ")
  leia(pares)
  se pares < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Dançarinos: ", pares * 2)
  fimse
fimalgoritmo
```

Multiplicar por dois converte pares em pessoas.
