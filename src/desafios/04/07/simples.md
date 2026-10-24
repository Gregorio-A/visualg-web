# Trilha numerada

**Data:** 7 de abril · **Nível:** Simples

## Objetivo

Mostre os números de N até 1.

## Como funciona

Leia N positivo e imprima todos os inteiros de N até 1.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N: 3
3
2
1
```

Para N igual a zero, não há números a imprimir.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0407S"
var
numero, i: inteiro
inicio
escreva("N: ")
  leia(numero)
  para i de numero ate 1 passo -1 faca
    escreval(i)
  fimpara
fimalgoritmo
```

O laço usa passo negativo para diminuir o contador.
