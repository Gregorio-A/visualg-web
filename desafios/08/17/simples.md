# Inventário simples

**Data:** 17 de agosto · **Nível:** Simples

## Objetivo

Calcule itens após adquirir mais unidades.

## Como funciona

Acrescente as unidades adquiridas ao inventário atual.

## Exemplo de execução

```text
5 itens, adquire 3 → 8 itens
```

**Como ler o exemplo:** a seta → significa "resulta em".

Adquirir zero não muda o inventário.

## Dicas para resolução

1. Leia saldo.
2. Leia aquisição.
3. Some.

## Solução

```visualg
algoritmo "Desafio0817S"
var
atual, adquiridos: inteiro
inicio
escreva("Itens no inventário: ")
  leia(atual)
  escreva("Novos itens: ")
  leia(adquiridos)
  se (atual < 0) ou (adquiridos < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Itens agora: ", atual + adquiridos)
  fimse
fimalgoritmo
```

A soma atualiza a contagem total.
