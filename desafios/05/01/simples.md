# Primeiro salário

**Data:** 1 de maio · **Nível:** Simples

## Objetivo

Multiplique horas trabalhadas pelo valor da hora.

## Como funciona

Leia horas trabalhadas e valor pago por hora. Multiplique para obter o pagamento bruto.

## Exemplo de execução

```text
Horas trabalhadas: 8
Valor por hora: 15
Pagamento: 120
```

Zero hora trabalhada gera pagamento zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0501S"
var
horas, valorHora, resultado: real
inicio
escreva("Horas trabalhadas: ")
  leia(horas)
  escreva("Valor por hora: ")
  leia(valorHora)
  resultado <- horas * valorHora
  escreval("Pagamento: ", resultado)
fimalgoritmo
```

A expressão `horas * valorHora` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
