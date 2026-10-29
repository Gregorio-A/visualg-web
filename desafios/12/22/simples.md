# Mensagens enviadas

**Data:** 22 de dezembro · **Nível:** Simples

## Objetivo

Conte quantas mensagens foram enviadas em N dias, com um valor fixo por dia.

## Como funciona

A quantidade enviada por dia é fixa.

## Exemplo de execução

```text
6 dias com 4 mensagens → 24
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero dia produz zero mensagem.

## Dicas para resolução

1. Defina dias e mensagens por dia.
2. Use a mesma taxa em todos os dias.
3. Multiplique período pela taxa.

## Solução

```visualg
algoritmo "Desafio1222S"
var
  dias, porDia: inteiro
inicio
  escreva("Dias: ")
  leia(dias)
  escreva("Mensagens por dia: ")
  leia(porDia)
  se (dias < 0) ou (porDia < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Total: ", dias*porDia)
  fimse
fimalgoritmo
```

Multiplique duração pela taxa diária.
