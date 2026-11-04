# Boas-vindas de férias

**Data:** 1 de janeiro · **Nível:** Simples

## Objetivo

Leia um nome e exiba uma saudação personalizada.

Receba o nome da pessoa e produza uma saudação que inclua esse nome.

## Como funciona

Leia uma cadeia de caracteres e concatene-a à mensagem de férias. Não há cálculo numérico.

## Exemplo de execução

```text
Nome: Ana
Boas férias, Ana!
```

Um nome composto também deve aparecer integralmente na mensagem.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0101S"
var
nome: caractere
inicio
escreva("Nome: ")
  leia(nome)
  escreval("Boas férias, ", nome, "!")
fimalgoritmo
```

A variável `nome` guarda a entrada; `escreval` apresenta texto fixo e o valor lido na mesma linha.
