# Treinador de tabuada

**Data:** 13 de março · **Nível:** Avançado

## Objetivo

Faça perguntas com dificuldade fixa, corrija e apresente taxa de acertos.

## Como funciona

Faça cinco perguntas de tabuada do dois, com dificuldade fixa. Corrija imediatamente e apresente a taxa final de acertos.

## Exemplo de execução

```text
Respostas 2, 4, 6, 8, 10
Acertos: 5/5 (100%)
```

Com nenhuma resposta certa, a taxa é 0%.

## Dicas para resolução

1. Gere perguntas de dificuldade igual por uma regra simples.
2. Compare cada resposta com o gabarito calculado.
3. Divida acertos pelo total fixo de cinco.

## Solução

```visualg
algoritmo "Desafio0313A"
var
resposta, gabarito: inteiro
  i, acertos: inteiro
  percentual: real
inicio
acertos <- 0
  para i de 1 ate 5 faca
    escreva("Questão ", i, ": quanto é ", i, " x 2? ")
    leia(resposta)
    gabarito <- i * 2
    se resposta = gabarito entao
      acertos <- acertos + 1
      escreval("Correto.")
    senao
      escreval("Resposta correta: ", gabarito)
    fimse
  fimpara
  percentual <- acertos * 100 / 5
  escreval("Acertos: ", acertos, "/5 (", percentual, "%)")
fimalgoritmo
```

O gabarito da pergunta i é `i * 2`; cada acerto soma uma unidade ao contador.
