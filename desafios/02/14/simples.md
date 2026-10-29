# Bandeirinhas de cores

**Data:** 14 de fevereiro · **Nível:** Simples

## Objetivo

Apresente uma cor repetida N vezes.

## Como funciona

Leia uma cor e um número positivo de repetições; mostre a cor uma vez por linha.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Cor: vermelho
Repetições: 3
vermelho
vermelho
vermelho
```

Com zero repetições, o laço não apresenta nenhuma cor.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0214S"
var
cor: caractere
  quantidade, i: inteiro
inicio
escreva("Cor: ")
  leia(cor)
  escreva("Repetições: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    escreval(cor)
  fimpara
fimalgoritmo
```

A variável de controle percorre cada ocorrência pedida.
