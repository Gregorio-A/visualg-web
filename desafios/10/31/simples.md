# A noite final

**Data:** 31 de outubro · **Nível:** Simples

## Objetivo

Mostre um desenho de abóbora usando três linhas de texto.

## Como funciona

Imprima três linhas fixas de arte em texto representando uma abóbora estilizada.

## Exemplo de execução

```text
/\
 (^^)
  \/
```

Não é necessária entrada do usuário.

## Dicas para resolução

1. Planeje as três linhas.
2. Use uma saída por linha.
3. Confira barras invertidas nas strings.

## Solução

```visualg
algoritmo "Desafio1031S"
var
desenho: caractere
inicio
escreval("  /\  ")
  escreval(" (^^) ")
  escreval("  \/  ")
fimalgoritmo
```

Cada chamada a escreval produz uma linha do desenho.
