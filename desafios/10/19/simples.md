# Bruxa e caldeirão

**Data:** 19 de outubro · **Nível:** Simples

## Objetivo

Exiba uma mensagem conforme a cor de poção digitada.

## Como funciona

Associe verde à sorte, azul à calma e vermelha à força.

## Exemplo de execução

```text
AZUL → Poção de calma
```

**Como ler o exemplo:** a seta → significa "resulta em".

Outra cor é desconhecida.

## Dicas para resolução

1. Leia texto.
2. Normalize.
3. Use escolha.

## Solução

```visualg
algoritmo "Desafio1019S"
var
cor: caractere
inicio
escreva("Cor da poção (VERDE, AZUL, VERMELHA): ")
  leia(cor)
  escolha maiusc(cor)
    caso "VERDE"
      escreval("Poção de sorte")
    caso "AZUL"
      escreval("Poção de calma")
    caso "VERMELHA"
      escreval("Poção de força")
    outrocaso
      escreval("Cor desconhecida")
  fimescolha
fimalgoritmo
```

A cor em maiúsculas permite aceitar letras minúsculas na entrada.
