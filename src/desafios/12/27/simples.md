# Potes de sobras

**Data:** 27 de dezembro · **Nível:** Simples

## Objetivo

Calcule recipientes necessários para guardar N porções.

## Como funciona

Cada pote guarda a mesma quantidade positiva de porções inteiras.

## Exemplo de execução

```text
10 porções, 4 por pote → 3 potes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem porções, nenhum pote é necessário.

## Dicas para resolução

1. Exija capacidade positiva.
2. Divida porções pela capacidade.
3. Arredonde para cima quando houver resto.

## Solução

```visualg
algoritmo "Desafio1227S"
var
  porcoes, capacidade, potes: inteiro
inicio
  escreva("Porções: ")
  leia(porcoes)
  escreva("Capacidade do pote: ")
  leia(capacidade)
  se (porcoes < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    potes <- (porcoes+capacidade-1) div capacidade
    escreval("Potes necessários: ", potes)
  fimse
fimalgoritmo
```

Arredonde a divisão por capacidade para cima.
