# Troca de carteiras

**Data:** 20 de março · **Nível:** Simples

## Objetivo

Troque os números de dois assentos usando auxiliar.

## Como funciona

Leia dois números de assento e troque os valores usando uma terceira variável.

## Exemplo de execução

```text
Assento A: 3; assento B: 8
Novo assento A: 8
Novo assento B: 3
```

Se os números forem iguais, a troca conserva ambos.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0320S"
var
assentoA, assentoB, auxiliar: inteiro
inicio
escreva("Número do assento A: ")
  leia(assentoA)
  escreva("Número do assento B: ")
  leia(assentoB)
  auxiliar <- assentoA
  assentoA <- assentoB
  assentoB <- auxiliar
  escreval("Novo assento A: ", assentoA)
  escreval("Novo assento B: ", assentoB)
fimalgoritmo
```

`auxiliar` guarda o valor antigo de A antes que A receba o valor de B.
