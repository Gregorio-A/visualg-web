# Peso da colheita

**Data:** 17 de setembro · **Nível:** Simples

## Objetivo

Calcule o valor obtido vendendo N quilogramas.

## Como funciona

Use preço unitário por quilograma constante.

## Exemplo de execução

```text
8 kg a R$ 5/kg → R$ 40
```

**Como ler o exemplo:** a seta → significa "resulta em".

Venda de zero kg gera zero receita.

## Dicas para resolução

1. Leia kg.
2. Leia R$/kg.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0917S"
var
quilos, precoQuilo: real
inicio
escreva("Quilos vendidos: ")
  leia(quilos)
  escreva("Preço por quilo: ")
  leia(precoQuilo)
  se (quilos < 0) ou (precoQuilo < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Receita: R$ ", quilos * precoQuilo)
  fimse
fimalgoritmo
```

A receita é massa vendida multiplicada pela taxa de preço.
