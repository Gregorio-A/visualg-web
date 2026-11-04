# Laboratório de bruxas

**Data:** 19 de outubro · **Nível:** Avançado

## Objetivo

Identifique combinações válidas de ingredientes a partir de regras.

## Como funciona

Misture dois ingredientes entre erva, cristal e flor. Erva+cristal dá força, erva+flor cura, cristal+flor visão; ordem não importa.

## Exemplo de execução

```text
Cristal + erva → poção de força
```

**Como ler o exemplo:** a seta → significa "resulta em".

Ingredientes iguais ou códigos inválidos não formam receita.

## Dicas para resolução

1. Liste os três pares válidos.
2. Considere as duas ordens.
3. Associe o efeito.

## Solução

```visualg
algoritmo "Desafio1019A"
var
ingrediente1, ingrediente2, efeito: inteiro
inicio
escreva("Primeiro ingrediente (1 erva, 2 cristal, 3 flor): ")
  leia(ingrediente1)
  escreva("Segundo ingrediente (1 erva, 2 cristal, 3 flor): ")
  leia(ingrediente2)
  efeito <- 0
  se ((ingrediente1 = 1) e (ingrediente2 = 2)) ou ((ingrediente1 = 2) e (ingrediente2 = 1)) entao
    efeito <- 1
  fimse
  se ((ingrediente1 = 1) e (ingrediente2 = 3)) ou ((ingrediente1 = 3) e (ingrediente2 = 1)) entao
    efeito <- 2
  fimse
  se ((ingrediente1 = 2) e (ingrediente2 = 3)) ou ((ingrediente1 = 3) e (ingrediente2 = 2)) entao
    efeito <- 3
  fimse
  escolha efeito
    caso 1
      escreval("Poção de força")
    caso 2
      escreval("Poção de cura")
    caso 3
      escreval("Poção de visão")
    outrocaso
      escreval("Combinação sem receita")
  fimescolha
fimalgoritmo
```

Condições simétricas reconhecem cada par em qualquer ordem.
