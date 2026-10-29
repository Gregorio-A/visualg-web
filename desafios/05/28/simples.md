# Chegada do caminhão

**Data:** 28 de maio · **Nível:** Simples

## Objetivo

Calcule hora prevista em minutos a partir de uma duração.

## Como funciona

Leia início e duração na mesma unidade. Some para prever o horário final.

## Exemplo de execução

```text
Início (minutos): 600
Duração (minutos): 45
Hora prevista (minutos): 645
```

Duração zero conserva o horário inicial.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0528S"
var
inicioMin, duracao, resultado: real
inicio
escreva("Início (minutos): ")
  leia(inicioMin)
  escreva("Duração (minutos): ")
  leia(duracao)
  resultado <- inicioMin + duracao
  escreval("Hora prevista (minutos): ", resultado)
fimalgoritmo
```

A expressão `inicioMin + duracao` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
