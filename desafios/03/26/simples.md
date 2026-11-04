# Sequência do quadro

**Data:** 26 de março · **Nível:** Simples

## Objetivo

Mostre os cinco primeiros múltiplos de um número.

## Como funciona

Leia um número inteiro e mostre seus múltiplos obtidos por fatores de 1 a 5.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Número: 4
4
8
12
16
20
```

Para número zero, os cinco múltiplos mostrados são zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0326S"
var
numero, i: inteiro
inicio
escreva("Número: ")
  leia(numero)
  para i de 1 ate 5 faca
    escreval(numero * i)
  fimpara
fimalgoritmo
```

O laço gera exatamente cinco fatores e imprime cada produto.
