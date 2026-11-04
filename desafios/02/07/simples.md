# Pulseira de evento

**Data:** 7 de fevereiro · **Nível:** Simples

## Objetivo

Diga se uma idade alcança a idade mínima informada.

## Como funciona

Compare a idade de uma pessoa com a idade mínima exigida pelo evento.

## Exemplo de execução

```text
Idade: 16
Idade mínima: 14
Entrada permitida.
```

Idade exatamente igual ao mínimo também permite entrada.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0207S"
var
idade, minima: inteiro
inicio
escreva("Idade: ")
  leia(idade)
  escreva("Idade mínima: ")
  leia(minima)
  se idade >= minima entao
    escreval("Entrada permitida.")
  senao
    escreval("Entrada não permitida.")
  fimse
fimalgoritmo
```

A comparação `>=` inclui o limite como valor válido.
