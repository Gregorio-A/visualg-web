# Nota do teste

**Data:** 3 de março · **Nível:** Simples

## Objetivo

Diga se uma nota alcançou a média mínima.

## Como funciona

Compare uma nota com o valor mínimo informado. Igualdade conta como alcance da média.

## Exemplo de execução

```text
Nota: 7
Média mínima: 6
Alcançou a média mínima.
```

Nota igual ao mínimo também produz “alcançou”.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0303S"
var
nota, minima: real
inicio
escreva("Nota: ")
  leia(nota)
  escreva("Média mínima: ")
  leia(minima)
  se nota >= minima entao
    escreval("Alcançou a média mínima.")
  senao
    escreval("Não alcançou a média mínima.")
  fimse
fimalgoritmo
```

A comparação inclusiva `>=` representa corretamente o limite.
