# Férias em família

**Data:** 21 de janeiro · **Nível:** Simples

## Objetivo

Calcule custo total por pessoa para N integrantes.

Divida igualmente um custo de viagem entre os integrantes da família.

## Como funciona

Leia custo total e número de integrantes. Divida pelo número apenas se ele for positivo.

## Exemplo de execução

```text
Custo total: 300
Integrantes: 4
Custo por pessoa: 75
```

Com um integrante, o custo individual é igual ao custo total.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0121S"
var
custoTotal, porPessoa: real
  integrantes: inteiro
inicio
escreva("Custo total: ")
  leia(custoTotal)
  escreva("Integrantes: ")
  leia(integrantes)
  se integrantes > 0 entao
    porPessoa <- custoTotal / integrantes
    escreval("Custo por pessoa: ", porPessoa)
  senao
    escreval("É necessário ao menos um integrante.")
  fimse
fimalgoritmo
```

A validação impede divisão por zero; a divisão calcula a cota igualitária.
