# Convite personalizado

**Data:** 10 de fevereiro · **Nível:** Simples

## Objetivo

Leia um nome e imprima uma mensagem de convite.

## Como funciona

Leia o nome de uma pessoa e inclua-o em uma mensagem de convite.

## Exemplo de execução

```text
Nome do convidado: Ana
Você está convidado para a festa, Ana!
```

Nomes compostos devem aparecer integralmente.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0210S"
var
nome: caractere
inicio
escreva("Nome do convidado: ")
  leia(nome)
  escreval("Você está convidado para a festa, ", nome, "!")
fimalgoritmo
```

O valor lido é inserido entre o texto fixo do convite.
