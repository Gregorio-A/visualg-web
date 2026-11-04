# Cartão-postal

**Data:** 30 de janeiro · **Nível:** Simples

## Objetivo

Leia cidade e mensagem e exiba uma dedicatória.

Monte uma dedicatória de cartão-postal usando cidade e mensagem informadas.

## Como funciona

Leia dois textos e combine-os em uma única linha de saída.

## Exemplo de execução

```text
Cidade: Recife
Mensagem: Saudades de você!
Cartão-postal de Recife: Saudades de você!
```

A mensagem pode conter espaços; preserve seu conteúdo ao exibi-la.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0130S"
var
cidade, mensagem: caractere
inicio
escreva("Cidade: ")
  leia(cidade)
  escreva("Mensagem: ")
  leia(mensagem)
  escreval("Cartão-postal de ", cidade, ": ", mensagem)
fimalgoritmo
```

`escreval` junta os trechos na ordem desejada sem realizar operações numéricas.
