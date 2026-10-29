# Confete contado

**Data:** 2 de fevereiro · **Nível:** Simples

## Objetivo

Mostre números de 1 até um limite informado.

## Como funciona

Leia um limite inteiro e imprima, em ordem, os inteiros de 1 até ele.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Limite: 3
1
2
3
```

Se o limite for menor que 1, não execute o laço.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0202S"
var
limite, i: inteiro
inicio
escreva("Limite: ")
  leia(limite)
  se limite >= 1 entao
    para i de 1 ate limite faca
      escreval(i)
    fimpara
  senao
    escreval("Não há números positivos no intervalo.")
  fimse
fimalgoritmo
```

`para` percorre cada número uma vez e o imprime em linha própria.
