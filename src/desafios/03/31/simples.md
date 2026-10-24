# Mensagem final

**Data:** 31 de março · **Nível:** Simples

## Objetivo

Mostre uma frase motivadora a partir do nome do estudante.

## Como funciona

Leia o nome do estudante e inclua-o em uma frase motivadora.

## Exemplo de execução

```text
Nome do estudante: Ana
Ana, continue praticando: cada exercício ajuda você a aprender!
```

Um nome composto permanece completo na mensagem.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0331S"
var
nome: caractere
inicio
escreva("Nome do estudante: ")
  leia(nome)
  escreval(nome, ", continue praticando: cada exercício ajuda você a aprender!")
fimalgoritmo
```

O texto fixo e a entrada formam uma mensagem personalizada.
