# Peças por máquina

**Data:** 26 de maio · **Nível:** Simples

## Objetivo

Calcule produção com taxa fixa por hora.

## Como funciona

Leia horas trabalhadas e taxa fixa de peças por hora; multiplique.

## Exemplo de execução

```text
Horas de produção: 5
Peças por hora: 12
Produção estimada: 60
```

Zero hora de operação produz zero peça.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0526S"
var
horas, taxa, resultado: real
inicio
escreva("Horas de produção: ")
  leia(horas)
  escreva("Peças por hora: ")
  leia(taxa)
  resultado <- horas * taxa
  escreval("Produção estimada: ", resultado)
fimalgoritmo
```

A expressão `horas * taxa` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
