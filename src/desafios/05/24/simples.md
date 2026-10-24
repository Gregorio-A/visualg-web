# Ajuste de salário

**Data:** 24 de maio · **Nível:** Simples

## Objetivo

Calcule salário após reajuste percentual.

## Como funciona

Leia salário e porcentagem de reajuste; aplique o aumento ao salário original.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Salário atual: 1000
Reajuste (%): 10
Novo salário: 1100
```

Reajuste de 0% conserva o salário.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0524S"
var
salario, reajuste, resultado: real
inicio
escreva("Salário atual: ")
  leia(salario)
  escreva("Reajuste (%): ")
  leia(reajuste)
  resultado <- salario * (100 + reajuste) / 100
  escreval("Novo salário: ", resultado)
fimalgoritmo
```

A expressão `salario * (100 + reajuste) / 100` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
