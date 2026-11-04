# Máscara colorida

**Data:** 1 de fevereiro · **Nível:** Simples

## Objetivo

Leia uma cor e exiba uma frase com essa cor.

## Como funciona

Leia o nome de uma cor como texto e inclua esse valor em uma frase completa.

## Exemplo de execução

```text
Cor da máscara: azul
Minha máscara será azul!
```

Uma cor composta, como “azul claro”, deve permanecer completa na mensagem.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0201S"
var
cor: caractere
inicio
escreva("Cor da máscara: ")
  leia(cor)
  escreval("Minha máscara será ", cor, "!")
fimalgoritmo
```

A variável de texto é inserida entre trechos fixos por `escreval`.
