# Porta misteriosa

**Data:** 1 de abril · **Nível:** Simples

## Objetivo

Leia um número e diga se é positivo ou negativo.

## Como funciona

Leia um número real e classifique-o em positivo, negativo ou zero.

## Exemplo de execução

```text
Número: -4
Negativo
```

Zero não pertence a nenhuma das duas classes de sinal e tem saída própria.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0401S"
var
numero: real
inicio
escreva("Número: ")
  leia(numero)
  se numero > 0 entao
    escreval("Positivo")
  senao
    se numero < 0 entao
      escreval("Negativo")
    senao
      escreval("Zero")
    fimse
  fimse
fimalgoritmo
```

As duas comparações estritas deixam o caso zero para o último ramo.
