# Três portas

**Data:** 17 de outubro · **Nível:** Simples

## Objetivo

Escolha um prêmio textual conforme a porta 1, 2 ou 3.

## Como funciona

Cada uma das três portas revela um prêmio textual distinto.

## Exemplo de execução

```text
Porta 2 → mapa secreto
```

**Como ler o exemplo:** a seta → significa "resulta em".

Porta fora de 1–3 não revela prêmio.

## Dicas para resolução

1. Leia número.
2. Defina três casos.
3. Trate número desconhecido.

## Solução

```visualg
algoritmo "Desafio1017S"
var
porta: inteiro
inicio
escreva("Escolha a porta (1, 2 ou 3): ")
  leia(porta)
  escolha porta
    caso 1
      escreval("Prêmio: chave dourada")
    caso 2
      escreval("Prêmio: mapa secreto")
    caso 3
      escreval("Prêmio: doce mágico")
    outrocaso
      escreval("Porta inexistente")
  fimescolha
fimalgoritmo
```

A estrutura escolha seleciona a saída pelo número da porta.
