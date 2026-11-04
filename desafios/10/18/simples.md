# Doces no balde

**Data:** 18 de outubro · **Nível:** Simples

## Objetivo

Some doces recebidos em cinco casas.

## Como funciona

Visite cinco casas e some os doces recebidos em cada uma.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Casas dão 1,2,3,4,5 → total 15
```

**Como ler o exemplo:** a seta → significa "resulta em".

Casa sem doce contribui com zero.

## Dicas para resolução

1. Inicie total em zero.
2. Leia cinco valores.
3. Some os não negativos.

## Solução

```visualg
algoritmo "Desafio1018S"
var
doces, casa, total: inteiro
inicio
total <- 0
  para casa de 1 ate 5 faca
    escreva("Doces recebidos na casa ", casa, ": ")
    leia(doces)
    se doces >= 0 entao
      total <- total + doces
    fimse
  fimpara
  escreval("Total de doces: ", total)
fimalgoritmo
```

Um acumulador mantém a soma ao percorrer as casas.
