# Ordem do desfile

**Data:** 11 de fevereiro · **Nível:** Simples

## Objetivo

Apresente três nomes na sequência digitada.

## Como funciona

Leia três nomes e apresente-os exatamente na ordem de digitação.

## Exemplo de execução

```text
Primeiro nome: Ana
Segundo nome: Bia
Terceiro nome: Caio
Ana
Bia
Caio
```

Não classifique nem inverta os nomes.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0211S"
var
primeiro, segundo, terceiro: caractere
inicio
escreva("Primeiro nome: ")
  leia(primeiro)
  escreva("Segundo nome: ")
  leia(segundo)
  escreva("Terceiro nome: ")
  leia(terceiro)
  escreval(primeiro)
  escreval(segundo)
  escreval(terceiro)
fimalgoritmo
```

Cada variável guarda uma entrada; as três saídas repetem a mesma sequência.
