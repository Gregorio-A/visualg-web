# Diária de serviço

**Data:** 8 de maio · **Nível:** Simples

## Objetivo

Calcule pagamento por número de dias trabalhados.

## Como funciona

Leia o número de dias e o valor de uma diária. Multiplique para obter o pagamento.

## Exemplo de execução

```text
Dias trabalhados: 5
Pagamento por dia: 80
Pagamento: 400
```

Com zero dia, o pagamento é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0508S"
var
dias, diaria, resultado: real
inicio
escreva("Dias trabalhados: ")
  leia(dias)
  escreva("Pagamento por dia: ")
  leia(diaria)
  resultado <- dias * diaria
  escreval("Pagamento: ", resultado)
fimalgoritmo
```

A expressão `dias * diaria` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
