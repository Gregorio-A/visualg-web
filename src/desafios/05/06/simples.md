# Prateleira organizada

**Data:** 6 de maio · **Nível:** Simples

## Objetivo

Informe quantos itens faltam para completar uma meta de estoque.

## Como funciona

Subtraia estoque atual da meta. Quando o estoque já alcançou ou ultrapassou a meta, a falta é zero.

## Exemplo de execução

```text
Estoque atual: 8
Meta de estoque: 12
Itens faltantes: 4
```

Estoque 15 para meta 12 não gera “-3 itens”; a falta é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0506S"
var
estoque, meta, faltam: inteiro
inicio
escreva("Estoque atual: ")
  leia(estoque)
  escreva("Meta de estoque: ")
  leia(meta)
  faltam <- meta - estoque
  se faltam < 0 entao
    faltam <- 0
  fimse
  escreval("Itens faltantes: ", faltam)
fimalgoritmo
```

A comparação corrige o resultado negativo da subtração quando a meta já foi atingida.
