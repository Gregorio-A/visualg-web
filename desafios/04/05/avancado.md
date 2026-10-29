# Investigação numérica

**Data:** 5 de abril · **Nível:** Avançado

## Objetivo

Liste todos os divisores de valores suspeitos e agrupe os que compartilham um divisor.

## Como funciona

Leia quatro inteiros positivos. Liste os divisores positivos de cada um e indique pares que compartilham algum divisor maior que 1.

## Exemplo de execução

```text
Números 6 e 9
Divisores de 6: 1,2,3,6
Divisores de 9: 1,3,9
Compartilham divisor 3
```

Todos os inteiros positivos compartilham o divisor 1; aqui esse divisor trivial não conta para o agrupamento.

## Dicas para resolução

1. Teste candidatos de 1 até o próprio número.
2. Para cada par, procure divisor comum a partir de 2.
3. Evite repetir pares em ordem inversa.

## Solução

```visualg
algoritmo "Desafio0405A"
var
valores: vetor[1..4] de inteiro
  i, j, divisor, comum: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Número suspeito ", i, ": ")
    leia(valores[i])
    escreval("Divisores de ", valores[i], ":")
    para divisor de 1 ate valores[i] faca
      se valores[i] mod divisor = 0 entao
        escreval(divisor)
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      comum <- 0
      para divisor de 2 ate valores[i] faca
        se (valores[i] mod divisor = 0) e (valores[j] mod divisor = 0) entao
          comum <- divisor
        fimse
      fimpara
      se comum > 0 entao
        escreval("Números ", i, " e ", j, " compartilham divisor ", comum)
      fimse
    fimpara
  fimpara
fimalgoritmo
```

O resto zero identifica um divisor. O segundo bloco procura um divisor comum não trivial para cada par.
