# Presentes por pessoa

**Data:** 21 de dezembro · **Nível:** Simples

## Objetivo

Calcule total de presentes para N pessoas recebendo dois cada.

## Como funciona

Cada pessoa recebe dois presentes.

## Exemplo de execução

```text
7 pessoas → 14 presentes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero pessoas exigem zero presentes.

## Dicas para resolução

1. Cada pessoa recebe exatamente dois.
2. Leia a quantidade de pessoas.
3. Multiplique por dois.

## Solução

```visualg
algoritmo "Desafio1221S"
var
  pessoas: inteiro
inicio
  escreva("Pessoas: ")
  leia(pessoas)
  se pessoas < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Presentes: ", 2*pessoas)
  fimse
fimalgoritmo
```

Multiplique por dois.
