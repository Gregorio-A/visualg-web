# Pescaria simples

**Data:** 4 de junho · **Nível:** Simples

## Objetivo

Informe um prêmio conforme um número entre 1 e 3.

## Como funciona

Associe 1 a adesivo, 2 a lápis e 3 a brinquedo.

## Exemplo de execução

```text
Número 2 → lápis
```

**Como ler o exemplo:** a seta → significa "resulta em".

Número fora de 1 a 3 não dá prêmio.

## Dicas para resolução

1. Leia o número.
2. Use escolha.
3. Trate o outro caso.

## Solução

```visualg
algoritmo "Desafio0604S"
var
numero: inteiro
inicio
escreva("Número pescado (1 a 3): ")
  leia(numero)
  escolha numero
    caso 1
      escreval("Prêmio: adesivo")
    caso 2
      escreval("Prêmio: lápis")
    caso 3
      escreval("Prêmio: brinquedo")
    outrocaso
      escreval("Número inválido")
  fimescolha
fimalgoritmo
```

A seleção escolhe uma única mensagem para o número informado.
