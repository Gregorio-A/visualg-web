# Bebidas geladas

**Data:** 9 de dezembro · **Nível:** Simples

## Objetivo

Converta litros disponíveis em copos de 200 ml.

## Como funciona

Converta litros em mililitros e conte somente copos completos de 200 ml.

## Exemplo de execução

```text
1,1 L → 5 copos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sobra inferior a 200 ml não enche outro copo.

## Dicas para resolução

1. Converta litros para mililitros.
2. Divida por 200 ml.
3. Conte só copos completos.

## Solução

```visualg
algoritmo "Desafio1209S"
var
  litros: real
  copos: inteiro
inicio
  escreva("Litros disponíveis: ")
  leia(litros)
  se litros < 0 entao
    escreval("Volume inválido")
  senao
    copos <- int(litros * 1000 / 200)
    escreval("Copos completos: ", copos)
  fimse
fimalgoritmo
```

Multiplique por mil, divida por duzentos e descarte a fração.
