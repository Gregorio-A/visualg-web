# Ingresso de parque

**Data:** 25 de janeiro · **Nível:** Simples

## Objetivo

Aplique meia-entrada quando a condição booleana for verdadeira.

Calcule o valor de um ingresso a partir de uma condição booleana de meia-entrada.

## Como funciona

Leia o preço integral e uma variável lógica. Quando a condição for verdadeira, cobre metade; caso contrário, mantenha o preço.

### Palavras úteis

- **Variável lógica:** Guarda apenas verdadeiro ou falso, como uma resposta de sim ou não.

## Exemplo de execução

```text
Preço integral: 40
Tem direito à meia-entrada (verdadeiro/falso)? verdadeiro
Preço a pagar: 20
```

Se `meia` for `falso`, o preço final é o integral.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0125S"
var
preco, total: real
  meia: logico
inicio
escreva("Preço integral: ")
  leia(preco)
  escreva("Tem direito à meia-entrada (verdadeiro/falso)? ")
  leia(meia)
  se meia entao
    total <- preco / 2
  senao
    total <- preco
  fimse
  escreval("Preço a pagar: ", total)
fimalgoritmo
```

O `se` escolhe qual valor atribuir antes da única linha de saída.
