# Roleta de prendas

**Data:** 21 de junho · **Nível:** Simples

## Objetivo

Associe quatro números a quatro desafios.

## Como funciona

Associe os números 1, 2, 3 e 4 a quatro prendas distintas.

## Exemplo de execução

```text
Número 3 → contar uma história
```

**Como ler o exemplo:** a seta → significa "resulta em".

Número fora de 1 a 4 é inválido.

## Dicas para resolução

1. Leia o número.
2. Defina quatro casos.
3. Inclua outrocaso.

## Solução

```visualg
algoritmo "Desafio0621S"
var
numero: inteiro
inicio
escreva("Número da roleta (1 a 4): ")
  leia(numero)
  escolha numero
    caso 1
      escreval("Prenda: cantar")
    caso 2
      escreval("Prenda: dançar")
    caso 3
      escreval("Prenda: contar uma história")
    caso 4
      escreval("Prenda: fazer uma rima")
    outrocaso
      escreval("Número inválido")
  fimescolha
fimalgoritmo
```

A estrutura escolha cobre os quatro resultados e a entrada inesperada.
