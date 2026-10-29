# Escada de símbolos

**Data:** 9 de abril · **Nível:** Simples

## Objetivo

Imprima N linhas com quantidade crescente de #.

## Como funciona

Leia N e desenhe N linhas: a linha i contém exatamente i sinais #.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Linhas: 3
#
##
###
```

Com zero linhas, nada é desenhado.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0409S"
var
linhas, i, j: inteiro
inicio
escreva("Linhas: ")
  leia(linhas)
  para i de 1 ate linhas faca
    para j de 1 ate i faca
      escreva("#")
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

O laço interno depende do número da linha, aumentando o comprimento a cada volta externa.
