# Resumo do trabalho

**Data:** 31 de maio · **Nível:** Simples

## Objetivo

Leia cinco resultados diários e calcule sua soma.

## Como funciona

Leia cinco resultados diários e some todos os valores.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Resultados: 1, 2, 3, 4, 5
Soma dos cinco dias: 15
```

Um resultado zero não altera a soma.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0531S"
var
resultado, soma: real
  dia: inteiro
inicio
soma <- 0
  para dia de 1 ate 5 faca
    escreva("Resultado do dia ", dia, ": ")
    leia(resultado)
    soma <- soma + resultado
  fimpara
  escreval("Soma dos cinco dias: ", soma)
fimalgoritmo
```

O acumulador `soma` começa em zero e recebe cada dia uma vez.
