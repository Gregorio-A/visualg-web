# Pontuação do jogador

**Data:** 1 de agosto · **Nível:** Simples

## Objetivo

Some os pontos de três fases.

## Como funciona

Some os pontos obtidos em três fases.

## Exemplo de execução

```text
10, 20 e 30 → 60 pontos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Fase com zero ponto é válida.

## Dicas para resolução

1. Leia três inteiros.
2. Some.
3. Mostre o total.

## Solução

```visualg
algoritmo "Desafio0801S"
var
primeira, segunda, terceira: inteiro
inicio
escreva("Pontos das três fases: ")
  leia(primeira, segunda, terceira)
  se (primeira < 0) ou (segunda < 0) ou (terceira < 0) entao
    escreval("Pontuação inválida")
  senao
    escreval("Pontuação total: ", primeira + segunda + terceira)
  fimse
fimalgoritmo
```

A pontuação final reúne as três parcelas.
