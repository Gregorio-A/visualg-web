# Palavra secreta

**Data:** 14 de abril · **Nível:** Simples

## Objetivo

Mostre somente a primeira letra de uma palavra.

## Como funciona

Leia um texto e apresente somente o primeiro caractere.

## Exemplo de execução

```text
Palavra: segredo
Primeira letra: s
```

Uma entrada vazia não possui primeira letra.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0414S"
var
palavra: caractere
inicio
escreva("Palavra: ")
  leia(palavra)
  se compr(palavra) > 0 entao
    escreval("Primeira letra: ", copia(palavra, 1, 1))
  senao
    escreval("Palavra vazia")
  fimse
fimalgoritmo
```

`copia` extrai um caractere a partir da posição 1.
