# Taxa de entrega

**Data:** 13 de maio · **Nível:** Simples

## Objetivo

Acrescente uma taxa fixa a uma compra.

## Como funciona

Some ao valor de uma compra uma taxa fixa informada, sem aplicar porcentagem.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Valor da compra: 30
Taxa fixa: 5
Total com taxa: 35
```

Taxa zero não altera o total.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0513S"
var
compra, taxa, resultado: real
inicio
escreva("Valor da compra: ")
  leia(compra)
  escreva("Taxa fixa: ")
  leia(taxa)
  resultado <- compra + taxa
  escreval("Total com taxa: ", resultado)
fimalgoritmo
```

A expressão `compra + taxa` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.
