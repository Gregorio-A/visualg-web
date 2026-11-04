# Cartaz da turma

**Data:** 18 de março · **Nível:** Simples

## Objetivo

Desenhe uma linha de N asteriscos.

## Como funciona

Leia N e escreva exatamente N asteriscos na mesma linha.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Quantidade de asteriscos: 5
*****
```

Para N igual a zero, a linha fica vazia.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0318S"
var
quantidade, i: inteiro
inicio
escreva("Quantidade de asteriscos: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    escreva("*")
  fimpara
  escreval("")
fimalgoritmo
```

`escreva` não quebra a linha a cada asterisco; `escreval` encerra a linha após o laço.
