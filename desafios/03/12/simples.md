# Palavra nova

**Data:** 12 de março · **Nível:** Simples

## Objetivo

Conte os caracteres de uma palavra digitada.

## Como funciona

Leia uma palavra e use seu comprimento para contar caracteres.

### Palavras úteis

- **Função:** É um bloco de comandos com nome que devolve um valor.

## Exemplo de execução

```text
Palavra: escola
Caracteres: 6
```

Uma cadeia vazia contém zero caractere.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0312S"
var
palavra: caractere
  caracteres: inteiro
inicio
escreva("Palavra: ")
  leia(palavra)
  caracteres <- compr(palavra)
  escreval("Caracteres: ", caracteres)
fimalgoritmo
```

A função `compr` retorna o número de caracteres do texto lido.
