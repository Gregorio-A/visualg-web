# Tabuada do aluno

**Data:** 13 de março · **Nível:** Simples

## Objetivo

Apresente a tabuada de um número até dez.

## Como funciona

Leia um número inteiro e mostre dez produtos, do multiplicador 1 ao 10.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Número: 3
3 x 1 = 3
...
3 x 10 = 30
```

A tabuada do zero apresenta dez resultados zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0313S"
var
numero, i: inteiro
inicio
escreva("Número: ")
  leia(numero)
  para i de 1 ate 10 faca
    escreval(numero, " x ", i, " = ", numero * i)
  fimpara
fimalgoritmo
```

O laço fornece cada multiplicador e a multiplicação calcula a linha.
