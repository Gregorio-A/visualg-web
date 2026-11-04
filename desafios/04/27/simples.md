# Labirinto de texto

**Data:** 27 de abril · **Nível:** Simples

## Objetivo

Imprima N caracteres de parede em uma linha.

## Como funciona

Leia N e desenhe uma única linha com N sinais #.

## Exemplo de execução

```text
Comprimento: 4
####
```

Para N zero, a linha é vazia.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0427S"
var
tamanho, i: inteiro
inicio
escreva("Comprimento da parede: ")
  leia(tamanho)
  para i de 1 ate tamanho faca
    escreva("#")
  fimpara
  escreval("")
fimalgoritmo
```

`escreva` mantém todos os caracteres na mesma linha; `escreval` a encerra.
