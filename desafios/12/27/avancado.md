# Aproveitamento de alimentos

**Data:** 27 de dezembro · **Nível:** Avançado

## Objetivo

Distribua porções de pratos entre recipientes com diferentes capacidades.

## Como funciona

Há três pratos; por higiene, não misture pratos no mesmo pote. Todos os potes têm a mesma capacidade positiva.

## Exemplo de execução

```text
Pratos com 5, 3 e 0 porções; potes de 4 → 2 + 1 + 0 = 3 potes.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Prato sem sobra não usa pote.

## Dicas para resolução

1. Não junte tipos de prato.
2. Calcule potes por prato.
3. Some e informe o espaço que sobrou.

## Solução

```visualg
algoritmo "Desafio1227A"
var
  porcoes: vetor[1..3] de inteiro
  capacidade, usados, i, potes, restante: inteiro
inicio
  escreva("Capacidade de cada pote: ")
  leia(capacidade)
  se capacidade <= 0 entao
    escreval("Capacidade inválida")
  senao
    potes <- 0
    restante <- 0
    para i de 1 ate 3 faca
      escreva("Porções do prato ", i, ": ")
      leia(porcoes[i])
      se porcoes[i] < 0 entao
        porcoes[i] <- 0
      fimse
      usados <- porcoes[i]
      se usados > 0 entao
        potes <- potes+(usados+capacidade-1) div capacidade
        restante <- restante+((usados+capacidade-1) div capacidade)*capacidade-usados
      fimse
      escreval("Prato ", i, ": ", (usados+capacidade-1) div capacidade, " pote(s)")
    fimpara
    escreval("Total de potes: ", potes)
    escreval("Espaço vazio nos potes: ", restante, " porção(ões)")
  fimse
fimalgoritmo
```

Arredonde para cima a divisão de cada prato separadamente e some os recipientes.
