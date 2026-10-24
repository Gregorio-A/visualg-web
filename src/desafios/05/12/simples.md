# Contagem do depósito

**Data:** 12 de maio · **Nível:** Simples

## Objetivo

Mostre números de caixas de 1 até N.

## Como funciona

Leia N e mostre os números de caixa de 1 até N.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Número de caixas: 3
Caixa 1
Caixa 2
Caixa 3
```

N igual a zero não produz nenhuma caixa numerada.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0512S"
var
caixas, i: inteiro
inicio
escreva("Número de caixas: ")
  leia(caixas)
  para i de 1 ate caixas faca
    escreval("Caixa ", i)
  fimpara
fimalgoritmo
```

O índice do laço já corresponde ao número de cada caixa.
