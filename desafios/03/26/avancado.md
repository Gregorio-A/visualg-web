# Caça-padrões

**Data:** 26 de março · **Nível:** Avançado

## Objetivo

Identifique se uma sequência de dez valores segue progressão aritmética ou geométrica.

## Como funciona

Leia dez valores reais. Uma progressão aritmética tem diferença constante; uma geométrica tem razão constante. Uma sequência constante pode satisfazer ambas.

## Exemplo de execução

```text
Valores: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
Progressão aritmética
```

Dez zeros são PA e PG. Se o primeiro valor for zero e houver valor posterior não nulo, não classifique como PG.

## Dicas para resolução

1. Compare diferenças consecutivas para PA.
2. Evite dividir por zero ao investigar PG.
3. Não force uma escolha única se a sequência satisfizer ambas.

## Solução

```visualg
algoritmo "Desafio0326A"
var
valores: vetor[1..10] de real
  diferenca, razao: real
  aritmetica, geometrica: logico
  i: inteiro
inicio
para i de 1 ate 10 faca
    escreva("Valor ", i, ": ")
    leia(valores[i])
  fimpara
  diferenca <- valores[2] - valores[1]
  aritmetica <- verdadeiro
  geometrica <- verdadeiro
  para i de 3 ate 10 faca
    se valores[i] - valores[i - 1] <> diferenca entao
      aritmetica <- falso
    fimse
  fimpara
  se valores[1] = 0 entao
    para i de 2 ate 10 faca
      se valores[i] <> 0 entao
        geometrica <- falso
      fimse
    fimpara
  senao
    razao <- valores[2] / valores[1]
    para i de 2 ate 10 faca
      se valores[i] <> valores[i - 1] * razao entao
        geometrica <- falso
      fimse
    fimpara
  fimse
  se aritmetica entao
    escreval("Progressão aritmética")
  fimse
  se geometrica entao
    escreval("Progressão geométrica")
  fimse
  se (nao aritmetica) e (nao geometrica) entao
    escreval("Nenhuma das duas progressões")
  fimse
fimalgoritmo
```

As diferenças são comparadas com a primeira diferença. A razão só é calculada se o primeiro valor não for zero.
